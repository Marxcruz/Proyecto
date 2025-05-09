const MessageService = require('./services/messageService');
const messageService = new MessageService();

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log("Un nuevo usuario conectado");

    // Obtener y enviar todos los mensajes desde la base de datos
    const messages = await messageService.getAll();
    socket.emit('all-messages', messages);

    // Escuchar cuando alguien está escribiendo
    socket.on('writing', (username) => {
      socket.broadcast.emit('writing', username);
    });

    // Escuchar nuevos mensajes
    socket.on('new-message', async (data) => {
      if (data && data.username && data.message) {
        const messageData = {
          user: data.username,
          content: data.message
        };
        await messageService.create(messageData);
        const updatedMessages = await messageService.getAll();
        io.emit('all-messages', updatedMessages);
      } else {
        console.error('Datos de mensaje inválidos recibidos:', data);
      }
    });
  });
};
