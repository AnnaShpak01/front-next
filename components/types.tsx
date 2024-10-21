export type BingoType = {
  _id: string // Обязательное поле
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
  _id: string
}

export type FiltersType = {
  _id: string
  name: string
  label: string
  className: string
}
