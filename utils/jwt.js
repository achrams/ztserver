const jwt = require('jsonwebtoken')

const generateToken = (data) =>{
  return jwt.sign(data, 'zete')
}

const verifyToken = (data) => {
  return jwt.verify(data, 'zete')
} 

module.exports = {generateToken, verifyToken}