import PlaceUpdateModel from "../../src/model/PlaceUpdateModel";
import {insertPlace, removePlace, showPlace} from "../../src/domain/usercase/UpdatePlaceDb";

const model = new PlaceUpdateModel()

describe('add place', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  const textList = ["!add-place", "研究棟A302", "部室"]
  it('should match return text update place info.', async () => {
    (insertPlace as any) = jest.fn(async (abbreviation: string, place: string): Promise<boolean> => true)
    const successResult: string = await model.updateModel(model.PLACE_COMMAND_TYPE.input, textList);
    expect(successResult).toEqual(`場所情報に${textList[model.PLACE_ELEMENT_LOCATION.abbreviation]}が${textList[model.PLACE_ELEMENT_LOCATION.place]}として追加されました`);
  });
  it('should match return text database error.', async () => {
    (insertPlace as any) = jest.fn(async (abbreviation: string, place: string): Promise<boolean> => false)
    const errorResult: string = await model.updateModel(model.PLACE_COMMAND_TYPE.input, textList);
    expect(errorResult).toEqual("データベースエラーが発生しました");
  })
})

describe('remove place', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  const textList = ["!remove-place", "研究棟A302", "部室"]
  it('should match return text update place info.', async () => {
    (removePlace as any) = jest.fn(async (abbreviation: string): Promise<boolean> => true)
    const successResult: string = await model.updateModel(model.PLACE_COMMAND_TYPE.remove, textList);
    expect(successResult).toEqual(`場所情報から${textList[model.PLACE_ELEMENT_LOCATION.abbreviation]}を削除しました`);
  });
  it('should match return text database error.', async () => {
    (removePlace as any) = jest.fn(async (abbreviation: string): Promise<boolean> => false)
    const errorResult: string = await model.updateModel(model.PLACE_COMMAND_TYPE.remove, textList);
    expect(errorResult).toEqual("データベースエラーが発生しました");
  })
})

describe('show place', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  const textList = ["!place-list"]
  it('should match return text show text.', async () => {
    (showPlace as any) = jest.fn(async (): Promise<{ abb: string; place: string }[] | null> => [{
      abb: "部室",
      place: "部室"
    }])
    const successResult: string = await model.updateModel(model.PLACE_COMMAND_TYPE.show, textList);
    expect(successResult).toEqual(`場所の情報を表示します\n 部室 => 部室\n`);
  });
  it('should match return text not data.', async () => {
    (showPlace as any) = jest.fn(async (): Promise<{ abb: string; place: string }[] | null> => null)
    const noDataResult: string = await model.updateModel(model.PLACE_COMMAND_TYPE.show, textList);
    expect(noDataResult).toEqual("場所情報は存在しません");
  })
})

describe('error update', () => {
  it('should match return error text.', async () => {
    (insertPlace as any) = jest.fn(async (): Promise<boolean> => {
      throw Error
    })
    const errorResult: string = await model.updateModel(model.PLACE_COMMAND_TYPE.input, [""]);
    expect(errorResult).toEqual("入力が間違っているかエラーが発生しました")
  })
  it('should match return text null.', async () => {
    const notTypeText: string = await model.updateModel(-1, []);
    expect(notTypeText).toEqual("")
  })
})

