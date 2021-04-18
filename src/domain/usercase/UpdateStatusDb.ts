import StatusDB from "../entity/StatusDB";

const statusDb = new StatusDB()

export type StatusData = {
  string: string,
  status: number
}

export const insertStatus = async (string: string, status: number): Promise<boolean> => {
  try {
    await statusDb.insert(string, status)
    return true
  } catch (e) {
    console.log(e);
    return false
  }
}

export const removeStatus = async (string: string): Promise<boolean> => {
  try {
    await statusDb.remove(string)
    return true
  } catch (e) {
    return false
  }
}

export const showStatus = async (): Promise<StatusData[] | null> => {
  try {
    const statuses = await statusDb.getAll()
    return statuses.rows.map(data => ({
      string: data.string,
      status: data.status
    }))
  } catch (e) {
    return null
  }
}