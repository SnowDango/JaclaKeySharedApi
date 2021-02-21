import axios from "axios";
import {shareDiscord} from '../../../src/domain/usercase/ShareDiscord'

jest.mock('axios')


describe('discordのpostTest',()=> {
  afterEach(() => jest.restoreAllMocks())
  it('should res code 204',async () =>{
    (axios.post as any) = jest.fn(async () => {
      return {status:204}
    })
    const data = await shareDiscord("jest test", "jestによるtestです")
    expect(data).toBe(204)
    expect(axios.post).toHaveBeenCalledTimes(1)
  })
})