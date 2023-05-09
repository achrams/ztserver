const router = require('express').Router()
const { generateToken } = require('../utils/jwt')
const { compare } = require('../utils/crypt')
const db = require('../database/db.json')

router.post('/login', (req, res) => {
  if (req.body) {
    let found = false
    let user = {}
    db.users.forEach(el => {
      if(req.body.username === el.username) {
        found = true
        user = el
      }
    })
    if(found) {
      let pass = compare(req.body.password, user.password)
      if(pass) {
        const token = generateToken(user)
        res.status(200).json({
          token
        })
      } else {
        res.status(401).json({
          message: 'Wrong Authentication.'
        })
      }
    } else {
      res.status(404).json({
        message: 'User not Registered.'
      })
    }
  } else {
    res.status(401).json({
      message: 'Authentication Required.'
    })
  }
})

module.exports = router