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

module.exports = {addUser,getUser};