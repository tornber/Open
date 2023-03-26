const sequelize = require('./config/db');
const Credentials = require('./models/credentials');
const Task = require('./models/tasks');
const User = require('./models/user');

const main = async () => {
    
    
    // const credentials = await Credentials.create({
    //     username: 'test',
    //     password: '1234'
    // })
    
    // const user = await  User.create({
    //          name: 'temo',
    //          age: 27,
    //          lastName: 'tutberidze',
    //          credentialsId: credentials.toJSON().id
    //      })

    //      console.log(user.toJSON());
    // const users = await User.findOne({
    //     where: {id: 16},
    //     include: [
    //         {model: Credentials, as: 'credentials'}
    //     ]
    // })
    
const userId = user.toJSON().id;

    // const tasks = await Task.bulkCreate([
    //     {title: 'go to shop', userId},
    //     {title: 'wash car', userId}
    // ]);
    
    
    const newUser = await User.findone({
        where: {id: userId},
        include: [
            {model: Task, as:'tasks'}
        ]
    })
    console.log(newUser.toJSON());
};

    const task = await Task.findOne({
        where: {id: 1},
        include: [
            {model: User, as: 'user',include : {
                {model: Credentials, as: 'credentials'}
            }}
        ]
    })

sequelize.sync({})
      .then(res => {
          main();
      })