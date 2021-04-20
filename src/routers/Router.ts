import {Router} from "express";
import KeyStatusController from "../controllers/KeyStatusController"
import Discord, {Client, TextChannel} from "discord.js";
import DiscordCommandController from "../controllers/DiscordCommandController";

export const router: Router = Router()
router.post('/fromLine', (req, res) => {

  const controller = new KeyStatusController(res)

  const body = req.body
  const messageType: string = body.events[0].message.type
  const userId = body.events[0].source.userId

  if (messageType === "text") { // messagePatternがTextの時

    const text = body.events[0].message.text
    controller.fromLineText(userId, text)

  } else if (messageType === "sticker") { // messagePatternがstickerの時

    const packageId = body.events[0].message.packageId
    const stickerId = body.events[0].message.stickerId
    controller.fromLineSticker(userId, packageId, stickerId)

  }
})

export const client: Client = new Discord.Client()
client.on("ready", () => {
  if (client.user !== null) {
    console.log(`${client.user.tag} でログインしてます。`)
  }
})
client.on("message", msg => {
  if (msg.channel instanceof TextChannel) {
    console.log(`TextChannelに${msg.author.username}が${msg.content}と投稿`);
    const controller = new DiscordCommandController(msg.channel);
    controller.execute(msg.content).catch(console.log)
  }
})

/* LineからのpostData(多分あってるはず)
  {
    events:[
      message: {
        type: "" , // stamp or sticker
        text: "" , // typeがtext時のみ
        packageId: "" , // stamp package id
        stickerId: "" , // stamp sticker id
      },
      source: {
        userId: // line user id
      },
    ],
  }
   */