import {load} from "ts-dotenv";
import axios from "axios";

const env = load({
  DISCORD_URL: String
})

export const shareDiscord = async (baseStatus: string, baseText: string): Promise<number> => {
  const params = {
    content: baseStatus + "\n```\n" + baseText + "\n```"
  }

  // discordに鍵情報を共有
  const data = await axios.post(env.DISCORD_URL, params, {headers: {"content-type": "application/json"}})
    .catch(error => {
      return {status: 400}
    })
  return data.status // success 204
}