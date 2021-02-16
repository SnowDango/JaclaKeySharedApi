import {load} from "ts-dotenv";
import axios from "axios";

const env = load({
  DISCORD_URL: String
})

export const shareDiscord = async (baseStatus: string,baseText: string) => {
  const params = {
    payload: {
      content: baseStatus + "\n```\n" + baseText + "\n```"
    }
  }
  // discordに鍵情報を共有
  axios.post(env.DISCORD_URL,params).catch((error) => {
    console.error(error)
  })

}