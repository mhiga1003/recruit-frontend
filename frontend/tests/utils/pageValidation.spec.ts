import {
  PAGE_TITLE_MIN_LENGTH,
  PAGE_TITLE_MAX_LENGTH,
  PAGE_BODY_MIN_LENGTH,
  PAGE_BODY_MAX_LENGTH,
  isValidPageTitle,
  isValidPageBody,
} from '../../app/utils/pageValidation'

describe('isValidPageTitle', () => {
  it('文字数がPAGE_TITLE_MIN_LENGTHと同じ場合、trueであること', () => {
    expect(isValidPageTitle('a'.repeat(PAGE_TITLE_MIN_LENGTH))).toBe(true)
  })

  it('文字数がPAGE_TITLE_MIN_LENGTH - 1の場合、falseであること', () => {
    expect(isValidPageTitle('a'.repeat(PAGE_TITLE_MIN_LENGTH - 1))).toBe(false)
  })

  it('文字数がPAGE_TITLE_MAX_LENGTHと同じ場合、trueであること', () => {
    expect(isValidPageTitle('a'.repeat(PAGE_TITLE_MAX_LENGTH))).toBe(true)
  })

  it('文字数がPAGE_TITLE_MAX_LENGTH + 1の場合、falseであること', () => {
    expect(isValidPageTitle('a'.repeat(PAGE_TITLE_MAX_LENGTH + 1))).toBe(false)
  })

  it('全角文字の場合、半角文字と同様に1文字としてカウントすること', () => {
    expect(isValidPageTitle('あ'.repeat(PAGE_TITLE_MAX_LENGTH))).toBe(true)
  })
})

describe('isValidPageBody', () => {
  it('文字数がPAGE_BODY_MIN_LENGTHと同じ場合、trueであること', () => {
    expect(isValidPageBody('a'.repeat(PAGE_BODY_MIN_LENGTH))).toBe(true)
  })

  it('文字数がPAGE_BODY_MIN_LENGTH - 1の場合、falseであること', () => {
    expect(isValidPageBody('a'.repeat(PAGE_BODY_MIN_LENGTH - 1))).toBe(false)
  })

  it('文字数がPAGE_BODY_MAX_LENGTHと同じ場合、trueであること', () => {
    expect(isValidPageBody('a'.repeat(PAGE_BODY_MAX_LENGTH))).toBe(true)
  })

  it('文字数がPAGE_BODY_MAX_LENGTH + 1の場合、falseであること', () => {
    expect(isValidPageBody('a'.repeat(PAGE_BODY_MAX_LENGTH + 1))).toBe(false)
  })

  it('全角文字の場合、半角文字と同様に1文字としてカウントすること', () => {
    expect(isValidPageBody('あ'.repeat(PAGE_BODY_MAX_LENGTH))).toBe(true)
  })

  it('改行がある場合、改行を文字数としてカウントすること', () => {
    // 改行を1つ含み、ちょうどPAGE_BODY_MIN_LENGTH文字となる文字列
    // 改行がカウントされなければPAGE_BODY_MIN_LENGTH - 1文字となり、falseになる
    const body = 'a'.repeat(PAGE_BODY_MIN_LENGTH - 1) + '\n'
    expect(body.length).toBe(PAGE_BODY_MIN_LENGTH)
    expect(isValidPageBody(body)).toBe(true)
  })
})
