import {load} from "ts-dotenv";
import {WebhookClient} from "discord.js";


const env = load({
  DISCORD_WEBHOOK_ID: String,
  DISCORD_TOKEN: String,
  DISCORD_WEBHOOK_TOKEN: String
})

export const shareDiscord = async (baseStatus: string, baseText: string): Promise<number> => {

  // discordに鍵情報を共有
  try {
    const client = new WebhookClient(env.DISCORD_WEBHOOK_ID, env.DISCORD_WEBHOOK_TOKEN)
    await client.send(baseStatus + "\n```\n" + baseText + "\n```")
    return 204// success 204
  } catch (e) {
    return 400
  }
}