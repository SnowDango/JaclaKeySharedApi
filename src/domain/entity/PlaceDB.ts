import {Pool, QueryResult} from 'pg'
import {load} from "ts-dotenv";

const env = load({
  DB_URL: String
})

export default class PlaceDB {
  private readonly client: Pool
  public tableName: string = "place"

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

  insert = async (abb: string, place: string): Promise<QueryResult> => {
    return await this.client.query(`insert into ${this.tableName} values (default,'${place}','${abb}');`);
  }

  remove = async (abb: string): Promise<QueryResult> => {
    return await this.client.query(`delete from ${this.tableName} where abbreviation='${abb}';`);
  }

}