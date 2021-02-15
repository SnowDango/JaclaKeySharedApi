import {Router} from "express";

export const router: Router = Router()
router.post('/fromLine',(req, res) => {

  // TODO LineからのPost (path変更可)

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

  // 一時的なもの
  res.status(200)
  res.send()
})