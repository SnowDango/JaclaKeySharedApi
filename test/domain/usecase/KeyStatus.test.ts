import {howKeyStatus,whereKey} from '../../../src/domain/usercase/KeyStatus'

//
describe('borrowed', () => {
  const testMessage = "部室の鍵借りました。"
  it('should place 部室 status 1 ',async () => {
    const status = await howKeyStatus(testMessage)
    expect(status).toHaveLength(1)
    expect(status[0]).toHaveProperty('status', 1)

    const place = await whereKey(testMessage)
    expect(place).toHaveLength(1)
    expect(place[0]).toHaveProperty('place',"部室")
  })
})

describe('opened', () => {
  const testMessage = "研A301の鍵を開けました。"
  it('should place 部室 status 2', async () => {
    const status = await howKeyStatus(testMessage)
    expect(status).toHaveLength(1)
    expect(status[0]).toHaveProperty('status', 2)

    const place = await whereKey(testMessage)
    expect(place).toHaveLength(1)
    expect(place[0]).toHaveProperty('place',"部室")
  })
})

describe('borrowed and opened', () => {
  const testMessage = "かりあけ"
  it('should status length 2 [1,2]', async () => {
    const status = await howKeyStatus(testMessage)
    expect(status).toHaveLength(2)
    expect(status[0]).toHaveProperty('status',1)
    expect(status[1]).toHaveProperty('status',2)

    const place = await whereKey(testMessage)
    expect(place).toHaveLength(0)
  })
})

describe('closed', () => {
  const testMessage = "部室の鍵しめました。"
  it('should place 部室 status 3', async () => {
    const status = await howKeyStatus(testMessage)
    expect(status).toHaveLength(1)
    expect(status[0]).toHaveProperty('status',3)

    const place = await whereKey(testMessage)
    expect(place).toHaveLength(1)
    expect(place[0]).toHaveProperty('place',"部室")
  })
})

describe('opened and closed', () => {
  const testMessage = "あけてすぐしめます"
  it('should status length 2 [2,3]', async () => {
    const status = await howKeyStatus(testMessage)
    expect(status).toHaveLength(2)
    expect(status[0]).toHaveProperty('status', 2)
    expect(status[1]).toHaveProperty('status', 3)

    const place = await whereKey(testMessage)
    expect(place).toHaveLength(0)
  })
})

describe('returned', () => {
  const testMessage = "かえしました"
  it('should status 4', async () => {
    const status = await howKeyStatus(testMessage)
    expect(status).toHaveLength(1)
    expect(status[0]).toHaveProperty('status',4)

    const place = await whereKey(testMessage)
    expect(place).toHaveLength(0)
  })
})

describe('closed and returned', () => {
  const testMessage = "しめかえし"
  it('should status length 2 [3,4]', async () => {
    const status = await howKeyStatus(testMessage)
    expect(status).toHaveLength(2)
    expect(status[0]).toHaveProperty('status',3)
    expect(status[1]).toHaveProperty('status',4)

    const place = await whereKey(testMessage)
    expect(place).toHaveLength(0)
  })
})

describe('not status', () => {
  const testMessage = "今日21:00くらいからdiscordでamong usやるみたいなんで、やりたい方どうぞー\n" + "後輩大歓迎"
  it('should not status', async () => {
    const status = await howKeyStatus(testMessage)
    expect(status).toHaveLength(0)
    const place = await whereKey(testMessage)
    expect(place).toHaveLength(0)
  })
})