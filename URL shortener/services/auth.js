const jwt = require('jsonwebtoken');
const secretKey = "shreyansh$@123"
// const sessionIdToUserMap = new Map();

function setUser(user) {
    // sessionIdToUserMap.set(id,user);
    return jwt.sign({ _id: user._id, email: user.email }, secretKey)

}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretKey)
    }
    catch (e){
        return null;
    }

}

module.exports = { setUser, getUser }