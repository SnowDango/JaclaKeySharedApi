import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import {shareSlack} from '../domain/usercase/ShareSlack'
import {shareDiscord} from "../domain/usercase/ShareDiscord";
import {getUserName} from "../domain/usercase/LineUser";
import {howKeyStatus, whereKey} from "../domain/usercase/KeyStatus";
import {shareTwitter} from "../domain/usercase/ShareTwitter";

const STATUS_TYPE = ["借り","開け","閉め","返し","持ち帰り"]

export default class LineModel{

  textModel = async (userId: string, text: string): Promise<{ baseStatus:string,baseText:string }> => {
    const userName = await getUserName(userId)
    const statuses: Array<{ index: number, status: number }> = await howKeyStatus(text)
    const places: Array<{ index: number, place: string }> = await whereKey(text)

    if (statuses.filter(data => (data.index < 10)).length !== 0) {
      const resStatus: Array<string> = [`${userName}が`]
      const resTexts: Array<string> = []
      statuses.forEach((status, index) => {
        // 場所の検証
        if (places.length === 0 && index === 0) {
          resStatus.push("部室の鍵を")
        } else if (index !== 0) {
          const placeData = places.find(data => (data.index < status.index && data.index > statuses[index - 1].index))
          if (placeData !== undefined) {
            resStatus.push(`${placeData.place}の鍵を`)
          } else {
            resStatus.push("て")
            resTexts.push("て")
          }
        } else {
          const placeData = places.find(data => (data.index < status.index))
          if (placeData !== undefined) {
            resStatus.push(`${placeData.place}の鍵を`)
          }
        }
        // 状態の追加
        resStatus.push(STATUS_TYPE[status.status - 1])
        resTexts.push(STATUS_TYPE[status.status - 1])
      })
      resStatus.push("ました")
      resTexts.push("ました")
      const data = new Date()
      return {
        baseStatus: resStatus.join(''),
        baseText: ` user: ${userName} \n` +
          ` status: ${resTexts.join('')} \n` +
          ` data: ${dayjs(data).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`
      }
    } else if (statuses.filter(data => (data.status === 5)).length !== 0){
      const data = new Date()
      return {
        baseStatus: `${userName}が鍵を持ち帰りました`,
        baseText: ` user: ${userName} \n` +
          ` status: 持ち帰りました \n` +
          ` data: ${dayjs(data).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`
      }
    }else{
      return {
        baseStatus: "not status",
        baseText: "not text"
      }
    }
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
