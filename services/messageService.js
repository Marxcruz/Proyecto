const Message = require('../models/menssageModel');

class MessageService {
    constructor() {}
    async getAll(){
        const messages = await Message.find({})
        return messages
    }

    async create(msj){
        const message = new Message(msj)
        return await message.save()
    }

}
module.exports = MessageService