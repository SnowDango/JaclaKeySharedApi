import StatusUpdateModel from "../../src/model/StatusUpdateModel";
import {insertStatus, removeStatus, showStatus} from "../../src/domain/usercase/db/UpdateStatusDb";

const model = new StatusUpdateModel();

describe('add status', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  const textList = ["!add-status", "kari", "借り"];
  it('should match return text update status info.', async () => {
    (insertStatus as any) = jest.fn(async (string: string, status: number): Promise<boolean> => true);
    const successResult: string = await model.updateModel(model.STATUS_COMMAND_TYPE.input, textList)
    expect(successResult).toEqual(`鍵情報に${textList[model.STATUS_ELEMENT_LOCATION.string]}が${textList[model.STATUS_ELEMENT_LOCATION.status]}として追加されました`)
  })
  it('should match return text database error.', async () => {
    (insertStatus as any) = jest.fn(async (string: string, status: number): Promise<boolean> => false)
    const errorResult: string = await model.updateModel(model.STATUS_COMMAND_TYPE.input, textList)
    expect(errorResult).toEqual("データベースエラーが発生しました")
  })
})

describe('remove status', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  const textList = ["!remove-status", "kari", "借り"];
  it('should match return text update status info.', async () => {
    (removeStatus as any) = jest.fn(async (string: string): Promise<boolean> => true);
    const successResult: string = await model.updateModel(model.STATUS_COMMAND_TYPE.remove, textList)
    expect(successResult).toEqual(`鍵情報から${textList[model.STATUS_ELEMENT_LOCATION.string]}を削除しました`)
  })
  it('should match return text database error.', async () => {
    (removeStatus as any) = jest.fn(async (string: string): Promise<boolean> => false);
    const errorResult: string = await model.updateModel(model.STATUS_COMMAND_TYPE.remove, textList)
    expect(errorResult).toEqual("データベースエラーが発生しました")
  })
})

describe('show status', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  const textList = ["!status-list"];
  it('should match return text show text.', async () => {
    (showStatus as any) = jest.fn(async (): Promise<{ string: string, status: number }[]> => [{
      string: "kari",
      status: 1
    }])
    const successResult: string = await model.updateModel(model.STATUS_COMMAND_TYPE.show, textList)
    expect(successResult).toEqual(`鍵情報を表示します\n kari => 借り\n`);
  })
  it('should match return text database error.', async () => {
    (showStatus as any) = jest.fn(async (): Promise<{ string: string, status: number }[] | null> => null);
    const errorResult: string = await model.updateModel(model.STATUS_COMMAND_TYPE.show, textList)
    expect(errorResult).toEqual("鍵情報が存在しません")
  })
})

describe('error update', () => {
  it('should match return error text.', async () => {
    (insertStatus as any) = jest.fn(async (): Promise<boolean> => {
      throw Error
    })
    const errorResult: string = await model.updateModel(model.STATUS_COMMAND_TYPE.input, [""]);
    expect(errorResult).toEqual("入力が間違っているかエラーが発生しました")
  })
  it('should match return text null.', async () => {
    const notTypeText: string = await model.updateModel(-1, []);
    expect(notTypeText).toEqual("")
  })
})

