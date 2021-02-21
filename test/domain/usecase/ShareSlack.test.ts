import axios from 'axios';
import {shareSlack} from "../../../src/domain/usercase/ShareSlack"
import {shareDiscord} from "../../../src/domain/usercase/ShareDiscord";

jest.mock("axios")

describe('slackのpostTest',() => {
  afterEach(() => jest.restoreAllMocks())
  it('should res code 200',async () =>{
    (axios.post as any) = jest.fn(async () => {
      return {status:200}
    })
    const data = await shareDiscord("jest test", "jestによるtestです")
    expect(data).toBe(200)
    expect(axios.post).toHaveBeenCalledTimes(1)
  })
})