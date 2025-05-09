# Entity Relationship Diagram for MediPlus

```
+---------------+       +---------------+       +---------------+
|   Pacientes   |       |    Médicos    |       |     Citas     |
+---------------+       +---------------+       +---------------+
| _id           |       | _id           |       | _id           |
| nombre        |       | nombre        |       | pacienteId    |<----+
| apellido      |       | apellido      |       | medicoId      |<-+  |
| fechaNac      |       | especialidad  |       | fecha         |  |  |
| genero        |       | licencia      |       | hora          |  |  |
| direccion     |       | telefono      |       | estado        |  |  |
| telefono      |       | email         |       | motivo        |  |  |
| email         |       | disponibilidad|       | notas         |  |  |
| grupoSanguineo|       | horario       |       +---------------+  |  |
| alergias      |       +---------------+          |               |
| antecedentes  |             ^                    |               |
+---------------+             |                    |               |
      ^                       |                    v               |
      |                       |            +---------------+       |
      |                       |            | Tratamientos  |       |
      |                       |            +---------------+       |
      |                       |            | _id           |       |
      |                       |            | citaId        |<------+
      |                       |            | diagnostico   |
      |                       |            | descripcion   |
      |                       |            | duracion      |
      |                       |            | instrucciones |
      |                       |            +---------------+
      |                       |                   |
      |                       |          +--------+--------+
      |                       |          |                 |
      v                       v          v                 v
+---------------+     +---------------+
|    Recetas    |     |   Exámenes    |
+---------------+     +---------------+
| _id           |     | _id           |
| pacienteId    |<----| pacienteId    |<----+
| medicoId      |<-+  | medicoId      |<-+  |
| fecha         |  |  | fecha         |  |  |
| medicamentos  |  |  | tipo          |  |  |
| dosis         |  |  | resultados    |  |  |
| instrucciones |  |  | observaciones |  |  |
| vigencia      |  |  | archivos      |  |  |
+---------------+  |  +---------------+  |  |
                   |                     |  |
                   +---------------------+  |
                                           |
                                           |
```
