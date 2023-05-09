const router = require('express').Router()
const db = require('../database/db.json')
const fs = require('fs')
const { verifyToken } = require('../utils/jwt')

router.get('/', (req, res) => {
  let data = db.applicants
  if(data.length) {
    res.status(200).json({
      data
    })
  } else {
    res.status(404).json({
      message: 'Data Not Found.'
    })
  }
})

router.post('/add', (req,res) => {
  let { name, cid, phone, photoUrl, itemName, type } = req.body
  let arr = db.applicants
  arr.push({
    id: db.applicants.length + 1,
    name,
    cid,
    phone,
    photoUrl,
    itemName,
    type,
    status: 0
  })

  let newData = {
    applicants: arr,
    users: db.users
  }

  fs.writeFile('./database/db.json', JSON.stringify(newData, null, 2), (err) => {
    if(err) {
      console.log(err)
      res.status(500).json({
        message: err
      })
    } else {
      res.status(201).json({
        message: 'Success!'
      })
    }
  })

})

router.put('/edit/:id', (req,res) => {
  let token = req.headers.token
  if(token) {
    let decoded = verifyToken(token)
    if(decoded) {
      let { status } = req.body
      let { id } = decoded
      let found = false
      db.users.forEach(el => {
        if(el.id == id) found = true
      })
      if (found) {
        let arr = db.applicants
        arr.forEach(el => {
          if(el.id == req.params.id) {
            el.status = status
          }
        })
        let newData = {
          applicants: arr,
          users: db.users
        }
        fs.writeFile('./database/db.json', JSON.stringify(newData, null, 2), (err) => {
          if(err) {
            console.log(err)
            res.status(500).json({
              message: err
            })
          } else {
            res.status(201).json({
              message: 'Success!'
            })
          }
        })
      } else {
        res.status(401).json({
          message: 'Unauthorized.'
        })
      }
    } else {
      res.status(401).json({
        message: 'Unauthenticated.'
      })
    }
  } else {
    res.status(401).json({
      message: 'Unauthenticated.'
    })
  }
})

router.delete('/delete/:id', (req, res) => {
  let token = req.headers.token
  const del = (val) => {
    if (val.id !== 2) return true
    else return false
  }
  if(token) {
    let decoded = verifyToken(token)
    if(decoded) {
      let { status } = req.body
      let { id } = decoded
      let found = false
      db.users.forEach(el => {
        if(el.id == id) found = true
      })
      if (found) {
        let arr = db.applicants
        var newarr = arr.data.filter(del)
        let newData = {
          applicants: newarr,
          users: db.users
        }
        fs.writeFile('./database/db.json', JSON.stringify(newData, null, 2), (err) => {
          if(err) {
            console.log(err)
            res.status(500).json({
              message: err
            })
          } else {
            res.status(201).json({
              message: 'Success!'
            })
          }
        })
      } else {
        res.status(401).json({
          message: 'Unauthorized.'
        })
      }
    } else {
      res.status(401).json({
        message: 'Unauthenticated.'
      })
    }
  } else {
    res.status(401).json({
      message: 'Unauthenticated.'
    })
  }
  
})

module.exports = router