export const PAGE_TITLE_MIN_LENGTH = 1
export const PAGE_TITLE_MAX_LENGTH = 50
export const PAGE_BODY_MIN_LENGTH = 10
export const PAGE_BODY_MAX_LENGTH = 2000

export const isValidPageTitle = (title: string): boolean =>
  title.length >= PAGE_TITLE_MIN_LENGTH &&
  title.length <= PAGE_TITLE_MAX_LENGTH

export const isValidPageBody = (body: string): boolean =>
  body.length >= PAGE_BODY_MIN_LENGTH && body.length <= PAGE_BODY_MAX_LENGTH
