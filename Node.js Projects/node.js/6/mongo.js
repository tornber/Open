const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

mongoClient.connect('mongodb://localhost:27017', (error, client) => {
    //console.log(error, result);
    const db = client.db('quiz');

    // db.collection('users').insertOne({
    //     name: 'Temo',
    //     // address: {
    //     //     city: 'Tbilisi',
    //     //     countery: 'Georgia'
    //     // },
    //     age: 30
    // }, (error, user) => {
    //     if(error) {
    //         console.log(error.message);
    //         return;
    //     }
    //     console.log(user);
    // })

    db.collection("users").find({age: 30}).toArray()
        .then(result => {
            console.log(result)
        })
        .catch(e => {
            console.log(e.message)
        })

})