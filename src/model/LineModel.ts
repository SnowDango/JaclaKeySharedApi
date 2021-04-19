import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import {Observable} from 'rxjs'

import {shareSlack} from '../domain/usercase/share/ShareSlack'
import {shareDiscord} from "../domain/usercase/share/ShareDiscord";
import {getUserName} from "../domain/usercase/line/LineUser";
import {howKeyStatus, whereKey} from "../domain/usercase/db/KeyStatus";
import {shareTwitter} from "../domain/usercase/share/ShareTwitter";
import {checkSticker} from "../domain/usercase/line/CheckSticker";
import {statusString} from "../data/repository/PermanentCode";

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

export default class LineModel {

  textModel = async (userId: string, text: string): Promise<boolean> => {
    const userName = await getUserName(userId)
    const statuses: Status[] = await howKeyStatus(text)
    const places: Place[] = await whereKey(text)

    if (statuses.filter(data => (data.status === 5)).length !== 0) { // 持ち帰った場合
      this.share({
        baseStatus: `${userName}が鍵を持ち帰りました`,
        baseText: ` user: ${userName} \n` +
          ` status: 持ち帰りました \n` +
          ` data: ${dayjs(new Date()).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`,
        twitterText: 'not text'
      })
      return true
    }

    if (statuses.filter(data => (data.index < 10)).length === 0) { // 鍵情報の可能性が薄い場合
      return false;
    } else {
      this.share(this.createTextModel(userName, statuses, places))
      return true;
    }
  }

  stickerModel = async (userId: string, packageId: string, stickerId: string): Promise<boolean> => {
    const user = await getUserName(userId)
    const stickerCode = checkSticker(packageId, stickerId)

    if (stickerCode === 0) {
      return false;
    }

    switch (stickerCode) {
      case 2 || 3:
        this.share({
          baseStatus: `${user}が鍵を${statusString(stickerCode)}ました。`,
          baseText: ` user: ${user} \n` +
            ` status: ${statusString(stickerCode)}ました \n` +
            ` data: ${dayjs(new Date()).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`,
          twitterText: `${statusString(stickerCode)}ました`
        })
        break;
      case 1 || 4:
        this.share({
          baseStatus: `${user}が鍵を${statusString(stickerCode)}ました。`,
          baseText: ` user: ${user} \n` +
            ` status: ${statusString(stickerCode)}ました \n` +
            ` data: ${dayjs(new Date()).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`,
          twitterText: 'not text'
        })
        break;
    }
    return true;
  }

  private createTextModel = (userName: string, statuses: Status[], places: Place[]): TextModel => {

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
        } else { // 挟まれていないとき
          if (twitterTexts[twitterTexts.length - 1] === statusString(0) ||
            twitterTexts[twitterTexts.length - 1] === statusString(1)) twitterTexts.push("て")
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
      if (status.status === STATUS_TYPE.opened || status.status === STATUS_TYPE.closed) twitterTexts.push(statusString(status.status))
      resStatus.push(statusString(status.status))
      resTexts.push(statusString(status.status))
    })
    if (twitterTexts.length !== 0) {
      if (twitterTexts[twitterTexts.length - 1] === "て") twitterTexts.splice(twitterTexts.length - 1, 1)
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

  private share = (textModel: TextModel): void => {
    const clearList: null[] = []
    const observable = new Observable(subscriber => {
      const resultCodeCheck = (code: number, target: string) => {
        switch (code) {
          case 200 || 204:
            subscriber.next(`${target} is success`)
            if (clearList.length === 3) subscriber.complete()
            break;
          case 300:
            subscriber.next("should not shared")
            if (clearList.length === 3) subscriber.complete()
            break;
          case 404:
            subscriber.error(target)
            break;
        }
      }
      shareDiscord(textModel.baseStatus, textModel.baseText).then(data => {
        resultCodeCheck(data, "discord")
      }).catch(error => {
        subscriber.error("discord")
      })
      shareSlack(textModel.baseStatus, textModel.baseText).then(data => {
        resultCodeCheck(data, "slack")
      }).catch(error => {
        subscriber.error("slack")
      })
      shareTwitter(textModel.twitterText).then(data => {
        resultCodeCheck(data, "twitter")
      }).catch(error => {
        subscriber.error("twitter")
      })
    })
    observable.subscribe({
      next(target) {
        clearList.push(null)
      },
      error(target: string) {
        console.log(`${target} is error`)
      },
      complete() {
        console.log("all shared")
      }
    })
  }
}
