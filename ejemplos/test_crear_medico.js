const axios = require('axios');
const medicoData = require('./crear_medico.json');

// URL del servidor - actualizado al puerto 3001 donde está ejecutándose el servidor
const API_URL = 'http://localhost:3001/api/v1/medicos';

async function crearMedico() {
  try {
    console.log('Enviando solicitud para crear médico...');
    console.log('Datos del médico:', JSON.stringify(medicoData, null, 2));
    
    const response = await axios.post(API_URL, medicoData);
    
    console.log('¡Médico creado exitosamente!');
    console.log('Respuesta del servidor:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error al crear médico:');
    if (error.response) {
      // El servidor respondió con un código de estado diferente de 2xx
      console.error('Respuesta del servidor:', JSON.stringify(error.response.data, null, 2));
      console.error('Código de estado:', error.response.status);
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor. Verifica que el servidor esté ejecutándose.');
    } else {
      // Error al configurar la solicitud
      console.error('Error:', error.message);
    }
  }
}

crearMedico();
