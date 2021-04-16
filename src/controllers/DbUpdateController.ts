import {load} from "ts-dotenv";
import PlaceUpdateModel from "../model/PlaceUpdateModel";
import StatusUpdateModel from "../model/StatusUpdateModel";
import ResponseDiscord from "../responses/ResponseDiscord";
import Discord from "discord.js";

const env = load({
  DISCORD_INPUT_DB_PLACE: String,
  DISCORD_REMOVE_DB_PLACE: String,
  DISCORD_SHOW_DB_PLACE: String,
  DISCORD_INPUT_DB_STATUS: String,
  DISCORD_REMOVE_DB_STATUS: String,
  DISCORD_SHOW_DB_STATUS: String
})

export default class DbUpdateController {

  response: ResponseDiscord;
  placeModel = new PlaceUpdateModel()
  statusModel = new StatusUpdateModel()

  constructor(channel: Discord.TextChannel) {
    this.response = new ResponseDiscord(channel)
  }

  caseMatch = (command: string): number => {
    switch (command) {
      case env.DISCORD_INPUT_DB_PLACE:
        return this.placeModel.PLACE_COMMAND_TYPE.input
      case env.DISCORD_REMOVE_DB_PLACE:
        return this.placeModel.PLACE_COMMAND_TYPE.remove
      case env.DISCORD_SHOW_DB_PLACE:
        return this.placeModel.PLACE_COMMAND_TYPE.show
      case env.DISCORD_INPUT_DB_STATUS:
        return this.statusModel.STATUS_COMMAND_TYPE.input
      case env.DISCORD_REMOVE_DB_STATUS:
        return this.statusModel.STATUS_COMMAND_TYPE.remove
      case env.DISCORD_SHOW_DB_STATUS:
        return this.statusModel.STATUS_COMMAND_TYPE.show
      default:
        return -1
    }
  }
  execute = async (command: string) => {
    const textList: string[] = command.split(/\s+/)
    // textがないとき
    if (textList.length <= 0) {
      console.log(textList)
      return ""
    }

    const type = this.caseMatch(textList[0])
    console.log(`typeCode${type}と断定`);
    // commandではないとき
    if (type >= this.placeModel.PLACE_COMMAND_TYPE.input && type <= this.placeModel.PLACE_COMMAND_TYPE.show) {
      this.response.response(await this.placeModel.updateModel(type, textList))
    } else if (type >= this.statusModel.STATUS_COMMAND_TYPE.input && type <= this.statusModel.STATUS_COMMAND_TYPE.show) {
      this.response.response(await this.statusModel.updateModel(type, textList))
    } else {
      return ""
    }
  }
}