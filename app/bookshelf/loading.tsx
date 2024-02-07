import Spinner from 'components/spinner/Spinner'

export default function Loading() {
  console.log('loading page')
  return (
    <div>
      <Spinner />
      <p>Loading bookshelf page...</p>
    </div>
  )
}
