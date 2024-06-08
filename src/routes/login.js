const express = require('express')
const { getConnection } = require('../db')

const router = express.Router()

router.post('/', async (req, res) => {
  const { email, password } = req.body

  let connection
  try {
    connection = await getConnection()
    const result = await connection.execute(
      'SELECT course FROM users_new1 WHERE email = :email AND password = :password',
      [email, password]
    )

    if (result.rows.length > 0) {
      const course = result.rows[0][0]
      res.json({ success: true, course })
    } else {
      res.json({ success: false })  // Missing semicolon
    }
  } catch (err) {
    console.error(err)  // Missing semicolon
    res.status(500).json({ error: 'Internal Server Error' })  // Missing semicolon
  } finally {
    if (connection) {
      try {
        await connection.close()  // Missing semicolon
      } catch (err) {
        console.error(err)  // Missing semicolon
      }
    }
  }
})

module.exports = router  // Missing semicolon