import { Blog } from '@prisma/client'

// Define your interfaces here
export type IBlogFilterableFields = {
  searchTerm?: string
  title?: string
}

// extend Blog interface and added this
export type ISlugBlog = Blog & {
  nextBlog?: string | null
  previousBlog?: string | null
}
