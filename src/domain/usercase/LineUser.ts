import {load} from 'ts-dotenv'
import axios from 'axios'

const env = load({
  LINE_API_URL: String,
  LINE_CHANNEL_ACCESS_TOKEN: String
})

export const getUserName = async ( userId: string ):Promise<string> => {
  const content = {
    headers: {
      Authorization:'Bearer '+ env.LINE_CHANNEL_ACCESS_TOKEN
    }
  }
  // LineからUserNameを持ってくる
  try {
    const userData = await axios.get(env.LINE_API_URL + userId, content)
    return userData.data.displayName
  }catch (e) {
    return "友達でないUser"
  }
}