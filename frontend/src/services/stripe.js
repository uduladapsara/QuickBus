import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51OcQHhSBa8YJvZ9HVz4jKpLmN2oP3qRsT4uVwXyZ6aB7cD8eF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8yZ')

export default stripePromise