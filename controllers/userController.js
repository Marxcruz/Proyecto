const UserService = require('../services/userService');
const userService = new UserService();

/**
 * @desc    Obtener todos los usuarios
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};

/**
 * @desc    Obtener un usuario por ID
 * @route   GET /api/v1/users/:id
 * @access  Private/Admin
 */
exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.getById(id);
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el usuario con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el usuario',
            error: error.message
        });
    }
};

/**
 * @desc    Crear un nuevo usuario
 * @route   POST /api/v1/users
 * @access  Private/Admin
 */
exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const newUser = await userService.create(data);
        
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

/**
 * @desc    Actualizar un usuario existente
 * @route   PUT /api/v1/users/:id
 * @access  Private/Admin
 */
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        
        const updatedUser = await userService.update(id, data);
        
        if (!updatedUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el usuario con ese ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

/**
 * @desc    Eliminar un usuario
 * @route   DELETE /api/v1/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userService.delete(id);
        
        if (!result.success) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el usuario con ese ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};