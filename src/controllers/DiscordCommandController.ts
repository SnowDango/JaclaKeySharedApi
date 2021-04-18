import discordCommand from "./discordCommand.json"
import PlaceUpdateModel from "../model/PlaceUpdateModel";
import StatusUpdateModel from "../model/StatusUpdateModel";
import ResponseDiscord from "../responses/ResponseDiscord";
import Discord from "discord.js";

export default class DiscordCommandController {

  response: ResponseDiscord;
  placeModel = new PlaceUpdateModel()
  statusModel = new StatusUpdateModel()

  constructor(channel: Discord.TextChannel) {
    this.response = new ResponseDiscord(channel)
  }

  caseMatch = (command: string): number => {
    switch (command) {
      case discordCommand.place.input:
        return this.placeModel.PLACE_COMMAND_TYPE.input
      case discordCommand.place.remove:
        return this.placeModel.PLACE_COMMAND_TYPE.remove
      case discordCommand.place.show:
        return this.placeModel.PLACE_COMMAND_TYPE.show
      case discordCommand.status.input:
        return this.statusModel.STATUS_COMMAND_TYPE.input
      case discordCommand.status.remove:
        return this.statusModel.STATUS_COMMAND_TYPE.remove
      case discordCommand.status.show:
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