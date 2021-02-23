import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import {shareSlack} from '../domain/usercase/ShareSlack'
import {shareDiscord} from "../domain/usercase/ShareDiscord";
import {getUserName} from "../domain/usercase/LineUser";
import {howKeyStatus, whereKey} from "../domain/usercase/KeyStatus";
import {shareTwitter} from "../domain/usercase/ShareTwitter";

const STATUS_TYPE = ["借り","開け","閉め","返し","持ち帰り"];

export type TextModel = {
  baseStatus: string,
  baseText: string,
  twitterText: string,
};

export type Status = {
  index: number,
  status: number,
};

// export type placeNames = '部室' | '研A302';

export type Place = {
  index: number,
  place: string,
};

export default class LineModel{

  textModel = async (userId: string, text: string): Promise<TextModel> => {
    const userName = await getUserName(userId)
    const statuses: Status[] = await howKeyStatus(text)
    const places: Place[] = await whereKey(text)

    if (statuses.filter(data => (data.index < 10)).length === 0) {
      return ({
        baseStatus: "not status",
        baseText: "not text",
        twitterText: "not text"
      });
    }

    if (statuses.filter(data => (data.status === 5)).length !== 0){
      return {
        baseStatus: `${userName}が鍵を持ち帰りました`,
        baseText: ` user: ${userName} \n` +
          ` status: 持ち帰りました \n` +
          ` data: ${dayjs(new Date()).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`,
        twitterText: 'not text'
      }
    }

    const resStatus: string[] = [`${userName}が`];
    const resTexts: string []= [];
    const twitterTexts: string[] = [];
    statuses.forEach((status, index) => {
      // 場所の検証
      if (places.length === 0 && index === 0) {
        resStatus.push("部室の鍵を");
      } else if (index !== 0) {
        const placeData = places.find(data => (data.index < status.index && data.index > statuses[index - 1].index))
        if (placeData !== undefined) {
          resStatus.push(`${placeData.place}の鍵を`);
        } else {
          if(twitterTexts[twitterTexts.length - 1] === STATUS_TYPE[1] || twitterTexts[twitterTexts.length - 1] === STATUS_TYPE[2] ) {
              twitterTexts.push("て")
              resStatus.push("て")
              resTexts.push("て")
            }
        }
      } else {
        const placeData = places.find(data => (data.index < status.index))
        if (placeData !== undefined) {
          resStatus.push(`${placeData.place}の鍵を`)
        }
      }
      // 状態の追加
      if (status.status === 2 || status.status === 3) twitterTexts.push(STATUS_TYPE[status.status - 1])
      resStatus.push(STATUS_TYPE[status.status - 1])
      resTexts.push(STATUS_TYPE[status.status - 1])
    })
    if(twitterTexts.length !== 0) {
      if(twitterTexts[twitterTexts.length - 1] === "て") twitterTexts.splice(twitterTexts.length-1,1)
      twitterTexts.push("ました")
    }
    resStatus.push("ました");
    resTexts.push("ました");

    return {
      baseStatus: resStatus.join(''),
      baseText: ` user: ${userName} \n` +
        ` status: ${resTexts.join('')} \n` +
        ` data: ${dayjs(new Date()).locale('ja').format('YYYY/MM/DD(dd) HH:mm:ss')}`,
      twitterText: twitterTexts.join('')
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
