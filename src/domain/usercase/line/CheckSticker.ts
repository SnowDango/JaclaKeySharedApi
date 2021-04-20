import StickerIds from './stickerId.json'

export const checkSticker = (packageId: string, stickerId: string): number => {
  if (packageId === StickerIds.package) {
    switch (stickerId) {
      case StickerIds.borrow: {
        return 1
      }
      case StickerIds.open: {
        return 2
      }
      case StickerIds.closed: {
        return 3
      }
      case StickerIds.return: {
        return 4
      }
      default: {
        return 0
      }
    }
  } else {
    return 0
  }
}