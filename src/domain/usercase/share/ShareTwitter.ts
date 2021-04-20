import TwitterApi from 'twitter-api-v2';
import {load} from "ts-dotenv";

const env = load({
  TWITTER_API_KEY: String,
  TWITTER_API_KEY_SECRET: String,
  TWITTER_ACCESS_TOKEN: String,
  TWITTER_ACCESS_TOKEN_SECRET: String
})

const twitterClient = new TwitterApi({
  appKey: env.TWITTER_API_KEY,
  appSecret: env.TWITTER_API_KEY_SECRET,
  accessToken: env.TWITTER_ACCESS_TOKEN,
  accessSecret: env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const shareTwitter = async (baseStatus: string): Promise<number> => {
  if (baseStatus !== 'not text') {
    const result = await twitterClient.v1.tweet(baseStatus).catch(error => {
      return error
    })
    if (result.text === baseStatus) {
      return 200
    } else if (result.data.errors[0].code === 187) { //重複するtweet
      return await shareTwitter(baseStatus + "。");
    } else {
      return 404
    }
  } else {
    return 300
  }
}