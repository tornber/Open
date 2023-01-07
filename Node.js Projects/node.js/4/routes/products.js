const express = require('express');
const router = express.Router()
const path = require('path');
const authmiddleware = require('../middlewares/auth')



// router.get('/all',(req,res) => {
//     res.send('all products')
// })

router.get('/', (req,res) => {
    //res.sendfile(path.join(__dirname,'../','viev','products','index.html')
    res.render('/viev/products/index', {name: 'temo',price: 4,ishight : true, list: [{name: "iphone",}, {name: 'samsung'}] 
})
router.post('/',authmiddleware, (req,res,next) => {
    console.log("first function");
    //res.send('update2)
    res.redirect('/product')
    next();
}, (req,res,next) => {
    console.log("second funqtion")
    res.send('update')
})

router.put('/:productid', (req,res) => {
    try {
        const productid = parseInt(req.params.productid);
    if(productid && productid > 0) {
    res.send('product was successfully updated')
    }
    throw new Error('incorrect param')

    }catch(e) {
        res.send("Error occured " + e.message)
    }
    
})



router.use("/product/:id/coment/:comentid",(req,res) => {
    console.log(req.query,req.params,req.body)
    res.send("<h2>/product</h2>")
});

module.exports = router;