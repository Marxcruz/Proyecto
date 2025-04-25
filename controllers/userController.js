exports.getAllUsers = (req, res) => {
    res.status(200).send('accediendo a  todos los usuarios')
}

exports.getUser = (req, res) => {
    console.log(req.query.enabled)
    console.send('accediendo a  todos los usuarios con id:'+ req.params.id)
}

exports.createUser =(req, res) => {
    let data = req.body
    const {nombre, apellido, email, telefono} = data
    console.log(nombre, apellido, email, telefono)
    res.status(201).send('Usuario registrado exitosamente')

}

exports.updateUser = (req, res) => {
    let data = req.body
    const {nombre, apellido, email, telefono} = data
    console.log(nombre, apellido, email, telefono)
    console.log(req.params.id)
    console.log(nombre, apellido, email, telefono)
    
}

exports.deleteUser = (req, res) => {
    console.log(req.params.id)
}
