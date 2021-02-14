import Express from 'express'

const port = 3000 // port変更しても可
const startedFunc = ()=>{ // 開始時のfunc

}

const app: Express.Express = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

const router: Express.Router = Express.Router()
// TODO router処理
app.use(router)

app.listen(port,startedFunc)