import {insertPlace, PlaceData, removePlace, showPlace} from "../domain/usercase/db/UpdatePlaceDb";

export default class PlaceUpdateModel {

  PLACE_COMMAND_TYPE = {
    input: 0,
    remove: 1,
    show: 2
  }

  PLACE_ELEMENT_LOCATION = {
    command: 0,
    abbreviation: 1, // 場所の略称
    place: 2 // 場所の正式名所
  }

  updateModel = async (command: number, textList: string[]): Promise<string> => {
    try {
      switch (command) {
        case this.PLACE_COMMAND_TYPE.input:
          if (!await insertPlace(textList[this.PLACE_ELEMENT_LOCATION.abbreviation], textList[this.PLACE_ELEMENT_LOCATION.place])) {
            return "データベースエラーが発生しました"
          } else {
            return `場所情報に${textList[this.PLACE_ELEMENT_LOCATION.abbreviation]}が${textList[this.PLACE_ELEMENT_LOCATION.place]}として追加されました`
          }
        case this.PLACE_COMMAND_TYPE.remove:
          if (!await removePlace(textList[this.PLACE_ELEMENT_LOCATION.abbreviation])) {
            return "データベースエラーが発生しました"
          } else {
            return `場所情報から${textList[this.PLACE_ELEMENT_LOCATION.abbreviation]}を削除しました`
          }
        case this.PLACE_COMMAND_TYPE.show:
          try {
            const places: PlaceData[] | null = await showPlace().catch(error => {
              return null
            })
            // dataが存在しないとき
            if (places === null) return "場所情報は存在しません";
            const resList: string[] = ['場所の情報を表示します\n'];
            places.forEach(place => {
              resList.push(`${place.abb} => ${place.place}\n`)
            })
            return resList.join(" ");
          } catch (e) {
            return "データベースエラーが発生しました"
          }
        default:
          return "";
      }
    } catch (e) {
      return "入力が間違っているかエラーが発生しました"
    }
  }
}