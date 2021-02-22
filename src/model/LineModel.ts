import {shareSlack} from '../domain/usercase/ShareSlack'
import {shareDiscord} from "../domain/usercase/ShareDiscord";
import {getUserName} from "../domain/usercase/LineUser";
import {howKeyStatus, whereKey} from "../domain/usercase/KeyStatus";
import {shareTwitter} from "../domain/usercase/ShareTwitter";

export default class LineModel{

  textModel = async (userId: string, text: string) => {
    const userName = getUserName(userId)
    const status = await howKeyStatus(text)
    const place = await whereKey(text)

    // text時の処理

  }

  stickerModel = async (userId: string, packageId: string, sticker: string) => {

    // sticker時の処理

  }

  private share = (): void => {
    shareDiscord("","").catch(error => {console.log(error)})
    shareSlack("","").catch(error => {console.log(error)})
    shareTwitter("")
  }
}