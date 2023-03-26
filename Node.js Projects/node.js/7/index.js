const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
})

mongoose.connect('mongodb://localhost:27017/task-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("Success")
    const myUser = new User({
        name: "Temo",
        //age: 27,
        lastName: "Tutberidze"
    });
    myUser.save()
        .then(res => {
            console.log(res)
        })
}).catch(error => {
    console.log(error.message)
})

