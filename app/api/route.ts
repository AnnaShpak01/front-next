export async function GET(request: Request) {
  try {
    const initialFiltersData = await fetch('http://localhost:8080/filters', {
      method: 'PUT',
      headers: request.headers,
    })
    return initialFiltersData
  } catch (error) {
    console.error('Error fetching initial filters data:', error)
    return []
  }
}
