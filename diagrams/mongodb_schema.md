# MongoDB Schema Diagram for MediPlus

## Colección: pacientes
```json
{
  "_id": "ObjectId",
  "nombre": "String",
  "apellido": "String",
  "fechaNacimiento": "Date",
  "genero": "String",
  "direccion": {
    "calle": "String",
    "ciudad": "String",
    "estado": "String",
    "codigoPostal": "String"
  },
  "contacto": {
    "telefono": "String",
    "email": "String"
  },
  "grupoSanguineo": "String",
  "alergias": ["String"],
  "antecedentes": [
    {
      "tipo": "String",
      "descripcion": "String",
      "fecha": "Date"
    }
  ],
  "historiaClinica": {
    "enfermedadesCronicas": ["String"],
    "cirugiasPrevias": [
      {
        "tipo": "String",
        "fecha": "Date",
        "notas": "String"
      }
    ],
    "medicacionActual": ["String"]
  },
  "fechaRegistro": "Date",
  "ultimaActualizacion": "Date"
}
```

## Colección: medicos
```json
{
  "_id": "ObjectId",
  "nombre": "String",
  "apellido": "String",
  "especialidad": "String",
  "licenciaMedica": "String",
  "contacto": {
    "telefono": "String",
    "email": "String"
  },
  "disponibilidad": [
    {
      "dia": "String",
      "horaInicio": "String",
      "horaFin": "String"
    }
  ],
  "educacion": [
    {
      "institucion": "String",
      "titulo": "String",
      "año": "Number"
    }
  ],
  "fechaRegistro": "Date",
  "estado": "String"
}
```

## Colección: citas
```json
{
  "_id": "ObjectId",
  "pacienteId": "ObjectId",
  "medicoId": "ObjectId",
  "fecha": "Date",
  "hora": {
    "inicio": "String",
    "fin": "String"
  },
  "estado": "String",
  "motivo": "String",
  "notas": "String",
  "tipoConsulta": "String",
  "fechaCreacion": "Date",
  "ultimaActualizacion": "Date"
}
```

## Colección: tratamientos
```json
{
  "_id": "ObjectId",
  "citaId": "ObjectId",
  "pacienteId": "ObjectId",
  "medicoId": "ObjectId",
  "diagnostico": "String",
  "descripcion": "String",
  "duracion": {
    "valor": "Number",
    "unidad": "String"
  },
  "instrucciones": "String",
  "seguimiento": {
    "requerido": "Boolean",
    "fechaSugerida": "Date"
  },
  "fechaCreacion": "Date",
  "fechaActualizacion": "Date"
}
```

## Colección: recetas
```json
{
  "_id": "ObjectId",
  "pacienteId": "ObjectId",
  "medicoId": "ObjectId",
  "fecha": "Date",
  "medicamentos": [
    {
      "nombre": "String",
      "dosis": "String",
      "frecuencia": "String",
      "duracion": "String",
      "instrucciones": "String"
    }
  ],
  "notas": "String",
  "vigencia": {
    "inicio": "Date",
    "fin": "Date"
  },
  "estado": "String"
}
```

## Colección: examenes
```json
{
  "_id": "ObjectId",
  "pacienteId": "ObjectId",
  "medicoId": "ObjectId",
  "fecha": "Date",
  "tipo": "String",
  "resultados": {
    "valores": [
      {
        "nombre": "String",
        "valor": "Mixed",
        "unidad": "String",
        "rangoReferencia": "String"
      }
    ],
    "conclusion": "String"
  },
  "observaciones": "String",
  "archivos": [
    {
      "nombre": "String",
      "tipo": "String",
      "url": "String"
    }
  ],
  "fechaCreacion": "Date",
  "fechaResultados": "Date",
  "estado": "String"
}
```
