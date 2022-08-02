import { useMutation } from '@redwoodjs/web'
import gql from 'graphql-tag'

export const useStripeCustomerCreate = () => {
    const [createStripeCustomer] = useMutation(
    gql`
      mutation createStripeCustomer($data: CreateStripeCustomerInput ) {
        createStripeCustomer(data: $data) {
          id
          email
        }
      }
    `
    )
    
    return async (args) => {
        // Create Payload
        const payload = {
            variables: {
                data: args
            }
        }

        // Create Customer Portal Session
        const { data: { createStripeCustomer } } = await createStripeCustomer(payload)
        return createStripeCustomer
    }
}