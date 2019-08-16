import { SubscriptionClient } from 'graphql-subscriptions-client'

const host = process.env.NODE_ENV === 'production'
  ? process.env.PROD_SUBSCRIPTION_ENDPOINT
  : process.env.DEV_SUBSCRIPTION_ENDPOINT

export const ws = new SubscriptionClient(host, {
  reconnect: true,
  connectionCallback: error => {
    error && console.error(error)
  }
})
