exports.getAllUsers=(req,res)=>{
    res.status(200).send('accediendo a todos los usuarios')

}

exports.getUser=(req,res)=>{
    console.log(req.query.enabled)
    console.group('accediendo al usuario con id:' +req.params.id)
}

exports.createUser=(req,res)=>{
let data=req.body
const{nombre,apellido,gmail,telefono}=data
console.log(nombre,apellido,gmail,telefono)
res.status(201).send('Usuario se registro correctamenmte')
}

exports.updateUser=(req,res)=>{
    let data=req.boby
    const{nombre,apellido,gmail,telefono}=data
    console.log(nombre,apellido,gmail,telefono)
    console.log(req.params.id)
    console.log(nombre,apellido,gmail,telefono)
    
res.status(202).send('Usuario se edito exitosamente ')
    
}

exports.deleteUser=(req,res)=>{
    console.log(req.params.id)
    res.status(203).send('Usuario se elimino exitosamente')
}