const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(5)

const hash = (val) => {
  return bcrypt.hashSync(val, salt)
}

const compare = (val, hashed) => {
  return bcrypt.compareSync(val, hashed)
}

// console.log(hash('superzero'))

module.exports = { hash, compare }