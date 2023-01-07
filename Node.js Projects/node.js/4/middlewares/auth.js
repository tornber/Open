const auth = (Req,res,next) => {
    const {email,password} = req.body;
    if(email == 'test' && password == 'test')
    next();
    return;
}
res.send("incorrect password")
module.exports = auth;