import { schema } from 'normalizr'

export const category = new schema.Entity('categories', {}, { idAttribute: 'url' })
export const categories = new schema.Array(category)

export const bundle = new schema.Entity('bundles', {category}, { idAttribute: 'url' })
export const bundles = new schema.Array(bundle)

export const item = new schema.Entity('items', {bundle}, { idAttribute: 'url' })
export const items = new schema.Array(item)
