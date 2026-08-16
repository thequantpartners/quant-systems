# SOP 10 — Conexión CLI/API de Google Ads

## Objetivo

Definir una conexión reutilizable para consultar y administrar cuentas de Google Ads desde CLI/API:
crear, pausar, reactivar y editar campañas, presupuestos, grupos, keywords, negativas y anuncios.

Este SOP reemplaza el uso operativo del MCP para mutaciones. El MCP puede utilizarse únicamente
para consultas si resulta conveniente.

## Requisitos de seguridad

- No guardar tokens, secretos ni el archivo de credenciales en el repositorio.
- No imprimir valores de credenciales en terminal, logs, commits o documentación compartida.
- El archivo local actual se encuentra en:

```text
C:\Users\Ken Ryzen\Downloads\Credenciales_Google_Ads_Media_Buying.txt
```

- Esa ruta es específica de este equipo. En otro proyecto o máquina se debe usar una ruta local
  equivalente y nunca una ruta versionada.
- Antes de cualquier mutación, ejecutar una consulta read-only y confirmar explícitamente el
  alcance: cuenta, campaña, presupuesto y estado esperado.
- Las campañas nuevas deben crearse pausadas por defecto. Activarlas requiere una confirmación
  separada después del checklist de lanzamiento.

## Credenciales esperadas

El archivo puede contener estas claves:

```text
GOOGLE_ADS_CLIENT_ID
GOOGLE_ADS_CLIENT_SECRET
GOOGLE_ADS_DEVELOPER_TOKEN
GOOGLE_ADS_REFRESH_TOKEN
GOOGLE_ADS_CUSTOMER_ID
GOOGLE_ADS_LOGIN_CUSTOMER_ID
GOOGLE_ADS_CHILD_ACCOUNT_ID
```

También se aceptan las variantes sin el prefijo `GOOGLE_ADS_`:

```text
client_id
client_secret
developer_token
refresh_token
customer_id
login_customer_id
```

Usar `GOOGLE_ADS_CHILD_ACCOUNT_ID` como cuenta objetivo cuando exista. El `login_customer_id`
normalmente corresponde a la cuenta manager.

## Configuración inicial en Windows

Abrir PowerShell y comprobar Python:

```powershell
python --version
pip --version
```

Instalar el cliente oficial si no está disponible:

```powershell
python -m pip install google-ads
```

No instalarlo dentro del repositorio como dependencia de la landing o del backend. Es una
herramienta operativa separada.

## Prueba de conexión read-only

Usar un script local o una sesión de PowerShell que:

1. Lea el archivo de credenciales desde la ruta local.
2. Construya `GoogleAdsClient` con `use_proto_plus=True`.
3. Llame `CustomerService.list_accessible_customers()`.
4. Consulte `GoogleAdsService` sobre la cuenta objetivo.
5. Imprima solo IDs, nombres, estados y métricas no sensibles.

Configuración mínima del cliente:

```python
from google.ads.googleads.client import GoogleAdsClient

config = {
    "developer_token": developer_token,
    "client_id": client_id,
    "client_secret": client_secret,
    "refresh_token": refresh_token,
    "login_customer_id": login_customer_id,
    "use_proto_plus": True,
}

client = GoogleAdsClient.load_from_dict(config)
```

Consulta mínima:

```python
service = client.get_service("GoogleAdsService")
query = """
    SELECT customer.id, customer.descriptive_name,
           customer.currency_code, customer.time_zone,
           customer.manager, customer.auto_tagging_enabled
    FROM customer
    LIMIT 1
"""

for row in service.search(customer_id=customer_id, query=query):
    print(row.customer.id, row.customer.descriptive_name)
```

La prueba es exitosa cuando:

- El cliente autentica sin `GoogleAdsException`.
- La cuenta objetivo coincide con la cuenta esperada.
- `auto_tagging_enabled` está activo para campañas con atribución de Google Ads.
- La cuenta manager y la cuenta hija son las correctas.

## Operaciones disponibles

Después de validar la conexión, el cliente oficial permite usar:

- `CampaignBudgetService`: crear y editar presupuestos.
- `CampaignService`: crear, pausar, reactivar y editar campañas.
- `CampaignCriterionService`: ubicaciones, idiomas y negativas.
- `AdGroupService`: crear y editar grupos.
- `AdGroupCriterionService`: keywords y estados.
- `AdGroupAdService`: RSA y estados de anuncios.
- `GoogleAdsService`: consultas de campañas, términos, métricas y conversiones.

Para cada operación:

1. Consultar primero el recurso actual.
2. Identificarlo por `resource_name` o ID, no solo por nombre.
3. Preparar la mutación.
4. Revisar en terminal un resumen sin secretos.
5. Ejecutar solo con autorización explícita.
6. Volver a consultar para verificar el resultado.

## Flujo recomendado para una campaña nueva

1. Confirmar cuenta hija, moneda y zona horaria.
2. Crear presupuesto con el importe diario aprobado.
3. Crear campaña con estado `PAUSED`.
4. Configurar Search, redes, ubicación e idioma.
5. Crear grupos de anuncios pausados.
6. Crear keywords frase/exacta y negativas.
7. Crear RSA pausados con URLs finales y UTMs.
8. Consultar campaña, grupos, keywords y anuncios para verificar.
9. Completar [09-checklist-lanzamiento.md](/SOPs/09-checklist-lanzamiento.md).
10. Activar únicamente tras confirmación explícita.

## Diagnóstico de errores

- `AuthorizationError`: revisar usuario, cuenta manager, refresh token y permisos.
- `GoogleAdsException`: registrar solo código, campo y mensaje; nunca el token.
- `CUSTOMER_NOT_FOUND`: comprobar ID sin guiones y relación manager → cuenta hija.
- `DEVELOPER_TOKEN_NOT_APPROVED`: revisar el nivel de acceso del developer token.
- Errores de política o revisión: la mutación puede haber creado un recurso pausado; consultar
  el estado antes de reintentar.
- Error parcial: consultar recursos creados antes de repetir una operación para evitar duplicados.

## Reutilización en otro proyecto

Para usar la CLI/API en otro proyecto:

1. Instalar `google-ads` en el entorno Python operativo.
2. Obtener una copia local segura del archivo de credenciales o configurar las mismas claves como
   variables de entorno.
3. Ajustar la ruta local del archivo; no asumir la ruta de este equipo.
4. Ejecutar primero la prueba read-only.
5. Confirmar la cuenta objetivo y el alcance de la mutación.
6. Reutilizar los servicios y patrones de este SOP.

El archivo de credenciales debe permanecer fuera del repositorio y estar excluido por las reglas
de secretos del equipo. Si se revoca o rota un refresh token, actualizarlo localmente y repetir la
prueba read-only.

## Checklist

- [ ] `google-ads` está instalado en el entorno operativo.
- [ ] El archivo local existe y no está versionado.
- [ ] Las claves requeridas están presentes sin imprimir valores.
- [ ] `list_accessible_customers()` funciona.
- [ ] La cuenta objetivo fue verificada con una consulta read-only.
- [ ] Las mutaciones se preparan pausadas.
- [ ] Cada mutación se verifica con una consulta posterior.
- [ ] La activación de campañas tiene confirmación separada.
