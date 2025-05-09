# Diagrama de Flujo de Procesos - MediPlus

## 1. Proceso de Registro y Atención de Pacientes

```
+----------------+     +----------------+     +----------------+
| Registro de    |     | Programación   |     | Check-in de    |
| Paciente       |---->| de Cita        |---->| Paciente       |
+----------------+     +----------------+     +----------------+
                                                      |
                                                      v
+----------------+     +----------------+     +----------------+
| Generación de  |     | Registro de    |     | Consulta       |
| Receta         |<----| Tratamiento    |<----| Médica         |
+----------------+     +----------------+     +----------------+
        |                     |
        v                     v
+----------------+     +----------------+
| Seguimiento    |     | Programación   |
| de Tratamiento |<--->| de Exámenes    |
+----------------+     +----------------+
```

## 2. Proceso de Gestión de Historias Clínicas

```
+----------------+     +----------------+     +----------------+
| Creación de    |     | Actualización  |     | Consulta de    |
| Historia       |---->| de Historia    |---->| Historia       |
+----------------+     +----------------+     +----------------+
                              |
                              v
+----------------+     +----------------+     +----------------+
| Generación de  |     | Análisis de    |     | Reportes       |
| Estadísticas   |<----| Tendencias     |<----| Médicos        |
+----------------+     +----------------+     +----------------+
```

## 3. Proceso de Gestión de Citas

```
+----------------+     +----------------+     +----------------+
| Verificación   |     | Reserva de     |     | Confirmación   |
| Disponibilidad |---->| Cita           |---->| de Cita        |
+----------------+     +----------------+     +----------------+
                                                      |
                                                      v
+----------------+     +----------------+     +----------------+
| Reprogramación |     | Notificación   |     | Recordatorio   |
| de Cita        |<--->| al Paciente    |<----| de Cita        |
+----------------+     +----------------+     +----------------+
```

## 4. Proceso de Gestión de Exámenes

```
+----------------+     +----------------+     +----------------+
| Solicitud de   |     | Programación   |     | Realización    |
| Examen         |---->| de Examen      |---->| de Examen      |
+----------------+     +----------------+     +----------------+
                                                      |
                                                      v
+----------------+     +----------------+     +----------------+
| Consulta de    |     | Análisis de    |     | Registro de    |
| Resultados     |<----| Resultados     |<----| Resultados     |
+----------------+     +----------------+     +----------------+
```
