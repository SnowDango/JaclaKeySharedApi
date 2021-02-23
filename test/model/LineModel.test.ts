import LineModel from "../../src/model/LineModel";
import {load} from "ts-dotenv";
import MockDate from 'mockdate'
import axios from "axios";

const env = load({ LINE_USER_ID: String})
const testDate = 1614007825481
const testUser = "LineUserName"

const model = new LineModel()

const baseStatusFormat = (status:string): string => {
  return `${testUser}が部室の鍵を${status}`
}
const baseTextFormat = (status:string): string => {
  return ` user: LineUserName \n status: ${status} \n data: 2021/02/23(火) 00:30:25`
}
const notStatusText = 'not status'
const notTextText = 'not text'

describe('borrowed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn( async () => {
      return {status: 200,data:{displayName: testUser}}
    });
    const testText = "かり"
    const {baseStatus,baseText,twitterText} = await model.textModel(env.LINE_USER_ID,testText)
    expect(baseStatus).toBe(baseStatusFormat("借りました"))
    expect(baseText).toBe(baseTextFormat("借りました"))
    expect(twitterText).toBe("")
  });
})

describe('opened', () => {
  afterEach( () => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn( async () => {
      return {status: 200,data:{displayName: testUser}}
    });
    const testText = "開けました"
    const {baseStatus,baseText,twitterText} = await model.textModel(env.LINE_USER_ID,testText)
    expect(baseStatus).toBe(baseStatusFormat("開けました"))
    expect(baseText).toBe(baseTextFormat("開けました"))
    expect(twitterText).toBe("開けました")
  });
})


describe('borrowed and opened', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "かりあけ"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(baseStatusFormat("借りて開けました"))
    expect(baseText).toBe(baseTextFormat("借りて開けました"))
    expect(twitterText).toBe("開けました")
  })
})

describe('closed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: testUser}}
    });
    const testText = "研A301の鍵をしめました"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(baseStatusFormat("閉めました"))
    expect(baseText).toBe(baseTextFormat("閉めました"))
    expect(twitterText).toBe("閉めました")
  })
})

describe('opened and closed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: testUser}}
    });
    const testText = "あけてしめました"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(baseStatusFormat("開けて閉めました"))
    expect(baseText).toBe(baseTextFormat("開けて閉めました"))
    expect(twitterText).toBe("開けて閉めました")
  })
})

describe('returned', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: testUser}}
    });
    const testText = "かえしました"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(baseStatusFormat("返しました"))
    expect(baseText).toBe(baseTextFormat("返しました"))
    expect(twitterText).toBe("")
  })
})

describe('closed and returned', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "しめかえし"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(baseStatusFormat("閉めて返しました"))
    expect(baseText).toBe(baseTextFormat("閉めて返しました"))
    expect(twitterText).toBe("閉めました")
  })
})

describe('all status', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: testUser}}
    });
    const testText = "かりあけしめかえし"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(baseStatusFormat("借りて開けて閉めて返しました"))
    expect(baseText).toBe(baseTextFormat("借りて開けて閉めて返しました"))
    expect(twitterText).toBe("開けて閉めました")
  })
})

describe('random text', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: testUser}}
    });
    const testText = "今日21:00くらいからdiscordでamong usやるみたいなんで、やりたい方どうぞー\n" + "後輩大歓迎"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(notStatusText)
    expect(baseText).toBe(notTextText)
    expect(twitterText).toBe(notTextText)
  })
})

describe('take away after 10',() => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: testUser}}
    });
    const testText = "学務課に鍵を返せなかったので、のーだが持って帰ります"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(`${testUser}が鍵を持ち帰りました`)//部室の鍵か断定出来ない
    expect(baseText).toBe(baseTextFormat("持ち帰りました"))
    expect(twitterText).toBe(notTextText)
  })
})

describe('take away before 10', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(testDate);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "鍵持ち帰ります"
    const {baseStatus, baseText,twitterText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe(baseStatusFormat("持ち帰りました"))
    expect(baseText).toBe(baseTextFormat("持ち帰りました"))
    expect(twitterText).toBe("")
  })
})

