# Diagrama de Componentes - MediPlus

```
+----------------------------------------------------------------------+
|                           Aplicación MediPlus                         |
+----------------------------------------------------------------------+
                |
                v
+----------------------------------------------------------------------+
|                               app.js                                  |
|  (Configuración principal, middleware, rutas y servidor Express)      |
+----------------------------------------------------------------------+
    |           |           |           |           |           |
    v           v           v           v           v           v
+----------+ +----------+ +----------+ +----------+ +----------+ +----------+
| config.js| |middlewares| | routers  | |controllers| | services | | models   |
+----------+ +----------+ +----------+ +----------+ +----------+ +----------+
                                                                    |
                                                                    v
+----------------------------------------------------------------------+
|                       database/connection.js                          |
|               (Configuración y conexión a MongoDB)                    |
+----------------------------------------------------------------------+
    |           |           |           |           |           |
    v           v           v           v           v           v
+----------+ +----------+ +----------+ +----------+ +----------+ +----------+
|pacienteM.| |medicoMod.| |citaModel.| |tratamient| |recetaMod.| |examenMod.|
+----------+ +----------+ +----------+ +----------+ +----------+ +----------+
```

## Estructura de Directorios Propuesta

```
/MediPlus
  |-- app.js                  # Punto de entrada de la aplicación
  |-- config.js               # Configuración de la aplicación
  |-- package.json            # Dependencias y scripts
  |
  |-- /database
  |     |-- connection.js     # Conexión a MongoDB
  |
  |-- /models                 # Esquemas y modelos de MongoDB
  |     |-- pacienteModel.js
  |     |-- medicoModel.js
  |     |-- citaModel.js
  |     |-- tratamientoModel.js
  |     |-- recetaModel.js
  |     |-- examenModel.js
  |
  |-- /controllers            # Controladores de la lógica de negocio
  |     |-- pacienteController.js
  |     |-- medicoController.js
  |     |-- citaController.js
  |     |-- tratamientoController.js
  |     |-- recetaController.js
  |     |-- examenController.js
  |     |-- historiaClinicaController.js
  |
  |-- /services               # Servicios para operaciones complejas
  |     |-- pacienteService.js
  |     |-- medicoService.js
  |     |-- citaService.js
  |     |-- tratamientoService.js
  |     |-- recetaService.js
  |     |-- examenService.js
  |     |-- reporteService.js
  |
  |-- /routers                # Definición de rutas API
  |     |-- pacienteRouters.js
  |     |-- medicoRouters.js
  |     |-- citaRouters.js
  |     |-- tratamientoRouters.js
  |     |-- recetaRouters.js
  |     |-- examenRouters.js
  |     |-- historiaClinicaRouters.js
  |
  |-- /middlewares            # Middlewares para autenticación, validación, etc.
  |     |-- auth.js
  |     |-- validation.js
  |     |-- errorHandler.js
  |
  |-- /utils                  # Utilidades y funciones auxiliares
  |     |-- helpers.js
  |     |-- validators.js
  |
  |-- /views                  # Vistas EJS para la interfaz web
  |     |-- index.ejs
  |     |-- /pacientes
  |     |-- /medicos
  |     |-- /citas
  |     |-- /tratamientos
  |     |-- /recetas
  |     |-- /examenes
  |
  |-- /public                 # Archivos estáticos (CSS, JS, imágenes)
  |     |-- /css
  |     |-- /js
  |     |-- /img
  |
  |-- /tests                  # Pruebas unitarias e integración
        |-- /unit
        |-- /integration
```
