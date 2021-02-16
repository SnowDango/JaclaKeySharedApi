import ResponseLine from "../responses/ResponseLine"
import {Response} from "express";

export default class KeyStatusController {

  response: ResponseLine

  constructor(res: Response) {
    this.response = new ResponseLine(res)
  }

  fromLineText = (userId: string, text: string) => {

    // TODO textの場合の処理

    this.response.successRes(200)
  }

  fromLineSticker = (userId: string, packageId: string, sticker: string) => {

    // TODO stickerの場合の処理

    this.response.successRes(200)
  }

}