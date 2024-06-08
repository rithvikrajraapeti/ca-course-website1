const express = require('express')
const { getConnection } = require('../db')
const { createStripeSession } = require('../utils/stripe')

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, password, course } = req.body

  console.log('Received sign-up request:', { name, email, password, course })

  let connection
  try {
    connection = await getConnection()
    console.log('Database connection established')

    await connection.execute(
      'INSERT INTO SYSTEM.users_new1 (name, EMAIL, PASSWORD, COURSE) VALUES (:NAME, :EMAIL, :PASSWORD, :COURSE)',
      {
        NAME: name,
        EMAIL: email,
        PASSWORD: password,
        COURSE: course
      },
      { autoCommit: true }
    )
    console.log('User inserted into database')

    const session = await createStripeSession(course, email)
    console.log('Stripe session created:', session.url)

    res.json({ url: session.url })
  } catch (err) {
    console.error('Error during sign-up process:', err)
    res.status(500).json({ error: 'Internal Server Error', details: err.message })
  } finally {
    if (connection) {
      try {
        await connection.close()
        console.log('Database connection closed')
      } catch (err) {
        console.error('Error closing database connection:', err)
      }
    }
  }
})

module.exports = router