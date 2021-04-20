import Express from 'express'
import figlet from 'figlet';
import {client, router} from './routers/Router'
import {load} from "ts-dotenv";

//環境変数
const env = load({
  DISCORD_TOKEN: String
})

// server設定
const port = process.env.PORT || 5000 // port変更しても可
const startedFunc = () => { // 開始時のfunc
  figlet.loadFontSync("Standard")
  figlet.text('JACLA KEY SHARE!', ((error, result) => {
    if (!error) {
      console.log(result)
    } else {
      console.log(error)
    }
  }))
}

// app設定
const app: Express.Express = Express()
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
app.use(router)
app.listen(port, startedFunc)

// discordへのlogin
client.login(env.DISCORD_TOKEN).catch(console.log)