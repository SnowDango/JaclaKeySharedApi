import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import {Observable,Subscribable} from 'rxjs'

import {shareSlack} from '../domain/usercase/ShareSlack'
import {shareDiscord} from "../domain/usercase/ShareDiscord";
import {getUserName} from "../domain/usercase/LineUser";
import {howKeyStatus, whereKey} from "../domain/usercase/KeyStatus";
import {shareTwitter} from "../domain/usercase/ShareTwitter";
import {checkSticker} from "../domain/usercase/CheckSticker";

const STATUS_STRING = ["借り","開け","閉め","返し","持ち帰り"];

const STATUS_TYPE = {
  borrowed: 1,
  opened: 2,
  closed: 3,
  returned: 4
}

export type TextModel = {
  baseStatus: string,
  baseText: string,
  twitterText: string
}

export type Status = {
  index: number,
  status: number,
}

export type Place = {
  index: number,
  place: string
}

export default class LineModel{

  textModel = async (userId: string, text: string): Promise<TextModel> => {
    const userName = await getUserName(userId)
    const statuses: Status[] = await howKeyStatus(text)
    const places: Place[] = await whereKey(text)

    if (statuses.filter(data => (data.status === 5)).length !== 0){　// 持ち帰った場合
      return {
        baseStatus: `${userName}が鍵を持ち帰りました`,
        baseText: ` user: ${userName} \n` +
          ` status: 持ち帰りました \n` +
          ` data: ${dayjs(new Date()).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`,
        twitterText: 'not text'
      }
    }

    if (statuses.filter(data => (data.index < 10)).length === 0) { // 鍵情報の可能性が薄い場合
      return ({
        baseStatus: "not status",
        baseText: "not text",
        twitterText: "not text"
      });
    }else {
      return this.createTextModel(userName,statuses,places)
    }
  }

  stickerModel = async (userId: string, packageId: string, sticker: string): Promise<TextModel> => {
    const userName = await getUserName(userId)
    const status = checkSticker(packageId,sticker)

    if (status === 0) {
      return {
        baseStatus: '',
        baseText: '',
        twitterText: ''
      }
    }else {
      return {
        baseStatus: '',
          baseText: '',
          twitterText: ''
      }
    }

  }

  private createTextModel = (userName: string,statuses: Status[], places: Place[]): TextModel => {

    const resStatus: string[] = [`${userName}が`]
    const resTexts: string[] = []
    const twitterTexts: string[] = []

    statuses.forEach((status, index) => {

      if (places.length === 0 && index === 0) { // 場所情報がない場合
        resStatus.push("部室の鍵を")
      } else if (index !== 0) { // 場所情報が文字列の先頭じゃない場合
        const placeData = places.find(data => (data.index < status.index && data.index > statuses[index - 1].index))
        if (placeData !== undefined) { // 場所情報が鍵情報に挟まれているとき
          resStatus.push(`${placeData.place}の鍵を`)
        } else { //　挟まれていないとき
          if(twitterTexts[twitterTexts.length - 1] === STATUS_STRING[1] ||
            twitterTexts[twitterTexts.length - 1] === STATUS_STRING[2] ) twitterTexts.push("て")
          resStatus.push("て")
          resTexts.push("て")
        }
      } else { // 文字列が先頭なとき
        const placeData = places.find(data => (data.index < status.index))
        if (placeData !== undefined) {
          resStatus.push(`${placeData.place}の鍵を`)
        }
      }
      // 状態の追加
      if (status.status === STATUS_TYPE.opened || status.status === STATUS_TYPE.closed) twitterTexts.push(STATUS_STRING[status.status - 1])
      resStatus.push(STATUS_STRING[status.status - 1])
      resTexts.push(STATUS_STRING[status.status - 1])
    })
    if(twitterTexts.length !== 0) {
      if(twitterTexts[twitterTexts.length - 1] === "て") twitterTexts.splice(twitterTexts.length-1,1)
      twitterTexts.push("ました")
    }
    resStatus.push("ました")
    resTexts.push("ました")

    return {
      baseStatus: resStatus.join(''),
      baseText: ` user: ${userName} \n` +
        ` status: ${resTexts.join('')} \n` +
        ` data: ${dayjs(new Date()).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`,
      twitterText: twitterTexts.join('')
    }
  }

  /*private share = (observable: Observable): number => {
  }*/
}
