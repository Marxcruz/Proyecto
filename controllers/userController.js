const UserService = require('../services/userService')
const userService = new UserService



exports.getAllUsers = async (req, res) => {
    const users = await userService.getAll()

    res.status(200).send(users)

}

exports.getUser = async (req, res) => {
    const id = req.params.id
    const user = await userService.filterById(id)
    if (!user) {
        return res.status(400).json({ 'message': "No encontrado" })
    }

    res.status(200).send(user)
}

exports.createUser = async (req, res) => {
    try {
        let data = req.body
        await userService.create(data)
        res.status(201).send('Usuario se registro correctamenmte')
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }

}
exports.updateUser = (req, res) => {
    let data = req.boby
    const { nombre, apellido, gmail, telefono } = data
    console.log(nombre, apellido, gmail, telefono)
    console.log(req.params.id)
    console.log(nombre, apellido, gmail, telefono)

    res.status(202).send('Usuario se edito exitosamente ')

}

exports.deleteUser = (req, res) => {
    console.log(req.params.id)
    res.status(203).send('Usuario se elimino exitosamente')
}