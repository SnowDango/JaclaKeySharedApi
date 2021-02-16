import Express from 'express'
import figlet from 'figlet';
import {router} from './routers/Router'

const port = 3000 // port変更しても可
const startedFunc = () => { // 開始時のfunc
  figlet.loadFontSync("Standard")
  figlet.text('JACLA KEY SHARE!',((error, result) => {
    if(!error){
      console.log(result)
    }else{
      console.log(error)
    }
  }))
}

const app: Express.Express = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// TODO router処理
app.use(router)

app.listen(port,startedFunc)