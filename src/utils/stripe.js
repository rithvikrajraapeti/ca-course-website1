const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

async function createStripeSession(course, email) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: course
          },
          unit_amount: 5000
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/login.html?email=${email}`,
    cancel_url: 'http://localhost:3000/signup.html'
  })
  return session
}

module.exports = {
  createStripeSession
}