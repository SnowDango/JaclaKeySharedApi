import {shareSlack} from "../../../src/domain/usercase/ShareSlack"
import axios from "axios";

jest.mock("axios")

describe('slackのpostTest', () => {
  afterEach(() => jest.restoreAllMocks())
  it('should res code 200', async () => {
    (axios.post as any) = jest.fn(async () => {
      return {status: 200}
    })
    const data = await shareSlack("jest test", "jestによるtestです")
    expect(data).toBe(200);
    expect(axios.post).toHaveBeenCalledTimes(1)
  })
})