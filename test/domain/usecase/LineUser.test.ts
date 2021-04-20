import axios from "axios";
import {load} from "ts-dotenv";
import {getUserName} from '../../../src/domain/usercase/line/LineUser'

jest.mock('axios')

const env = load({
  LINE_USER_ID: String,
})

describe('get line user name', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('getUserName is successful', async () => {
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    })
    const data = await getUserName(env.LINE_USER_ID)
    expect(data).toBe("LineUserName")
  })
  jest.clearAllMocks()//mockのclear
  it('getUserName is failed', async () => {
    (axios.get as any) = jest.fn(async () => {
      return {status: 400}
    })
    const data = await getUserName(env.LINE_USER_ID)
    expect(data).toBe("不明なUser")
  })
})