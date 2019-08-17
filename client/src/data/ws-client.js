import { SubscriptionClient } from 'graphql-subscriptions-client'

const host = process.env.SUBSCRIPTION_ENDPOINT

export const ws = new SubscriptionClient(host, {
  reconnect: true,
  connectionCallback: error => {
    error && console.error(error)
  }
})
