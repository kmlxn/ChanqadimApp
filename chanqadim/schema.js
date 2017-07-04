import { schema } from 'normalizr'

export const item = new schema.Entity('items', {}, { idAttribute: 'url' })
export const items = new schema.Array(item)

export const bundle = new schema.Entity(
  'bundles',
  { items },
  { idAttribute: 'url' }
)
export const bundles = new schema.Array(bundle)

export const category = new schema.Entity(
  'categories',
  { bundles },
  { idAttribute: 'url' }
)
export const categories = new schema.Array(category)
