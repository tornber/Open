const users = [];

const login = (username,password) => {
    const user = users.find(item => item.username === username && item.password === password);
    return user;
};

const register = (username,password,roomId) => {
    const user = users.find(item => item.username === username && item.password === password && item.roomId === roomId);
    if(user) {
        return null;
    }
    users.push({username,password,roomId});
};

module.exports = {login,register};