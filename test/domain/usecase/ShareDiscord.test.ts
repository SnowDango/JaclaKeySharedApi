import {shareDiscord} from '../../../src/domain/usercase/share/ShareDiscord'
import {WebhookClient} from "discord.js";

jest.mock('discord.js')
const mockClient = WebhookClient as jest.Mock

describe('discordのpostTest', () => {
  afterEach(() => jest.restoreAllMocks())
  it('should res code 204', async () => {
    mockClient.mockImplementation(() => {
      return {
        send: async () => {
        }
      }
    })
    const data = await shareDiscord("jest test", "jestによるtestです")
    expect(data).toBe(204)
  })
})

describe('discordのpostTest', () => {
  afterEach(() => jest.restoreAllMocks())
  it('should res code 400', async () => {
    mockClient.mockImplementation(() => {
      return {
        send: async () => {
          throw Error
        }
      }
    })
    const data = await shareDiscord("jest test", "jestによるtestです")
    expect(data).toBe(400)
  })
})