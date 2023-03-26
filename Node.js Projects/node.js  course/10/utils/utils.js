const users = [];

const addUser = (socketId,username,roomId) => {
    users.push({socketId,username,roomId})
    return {socketId,username,roomId}
};

const getUser = (socketId) => {
    const user = users.find(user => user.socketId == socketId);
    if(user) {
        return user
    }
    return {}
}

const register = (username,password,roomId) => 
{
    const user = users.find(item => item.username === username && item.password === password)
    if(user) {
        return null
    } else
    users.push({username,password,roomId});
    return {username,password,roomId};
}

const login = (username,password) => {
    const user = users.find(item => item.username === username && item.password === password)
    return user;
}

module.exports = {addUser,getUser,register,login};