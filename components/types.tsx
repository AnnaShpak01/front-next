export type BingoType = {
  _id: string
  task: string
  color: string
  status: boolean
}

export type BookType = {
  _id: string
  status: string
  name: string
  author: string
  description: string
  imgsrc: string
  color: string
  genre: string
  pages: number
}

export type FiltersType = {
  _id: string
  name: string
  label: string
  className: string
}
