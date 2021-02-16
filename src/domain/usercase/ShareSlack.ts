import {load} from "ts-dotenv";
import axios from "axios";

const env = load({
  SLACK_URL: String
})

export const shareSlack = async (baseStatus: string, baseText: string) => {
  const params = {
    text: baseStatus + "\n>>>"+baseText
  }
  axios.post(env.SLACK_URL,params).catch((error) => {
    console.error(error)
  })
}