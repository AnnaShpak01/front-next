export async function GET() {
  try {
    const initialFiltersData = await fetch('http://localhost:8080/filters')
    return initialFiltersData
  } catch (error) {
    console.error('Error fetching initial filters data:', error)
    return []
  }
}
