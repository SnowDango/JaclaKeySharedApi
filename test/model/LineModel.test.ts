import LineModel from "../../src/model/LineModel";
import {load} from "ts-dotenv";
import MockDate from 'mockdate'
import axios from "axios";

const env = load({
  LINE_USER_ID: String
})

describe('borrowed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn( async () => {
      return {status: 200,data:{displayName: "LineUserName"}}
    });
    const testText = "かり"
    const model = new LineModel()
    const {baseStatus,baseText} = await model.textModel(env.LINE_USER_ID,testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を借りました')
    expect(baseText).toBe(' user: LineUserName \n status: 借りました \n data: 2021/02/23(火) 00:30:25')
  });
})

describe('opened', () => {
  afterEach( () => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn( async () => {
      return {status: 200,data:{displayName: "LineUserName"}}
    });
    const testText = "開けました"
    const model = new LineModel()
    const {baseStatus,baseText} = await model.textModel(env.LINE_USER_ID,testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を開けました')
    expect(baseText).toBe(' user: LineUserName \n status: 開けました \n data: 2021/02/23(火) 00:30:25')
  });
})


describe('borrowed and opened', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "かりあけ"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を借りて開けました')
    expect(baseText).toBe(' user: LineUserName \n status: 借りて開けました \n data: 2021/02/23(火) 00:30:25')
  })
})

describe('closed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "研A301の鍵をしめました"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を閉めました')
    expect(baseText).toBe(' user: LineUserName \n status: 閉めました \n data: 2021/02/23(火) 00:30:25')
  })
})

describe('opened and closed', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "あけてしめました"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を開けて閉めました')
    expect(baseText).toBe(' user: LineUserName \n status: 開けて閉めました \n data: 2021/02/23(火) 00:30:25')
  })
})

describe('returned', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "かえしました"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を返しました')
    expect(baseText).toBe(' user: LineUserName \n status: 返しました \n data: 2021/02/23(火) 00:30:25')
  })
})

describe('closed and returned', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "しめかえし"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を閉めて返しました')
    expect(baseText).toBe(' user: LineUserName \n status: 閉めて返しました \n data: 2021/02/23(火) 00:30:25')
  })
})

describe('all status', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "かりあけしめかえし"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を借りて開けて閉めて返しました')
    expect(baseText).toBe(' user: LineUserName \n status: 借りて開けて閉めて返しました \n data: 2021/02/23(火) 00:30:25')
  })
})

describe('random text', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "今日21:00くらいからdiscordでamong usやるみたいなんで、やりたい方どうぞー\n" + "後輩大歓迎"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('not status')
    expect(baseText).toBe('not text')
  })
})

describe('take away after 10',() => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "学務課に鍵を返せなかったので、のーだが持って帰ります"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('LineUserNameが鍵を持ち帰りました')
    expect(baseText).toBe(' user: LineUserName \n status: 持ち帰りました \n data: 2021/02/23(火) 00:30:25')
  })
})

describe('take away before 10', () => {
  afterEach(() => {jest.restoreAllMocks()})
  it('should status and text is base format', async () => {
    MockDate.set(1614007825481);
    (axios.get as any) = jest.fn(async () => {
      return {status: 200, data: {displayName: "LineUserName"}}
    });
    const testText = "鍵持ち帰ります"
    const model = new LineModel()
    const {baseStatus, baseText} = await model.textModel(env.LINE_USER_ID, testText)
    expect(baseStatus).toBe('LineUserNameが部室の鍵を持ち帰りました')
    expect(baseText).toBe(' user: LineUserName \n status: 持ち帰りました \n data: 2021/02/23(火) 00:30:25')
  })
})

