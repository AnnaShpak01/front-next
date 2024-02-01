import { PUT } from 'app/api/challenges/route'
import { BingoType } from 'components/reducers/bingo'

export async function updateBingoStatus(id: string, updatedData: BingoType) {
  try {
    return await PUT(id, updatedData)
  } catch (e) {
    throw new Error('Failed to update bingo')
  }
}
