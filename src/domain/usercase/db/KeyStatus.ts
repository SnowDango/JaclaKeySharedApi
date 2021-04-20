import {QueryResult} from 'pg'
import StatusDB from "../../entity/StatusDB";
import PlaceDB from "../../entity/PlaceDB";

export const howKeyStatus = async (message: string): Promise<Array<{ index: number, status: number }>> => {
  const statusDb = new StatusDB()
  const allData: QueryResult = await statusDb.getAll()

  // 検索
  return allData.rows.map(statusData => ({
    index: message.indexOf(statusData.string),
    status: statusData.status
  })).filter(data => data.index !== -1)
}

export const whereKey = async (message: string): Promise<Array<{ index: number, place: string }>> => {
  const placeDb = new PlaceDB()
  const allData: QueryResult = await placeDb.getAll()

  //検索
  return allData.rows.map(placeData => ({
    index: message.indexOf(placeData.abbreviation),
    place: placeData.place
  })).filter(data => data.index !== -1)
}