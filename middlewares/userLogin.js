const userLogin=(req,res,netx)=>{
    let isLogin=true
    if(!isLogin){
        return res.status(401).jsom({'message':"usuario no logeado"})
    }
    netx()
}
module.exports=userLogin