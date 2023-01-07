const mongoose = require('mongoose');
const {Credentials} = require('./models/credentials');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/task-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(async () => {
    
    const getAll = () => {
      return User.find().populate('credentialsId');
    }

    const createCredentials = (username, password) => {
      const credentials = new Credentials({username, password});
      return credentials.save();
    }

    const createUser = (name, age, credentials, credentialsId) => {
      const user  = new User({name, age, credentials, credentialsId});
      return user.save()
    }

    const credentials = await createCredentials('Temo', '123456');
    const user = await createUser('Temo', 27, credentials, credentials._id);
    console.log(await getAll())
}).catch(error => {
    console.log(error.message)
})