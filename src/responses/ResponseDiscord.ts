import Discord, {TextChannel} from "discord.js";

export default class ResponseDiscord {

  private channel: Discord.TextChannel;

  constructor(channel: TextChannel) {
    this.channel = channel
  }

  response = (responseText: string) => {
    this.channel.send(responseText).catch(console.log)
  }
}


