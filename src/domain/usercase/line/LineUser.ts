import {load} from 'ts-dotenv'
import axios from 'axios'

const env = load({
  LINE_CHANNEL_ACCESS_TOKEN: String
})

const lineUserApiUrl = "https://api.line.me/v2/bot/profile/"

export const getUserName = async (userId: string): Promise<string> => {
  const content = {
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + env.LINE_CHANNEL_ACCESS_TOKEN
    }
  }
  // LineからUserNameを持ってくる
  const userData = await axios.get(lineUserApiUrl + userId, content).catch(error => {
    return {status: 404, data: {}}
  })
  return (() => {
    if (userData.status === 200) {
      return userData.data.displayName
    } else {
      return "不明なUser"
    }
  })()
}
