# Endpoints de API REST - MediPlus

## Pacientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pacientes` | Obtener todos los pacientes |
| GET | `/api/pacientes/:id` | Obtener un paciente por ID |
| POST | `/api/pacientes` | Crear un nuevo paciente |
| PUT | `/api/pacientes/:id` | Actualizar un paciente existente |
| DELETE | `/api/pacientes/:id` | Eliminar un paciente |
| GET | `/api/pacientes/:id/historia-clinica` | Obtener historia clínica completa |
| GET | `/api/pacientes/:id/citas` | Obtener todas las citas de un paciente |
| GET | `/api/pacientes/:id/recetas` | Obtener todas las recetas de un paciente |
| GET | `/api/pacientes/:id/examenes` | Obtener todos los exámenes de un paciente |
| GET | `/api/pacientes/:id/tratamientos` | Obtener todos los tratamientos de un paciente |

## Médicos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/medicos` | Obtener todos los médicos |
| GET | `/api/medicos/:id` | Obtener un médico por ID |
| POST | `/api/medicos` | Crear un nuevo médico |
| PUT | `/api/medicos/:id` | Actualizar un médico existente |
| DELETE | `/api/medicos/:id` | Eliminar un médico |
| GET | `/api/medicos/:id/citas` | Obtener todas las citas de un médico |
| GET | `/api/medicos/:id/disponibilidad` | Obtener disponibilidad de un médico |
| POST | `/api/medicos/:id/disponibilidad` | Actualizar disponibilidad de un médico |
| GET | `/api/medicos/especialidad/:especialidad` | Filtrar médicos por especialidad |

## Citas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/citas` | Obtener todas las citas |
| GET | `/api/citas/:id` | Obtener una cita por ID |
| POST | `/api/citas` | Crear una nueva cita |
| PUT | `/api/citas/:id` | Actualizar una cita existente |
| DELETE | `/api/citas/:id` | Eliminar una cita |
| PUT | `/api/citas/:id/estado` | Actualizar el estado de una cita |
| GET | `/api/citas/fecha/:fecha` | Obtener citas por fecha |

## Tratamientos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tratamientos` | Obtener todos los tratamientos |
| GET | `/api/tratamientos/:id` | Obtener un tratamiento por ID |
| POST | `/api/tratamientos` | Crear un nuevo tratamiento |
| PUT | `/api/tratamientos/:id` | Actualizar un tratamiento existente |
| DELETE | `/api/tratamientos/:id` | Eliminar un tratamiento |
| GET | `/api/tratamientos/cita/:citaId` | Obtener tratamiento por cita |

## Recetas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/recetas` | Obtener todas las recetas |
| GET | `/api/recetas/:id` | Obtener una receta por ID |
| POST | `/api/recetas` | Crear una nueva receta |
| PUT | `/api/recetas/:id` | Actualizar una receta existente |
| DELETE | `/api/recetas/:id` | Eliminar una receta |
| GET | `/api/recetas/vigentes/:pacienteId` | Obtener recetas vigentes de un paciente |

## Exámenes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/examenes` | Obtener todos los exámenes |
| GET | `/api/examenes/:id` | Obtener un examen por ID |
| POST | `/api/examenes` | Crear un nuevo examen |
| PUT | `/api/examenes/:id` | Actualizar un examen existente |
| DELETE | `/api/examenes/:id` | Eliminar un examen |
| PUT | `/api/examenes/:id/resultados` | Actualizar resultados de un examen |
| GET | `/api/examenes/pendientes/:pacienteId` | Obtener exámenes pendientes de un paciente |

## Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/logout` | Cerrar sesión |
| POST | `/api/auth/register` | Registrar nuevo usuario |
| GET | `/api/auth/profile` | Obtener perfil de usuario actual |
| PUT | `/api/auth/profile` | Actualizar perfil de usuario |
| POST | `/api/auth/password-reset` | Solicitar restablecimiento de contraseña |

## Reportes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/reportes/citas-por-periodo` | Reporte de citas por periodo |
| GET | `/api/reportes/pacientes-por-medico` | Reporte de pacientes por médico |
| GET | `/api/reportes/tratamientos-por-diagnostico` | Reporte de tratamientos por diagnóstico |
| GET | `/api/reportes/examenes-por-tipo` | Reporte de exámenes por tipo |
| GET | `/api/reportes/medicamentos-recetados` | Reporte de medicamentos más recetados |
