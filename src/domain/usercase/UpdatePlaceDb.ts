import PlaceDB from "../entity/PlaceDB";

const placeDb = new PlaceDB()

export type PlaceData = {
  abb: string,
  place: string
}

export const insertPlace = async (abbreviation: string, place: string): Promise<boolean> => {
  try {
    await placeDb.insert(abbreviation, place)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const removePlace = async (abbreviation: string): Promise<boolean> => {
  try {
    await placeDb.remove(abbreviation)
    return true
  } catch (e) {
    return false
  }
}

export const showPlace = async (): Promise<PlaceData[] | null> => {
  try {
    const places = await placeDb.getAll()
    console.log(places)
    return places.rows.map(data => ({
      abb: data.abbreviation,
      place: data.place
    }))
  } catch (e) {
    return null
  }
}