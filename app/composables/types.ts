export interface BlogPost {
  _path: string
  title: string
  description: string
  date: string
  author?: string
  tags: string[]
  category?: string
  image?: string
  draft?: boolean
}

export interface Project {
  _path: string
  title: string
  description: string
  date: string
  author?: string
  tags: string[]
  category?: string
  image?: string
  draft?: boolean
  status?: string
}

export interface AdjacentPost {
  _path: string
  title: string
  date: string
}
