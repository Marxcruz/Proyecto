# Script para probar la API de médicos en MediPlus
# Autor: MediPlus Team
# Fecha: 2025-05-02

$baseUrl = "http://localhost:3001/api/v1"
$token = ""

function Login {
    param (
        [string]$email,
        [string]$password
    )
    
    $loginData = @{
        email = $email
        password = $password
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginData -ContentType "application/json"
    $global:token = $response.token
    Write-Host "Login exitoso. Token JWT obtenido." -ForegroundColor Green
    return $response
}

function GetAllMedicos {
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/medicos" -Method Get -Headers $headers
        Write-Host "Médicos obtenidos exitosamente:" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error al obtener médicos: $_" -ForegroundColor Red
    }
}

function GetMedicoById {
    param (
        [string]$id
    )
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/medicos/$id" -Method Get -Headers $headers
        Write-Host "Médico obtenido exitosamente:" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error al obtener médico: $_" -ForegroundColor Red
    }
}

function GetMedicosByEspecialidad {
    param (
        [string]$especialidad
    )
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/medicos/especialidad/$especialidad" -Method Get -Headers $headers
        Write-Host "Médicos por especialidad obtenidos exitosamente:" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error al obtener médicos por especialidad: $_" -ForegroundColor Red
    }
}

function CreateMedico {
    param (
        [hashtable]$medicoData
    )
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    $body = $medicoData | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/medicos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
        Write-Host "Médico creado exitosamente:" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error al crear médico: $_" -ForegroundColor Red
    }
}

function UpdateMedico {
    param (
        [string]$id,
        [hashtable]$updateData
    )
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    $body = $updateData | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/medicos/$id" -Method Put -Headers $headers -Body $body -ContentType "application/json"
        Write-Host "Médico actualizado exitosamente:" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error al actualizar médico: $_" -ForegroundColor Red
    }
}

function DeleteMedico {
    param (
        [string]$id
    )
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/medicos/$id" -Method Delete -Headers $headers
        Write-Host "Médico eliminado exitosamente." -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error al eliminar médico: $_" -ForegroundColor Red
    }
}

function GetDisponibilidad {
    param (
        [string]$id
    )
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/medicos/$id/disponibilidad" -Method Get -Headers $headers
        Write-Host "Disponibilidad obtenida exitosamente:" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error al obtener disponibilidad: $_" -ForegroundColor Red
    }
}

function UpdateDisponibilidad {
    param (
        [string]$id,
        [array]$disponibilidad
    )
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    $body = @{
        disponibilidad = $disponibilidad
    } | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/medicos/$id/disponibilidad" -Method Put -Headers $headers -Body $body -ContentType "application/json"
        Write-Host "Disponibilidad actualizada exitosamente:" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error al actualizar disponibilidad: $_" -ForegroundColor Red
    }
}

function SearchMedicos {
    param (
        [hashtable]$searchParams
    )
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    $queryString = ""
    foreach ($key in $searchParams.Keys) {
        $queryString += "$key=$($searchParams[$key])&"
    }
    $queryString = $queryString.TrimEnd("&")
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/busqueda/medicos?$queryString" -Method Get -Headers $headers
        Write-Host "Búsqueda de médicos exitosa:" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Error en la búsqueda de médicos: $_" -ForegroundColor Red
    }
}

# Ejemplos de uso

# 1. Iniciar sesión (reemplaza con tus credenciales)
# Login -email "admin@mediplus.com" -password "password123"

# 2. Obtener todos los médicos
# GetAllMedicos

# 3. Crear un nuevo médico
<#
$nuevoMedico = @{
    nombre = "Juan"
    apellido = "Pérez"
    documento = "12345678"
    email = "juan.perez@ejemplo.com"
    telefono = "123456789"
    especialidad = "Cardiología"
    licenciaMedica = "MED-12345"
    direccion = @{
        calle = "Av. Principal 123"
        ciudad = "Ciudad Ejemplo"
        estado = "Estado Ejemplo"
        codigoPostal = "12345"
    }
    disponibilidad = @(
        @{
            dia = "Lunes"
            horaInicio = "08:00"
            horaFin = "16:00"
        },
        @{
            dia = "Miércoles"
            horaInicio = "08:00"
            horaFin = "16:00"
        },
        @{
            dia = "Viernes"
            horaInicio = "08:00"
            horaFin = "12:00"
        }
    )
    educacion = @(
        @{
            institucion = "Universidad Nacional"
            titulo = "Doctor en Medicina"
            año = 2015
        },
        @{
            institucion = "Hospital Central"
            titulo = "Especialidad en Cardiología"
            año = 2018
        }
    )
}
CreateMedico -medicoData $nuevoMedico
#>

# 4. Obtener médico por ID (reemplaza con un ID válido)
# GetMedicoById -id "60a1b2c3d4e5f6g7h8i9j0k1"

# 5. Obtener médicos por especialidad
# GetMedicosByEspecialidad -especialidad "Cardiología"

# 6. Actualizar médico (reemplaza con un ID válido)
<#
$actualizacion = @{
    telefono = "987654321"
    estado = "Vacaciones"
}
UpdateMedico -id "60a1b2c3d4e5f6g7h8i9j0k1" -updateData $actualizacion
#>

# 7. Eliminar médico (reemplaza con un ID válido)
# DeleteMedico -id "60a1b2c3d4e5f6g7h8i9j0k1"

# 8. Obtener disponibilidad (reemplaza con un ID válido)
# GetDisponibilidad -id "60a1b2c3d4e5f6g7h8i9j0k1"

# 9. Actualizar disponibilidad (reemplaza con un ID válido)
<#
$nuevaDisponibilidad = @(
    @{
        dia = "Lunes"
        horaInicio = "09:00"
        horaFin = "17:00"
    },
    @{
        dia = "Martes"
        horaInicio = "09:00"
        horaFin = "17:00"
    },
    @{
        dia = "Jueves"
        horaInicio = "09:00"
        horaFin = "17:00"
    }
)
UpdateDisponibilidad -id "60a1b2c3d4e5f6g7h8i9j0k1" -disponibilidad $nuevaDisponibilidad
#>

# 10. Búsqueda avanzada de médicos
<#
$parametrosBusqueda = @{
    especialidad = "Cardiología"
    estado = "Activo"
}
SearchMedicos -searchParams $parametrosBusqueda
#>

Write-Host "Script de prueba para la API de médicos de MediPlus" -ForegroundColor Cyan
Write-Host "Descomenta las secciones que deseas probar y ejecuta el script" -ForegroundColor Cyan
