const mongoose = require('mongoose');
const Task = require('./models/task');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(async () => {

    const getAll = () => {
        return User.find().populate('tasks')
    }
    
    const createTask = async (userId, title) => {
        const task = await new Task({title}).save();
        return User.findByIdAndUpdate(userId, {$push: {tasks: task._id}})
    }

    const createUser = (name, age) => {
        const user = new User({name, age});
        return user.save();
    }

    const user = await createUser('Temo2', 30);
    await createTask(user._id, 'Task 1')
    await createTask(user._id, 'Task 2')
    await createTask(user._id, 'Task 3')
    await createTask(user._id, 'Task 4')
    console.log((await getAll())[0].tasks)

}).catch(error => {
    console.log(error.message)
})