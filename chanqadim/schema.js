import { schema } from 'normalizr'

export const product = new schema.Entity('products', {}, { idAttribute: 'url' })
export const products = new schema.Array(product)

export const bundle = new schema.Entity(
  'bundles',
  { products },
  { idAttribute: 'url' }
)
export const bundles = new schema.Array(bundle)

export const category = new schema.Entity(
  'categories',
  { bundles },
  { idAttribute: 'url' }
)
export const categories = new schema.Array(category)
