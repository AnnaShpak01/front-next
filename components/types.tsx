export type BingoType = {
  _id: string // Измените id на _id
  task: string
  color: string
  status: boolean
}

export type BookType = {
  status: string
  name: string
  author: string
  description: string
  imgsrc: string
  color: string
  genre: string
  pages: number
  id: string
}

export type FiltersType = {
  id: string
  name: string
  label: string
  className: string
}
