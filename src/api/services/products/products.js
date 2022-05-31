import { logger } from '../../../web/lib'
import { stripe } from '../../lib'

export const products = async ({ params = { productParams: {}, priceParams: {} } }) => {
  
  const { productParams = {}, priceParams = {} } = params
  
  const products = await stripe.products.list(productParams)

  const itemList = []
  for (const product of products.data) {
    // Get a list of prices relating to product
    const prices = await stripe.prices.list({
      product: product.id,
      ...priceParams
    })

    const price = prices.data[0]

    // ignore prices with the "wrong" type
    if (typeof price !== 'undefined') {
      itemList.push({
        id: price.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price: price.unit_amount,
        type: price.type,
      })
    }
  }

  return itemList
}
