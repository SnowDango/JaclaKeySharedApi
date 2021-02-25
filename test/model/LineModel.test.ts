import LineModel,{TextModel} from "../../src/model/LineModel";
import {load} from "ts-dotenv";
import MockDate from 'mockdate'
import {getUserName} from '../../src/domain/usercase/LineUser';
import {howKeyStatus,whereKey} from '../../src/domain/usercase/KeyStatus';

const env = load({ LINE_USER_ID: String})
const testUser = "LineUserName"

const model = new LineModel()

const baseStatusFormat = (status:string): string => {
  return `${testUser}が部室の鍵を${status}`
}
const baseTextFormat = (status:string): string => {
  return ` user: LineUserName \n status: ${status} \n data: 2021/02/20(土) 00:00:00`
}
const notStatusText = 'not status'
const notTextText = 'not text'

describe('borrowed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{status: 1,index: 0}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "かり"
    const result: TextModel = await model.textModel(env.LINE_USER_ID,testText)
    expect(result.baseStatus).toBe(baseStatusFormat("借りました"))
    expect(result.baseText).toBe(baseTextFormat("借りました"))
    expect(result.twitterText).toBe("")
  });
})

describe('opened', () => {
  afterEach( () => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{status: 2,index: 0}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "開けました"
    const result: TextModel = await model.textModel(env.LINE_USER_ID,testText)
    expect(result.baseStatus).toBe(baseStatusFormat("開けました"))
    expect(result.baseText).toBe(baseTextFormat("開けました"))
    expect(result.twitterText).toBe("開けました")
  });
})


describe('borrowed and opened', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{index: 0,status: 1},{index: 2,status: 2}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "かりあけ"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(baseStatusFormat("借りて開けました"))
    expect(result.baseText).toBe(baseTextFormat("借りて開けました"))
    expect(result.twitterText).toBe("開けました")
  })
})

describe('closed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{index: 9,status: 3}]));
    (whereKey as any) = jest.fn( async () => ([{index: 0,place: "部室"}]));
    const testText = "研A301の鍵をしめました"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(baseStatusFormat("閉めました"))
    expect(result.baseText).toBe(baseTextFormat("閉めました"))
    expect(result.twitterText).toBe("閉めました")
  })
})

describe('opened and closed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{index: 0,status: 2},{index: 3,status: 3}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "あけてしめました"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(baseStatusFormat("開けて閉めました"))
    expect(result.baseText).toBe(baseTextFormat("開けて閉めました"))
    expect(result.twitterText).toBe("開けて閉めました")
  })
})

describe('returned', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{index: 0,status: 4}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "かえしました"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(baseStatusFormat("返しました"))
    expect(result.baseText).toBe(baseTextFormat("返しました"))
    expect(result.twitterText).toBe("")
  })
})

describe('closed and returned', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{index: 0,status: 3},{index: 2,status: 4}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "しめかえし"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(baseStatusFormat("閉めて返しました"))
    expect(result.baseText).toBe(baseTextFormat("閉めて返しました"))
    expect(result.twitterText).toBe("閉めました")
  })
})

describe('all status', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{index: 0,status: 1},{index: 2,status: 2},{index: 4,status: 3},{index: 6,status: 4}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "かりあけしめかえし"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(baseStatusFormat("借りて開けて閉めて返しました"))
    expect(result.baseText).toBe(baseTextFormat("借りて開けて閉めて返しました"))
    expect(result.twitterText).toBe("開けて閉めました")
  })
})

describe('random text', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "今日21:00くらいからdiscordでamong usやるみたいなんで、やりたい方どうぞー\n" + "後輩大歓迎"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(notStatusText)
    expect(result.baseText).toBe(notTextText)
    expect(result.twitterText).toBe(notTextText)
  })
})

describe('take away after 10',() => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{index: 20,status: 5}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "学務課に鍵を返せなかったので、Userが持って帰ります"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(`${testUser}が鍵を持ち帰りました`)//部室の鍵か断定出来ない
    expect(result.baseText).toBe(baseTextFormat("持ち帰りました"))
    expect(result.twitterText).toBe(notTextText)
  })
})

describe('take away before 10', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(new Date('2/20/2021'));
    (getUserName as any) = jest.fn( async () => ("LineUserName"));
    (howKeyStatus as any) = jest.fn( async () => ([{index: 1,status: 5}]));
    (whereKey as any) = jest.fn( async () => ([]));
    const testText = "鍵持ち帰ります"
    const result: TextModel = await model.textModel(env.LINE_USER_ID, testText)
    expect(result.baseStatus).toBe(`${testUser}が鍵を持ち帰りました`)
    expect(result.baseText).toBe(baseTextFormat("持ち帰りました"))
    expect(result.twitterText).toBe("not text")
  })
})

