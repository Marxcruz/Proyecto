const userLogin = (req, res, next) => {
    let isLogin = true;
    if (!isLogin) {
       return res.status(401).json({'message': 'usuario no logeado'})
    }
    next
}
module.exports = userLogin