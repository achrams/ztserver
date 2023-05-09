const router = require('express').Router()
const user = require('./users')
const applicants = require('./applicants')
router.get('/', (req, res) => {
  res.send('Connected!')
})
router.use('/users', user)
router.use('/applicants', applicants)

module.exports = router