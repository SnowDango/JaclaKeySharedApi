import {load} from "ts-dotenv";
import axios from "axios";

const env = load({
  SLACK_URL: String
})

export const shareSlack = async (baseStatus: string, baseText: string): Promise<number> => {
  const params = {
    text: baseStatus + "\n>>>" + baseText
  }
  const data = await axios.post(env.SLACK_URL, params, {headers: {'content-type': "application/json"}})
    .catch(error => ({status: 400}))
  return data.status // success 200
}