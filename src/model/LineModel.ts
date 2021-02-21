import {shareSlack} from '../domain/usercase/ShareSlack'
import {shareDiscord} from "../domain/usercase/ShareDiscord";
import {getUserName} from "../domain/usercase/LineUser";
import {howKeyStatus, whereKey} from "../domain/usercase/KeyStatus";
import {shareTwitter} from "../domain/usercase/ShareTwitter";

export default class LineModel{

  textModel = (userId: string, text: string): void => {
    const userName = getUserName(userId)
    const status = howKeyStatus()
    const place = whereKey()


    // text時の処理

  }

  stickerModel = (userId: string, packageId: string, sticker: string): void => {

    // sticker時の処理

  }

  private share = (): void => {
    shareDiscord("","").catch(error => {console.log(error)})
    shareSlack("","").catch(error => {console.log(error)})
    shareTwitter("")
  }
}