import LineModel from "../../src/model/LineModel";
import {load} from "ts-dotenv";
import MockDate from 'mockdate'
import {getUserName} from '../../src/domain/usercase/line/LineUser';
import {howKeyStatus, whereKey} from '../../src/domain/usercase/db/KeyStatus';
import {shareTwitter} from "../../src/domain/usercase/share/ShareTwitter";
import {shareDiscord} from "../../src/domain/usercase/share/ShareDiscord";
import {shareSlack} from "../../src/domain/usercase/share/ShareSlack";

import StickerIds from '../../src/domain/usercase/line/stickerId.json';

const env = load({
  LINE_USER_ID: String
})


const model = new LineModel();

//init mock
MockDate.set(new Date('2/20/2021'));
(getUserName as any) = jest.fn(async () => ("LineUserName"));
(shareDiscord as any) = jest.fn(async () => {
  return 204
});
(shareSlack as any) = jest.fn(async () => {
  return 200
});

describe('borrowed', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{status: 1, index: 0}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (300));
    const testText = "かり"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  });
})

describe('opened', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{status: 2, index: 0}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (200));
    const testText = "開けました"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  });
})


describe('borrowed and opened', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{index: 0, status: 1}, {index: 2, status: 2}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (200));
    const testText = "かりあけ"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  })
})

describe('closed', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{index: 9, status: 3}]));
    (whereKey as any) = jest.fn(async () => ([{index: 0, place: "部室"}]));
    (shareTwitter as any) = jest.fn(async () => (200));
    const testText = "研A301の鍵をしめました"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  })
})

describe('opened and closed', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{index: 0, status: 2}, {index: 3, status: 3}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (200));
    const testText = "あけてしめました"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  })
})

describe('returned', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{index: 0, status: 4}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (300));
    const testText = "かえしました"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  })
})

describe('closed and returned', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{index: 0, status: 3}, {index: 2, status: 4}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (200));
    const testText = "しめかえし"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  })
})

describe('all status', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{index: 0, status: 1}, {index: 2, status: 2}, {
      index: 4,
      status: 3
    }, {index: 6, status: 4}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (200));
    const testText = "かりあけしめかえし"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  })
})

describe('random text', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (300));
    const testText = "今日21:00くらいからdiscordでamong usやるみたいなんで、やりたい方どうぞー\n" + "後輩大歓迎"
    const result = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeFalsy()
  })
})

describe('take away after 10', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{index: 20, status: 5}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (300));
    const testText = "学務課に鍵を返せなかったので、Userが持って帰ります"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  })
})

describe('take away before 10', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status and text is base format', async () => {
    (howKeyStatus as any) = jest.fn(async () => ([{index: 1, status: 5}]));
    (whereKey as any) = jest.fn(async () => ([]));
    (shareTwitter as any) = jest.fn(async () => (300));
    const testText = "鍵持ち帰ります"
    const result: boolean = await model.textModel(env.LINE_USER_ID, testText)
    expect(result).toBeTruthy()
  })
})

describe('sticker borrow', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  });
  it('should status is borrow', async () => {
    (shareTwitter as any) = jest.fn(async () => (300));
    const result: boolean = await model.stickerModel(env.LINE_USER_ID, StickerIds.package, StickerIds.borrow)
    expect(result).toBeTruthy()
  });
})

describe('sticker open', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  });
  it('should status is open', async () => {
    (shareTwitter as any) = jest.fn(async () => (200));
    const result: boolean = await model.stickerModel(env.LINE_USER_ID, StickerIds.package, StickerIds.open)
    expect(result).toBeTruthy();
  });
})

describe('sticker close', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status is close', async () => {
    (shareTwitter as any) = jest.fn(async () => (200));
    const result: boolean = await model.stickerModel(env.LINE_USER_ID, StickerIds.package, StickerIds.closed)
    expect(result).toBeTruthy();
  });
})

describe('sticker return', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should status is close', async () => {
    (shareTwitter as any) = jest.fn(async () => (300));
    const result: boolean = await model.stickerModel(env.LINE_USER_ID, StickerIds.package, StickerIds.return)
    expect(result).toBeTruthy();
  });
})

describe('sticker not found', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should false', async () => {
    (shareTwitter as any) = jest.fn(async () => (300));
    const result: boolean = await model.stickerModel(env.LINE_USER_ID, "29296303", "83823737")
    expect(result).toBeFalsy()
  });
})