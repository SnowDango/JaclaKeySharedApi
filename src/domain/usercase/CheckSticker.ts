import {load} from "ts-dotenv";

const env = load({
  LINE_STICKER_PACKAGE_ID: String,
  LINE_STICKER_ID_BORROW: String,
  LINE_STICKER_ID_OPEN: String,
  LINE_STICKER_ID_CLOSE: String,
  LINE_STICKER_ID_RETURN: String
})

export const StickerIds = {
  borrowed: env.LINE_STICKER_ID_BORROW,
  opened: env.LINE_STICKER_ID_OPEN,
  closed: env.LINE_STICKER_ID_CLOSE,
  returned: env.LINE_STICKER_ID_RETURN
}

export const checkSticker = (packageId: string, stickerId: string):number => {
  if(packageId === env.LINE_STICKER_PACKAGE_ID){
    switch (stickerId){
      case StickerIds.borrowed: {
        return 1
      }
      case StickerIds.opened: {
        return 2
      }
      case StickerIds.closed: {
        return 3
      }
      case StickerIds.returned: {
        return 4
      }
      default: {
        return 0
      }
    }
  }else{
    return 0
  }
}