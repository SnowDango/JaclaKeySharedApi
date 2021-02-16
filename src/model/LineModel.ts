import {shareSlack} from '../domain/usercase/ShareSlack'
import {shareDiscord} from "../domain/usercase/ShareDiscord";

export default class LineModel{

  textModel = (userId: string, text: string) => {

  }

  stickerModel = (userId: string, packageId: string, sticker: string) => {

  }

  private share = () => {
    shareDiscord("","")
    shareSlack("","")
  }
}