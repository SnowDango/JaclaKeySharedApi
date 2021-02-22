import {Pool, QueryResult} from 'pg'
import {load} from "ts-dotenv";

const env = load({
  DB_URL: String,
  DB_TABLE_NAME_PLACE: String
})

export default class PlaceDB{
  private readonly client:Pool
  public tableName: string = env.DB_TABLE_NAME_PLACE

  constructor() {
    this.client = new Pool({
      connectionString: env.DB_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })
  }

  getAll = async (): Promise<QueryResult> => {
    return await this.client.query(`select * from ${this.tableName};`)
  }
}