import {Pool, QueryResult} from 'pg'
import {load} from "ts-dotenv";

const env = load({
  DB_URL:　String,
  DB_TABLE_NAME_STATUS: String
})

export default class StatusDB {
  private readonly client:Pool
  public tableName: string = env.DB_TABLE_NAME_STATUS

  constructor() {
    this.client = new Pool({
      connectionString: env.DB_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })
  }

  getStrings = async (): Promise<QueryResult> => {
    return await this.client.query(`select string from ${this.tableName} order by status;`)
  }

  getAll = async (): Promise<QueryResult> => {
    return await this.client.query(`select * from ${this.tableName} order by status;`)
  }
}