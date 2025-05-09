const User = require('../models/userModel');
const Usuario = require('../models/usuarioModel');

class UserService {
    constructor() {}

    /**
     * Obtener todos los usuarios
     * @returns {Promise<Array>} Lista de usuarios
     */
    async getAll() {
        try {
            // Intentar obtener usuarios del nuevo modelo primero
            let users = [];
            try {
                users = await Usuario.find().select('-password');
            } catch (error) {
                // Si hay error, intentar con el modelo antiguo
                users = await User.find({});
            }
            return users;
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    /**
     * Obtener un usuario por ID
     * @param {string} id - ID del usuario
     * @returns {Promise<Object>} Usuario encontrado
     */
    async getById(id) {
        try {
            // Intentar obtener usuario del nuevo modelo primero
            let user = null;
            try {
                user = await Usuario.findById(id).select('-password');
            } catch (error) {
                // Si hay error, intentar con el modelo antiguo
                user = await User.findById(id);
            }
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            return user;
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    /**
     * Crear un nuevo usuario
     * @param {Object} data - Datos del usuario
     * @returns {Promise<Object>} Usuario creado
     */
    async create(data) {
        try {
            // Intentar crear en el nuevo modelo primero
            let user = null;
            try {
                user = new Usuario(data);
                return await user.save();
            } catch (error) {
                // Si hay error, intentar con el modelo antiguo
                user = new User(data);
                return await user.save();
            }
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    /**
     * Actualizar un usuario existente
     * @param {string} id - ID del usuario
     * @param {Object} data - Datos actualizados
     * @returns {Promise<Object>} Usuario actualizado
     */
    async update(id, data) {
        try {
            // Intentar actualizar en el nuevo modelo primero
            let user = null;
            try {
                user = await Usuario.findByIdAndUpdate(id, data, {
                    new: true,
                    runValidators: true
                }).select('-password');
            } catch (error) {
                // Si hay error, intentar con el modelo antiguo
                user = await User.findByIdAndUpdate(id, data, { new: true });
            }
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            return user;
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    /**
     * Eliminar un usuario
     * @param {string} id - ID del usuario
     * @returns {Promise<Object>} Resultado de la operación
     */
    async delete(id) {
        try {
            // Intentar eliminar en el nuevo modelo primero
            let user = null;
            try {
                user = await Usuario.findByIdAndDelete(id);
            } catch (error) {
                // Si hay error, intentar con el modelo antiguo
                user = await User.findByIdAndDelete(id);
            }
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            return { success: true, message: 'Usuario eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}

module.exports = UserService;
