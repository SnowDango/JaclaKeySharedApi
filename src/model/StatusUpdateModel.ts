import {insertStatus, removeStatus, showStatus, StatusData} from "../domain/usercase/db/UpdateStatusDb";
import {statusCode, statusString} from "../data/repository/PermanentCode";

export default class StatusUpdateModel {

  STATUS_COMMAND_TYPE = {
    input: 3,
    remove: 4,
    show: 5
  }

  STATUS_ELEMENT_LOCATION = {
    command: 0,
    string: 1, // ステータスと扱う文字列
    status: 2 // ステータス
  }

  updateModel = async (command: number, textList: string[]): Promise<string> => {
    try {
      switch (command) {
        case this.STATUS_COMMAND_TYPE.input:
          if (!await insertStatus(textList[this.STATUS_ELEMENT_LOCATION.string], statusCode(textList[this.STATUS_ELEMENT_LOCATION.status]))) {
            return "データベースエラーが発生しました"
          } else {
            return `鍵情報に${textList[this.STATUS_ELEMENT_LOCATION.string]}が${textList[this.STATUS_ELEMENT_LOCATION.status]}として追加されました`
          }
        case this.STATUS_COMMAND_TYPE.remove:
          if (!await removeStatus(textList[this.STATUS_ELEMENT_LOCATION.string])) {
            return "データベースエラーが発生しました"
          } else {
            return `鍵情報から${textList[this.STATUS_ELEMENT_LOCATION.string]}を削除しました`
          }
        case this.STATUS_COMMAND_TYPE.show:
          try {
            const statuses: StatusData[] | null = await showStatus()
            // dataが存在しないとき
            if (statuses === null) return "鍵情報が存在しません"
            const resList: string[] = ['鍵情報を表示します\n']
            statuses.forEach(status => {
              resList.push(`${status.string} => ${statusString(status.status)}\n`)
            })
            return resList.join(" ")
          } catch (e) {
            return "データベースエラーが発生しました。"
          }
        default:
          return ""
      }
    } catch (e) {
      return "入力が間違っているかエラーが発生しました"
    }
  }

}