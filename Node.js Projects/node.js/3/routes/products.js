const express = require('express');
const router = express.Router()
const path = require('path');

// router.get('/all',(req,res) => {
//     res.send('all products')
// })


 router.get('/', (req,res) => {
    // res.sendfile('C:\Users\User\Desktop\visual studio\3\viev\products');
    res.sendFile(path.join(__dirname,"../",'viev','products','index.html'))
 })

router.post('/update', (req,res) => {
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
})

module.exports = router;