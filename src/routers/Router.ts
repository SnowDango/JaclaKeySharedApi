import {Router} from "express";
import KeyStatusController from "../controllers/KeyStatusController"

export const router: Router = Router()
router.post('/fromLine',(req, res) => {

  const controller = new KeyStatusController(res)

  const body = req.body
  const messageType: string = body.events[0].type
  const userId = body.events[0].source.userId

  if(messageType === "text"){ // messagePatternがTextの時

    const text = body.events[0].text
    controller.fromLineText(userId,text)

  }else if(messageType === "sticker"){ // messagePatternがstickerの時

    const packageId = body.events[0].packageId
    const stickerId = body.events[0].stickerId
    controller.fromLineSticker(userId,packageId,stickerId)

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