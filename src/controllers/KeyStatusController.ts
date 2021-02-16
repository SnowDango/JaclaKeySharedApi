import ResponseLine from "../responses/ResponseLine"
import {Response} from "express";
import LineModel from "../model/LineModel";

export default class KeyStatusController {

  response: ResponseLine
  model = new LineModel()
  constructor(res: Response) {
    this.response = new ResponseLine(res)
  }

  fromLineText = (userId: string, text: string) => {

    // TODO textの場合の処理
    this.model.textModel(userId,text)

    this.response.successRes(200)
  }

  fromLineSticker = (userId: string, packageId: string, stickerId: string) => {

    // TODO stickerの場合の処理

    this.model.stickerModel(userId,packageId,stickerId)

    this.response.successRes(200)
  }

}