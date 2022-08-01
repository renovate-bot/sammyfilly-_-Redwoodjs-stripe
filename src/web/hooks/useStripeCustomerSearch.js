import { useQuery } from '@redwoodjs/web'
import gql from 'graphql-tag'

export const useStripeCustomerSearch = (querystring) => {
  if (querystring === "") 
    return {
      data: {},
      refetch: () => { return { stripeCustomerSearch: {} }}
    }
  
  const STRIPE_CUSTOMER_SEARCH = gql`
      query stripeCustomerSearch(
        $query: String
      ) {
        stripeCustomerSearch(query: $query) {
          id
          name
          email
        }
      }
    `

    const apolloResult = useQuery(
      STRIPE_CUSTOMER_SEARCH, {
        skip: querystring === null,
        variables: {
          query: querystring  
        }
      }
    )
  
    return {
      ...apolloResult,
      refetch: (nextQueryString) => {
        return apolloResult.refetch({
            query: nextQueryString
        })
      }
    }
}