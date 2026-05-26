import { usePageEditing } from '../../app/composables/usePageEditing'

describe('usePageEditing', () => {
  beforeEach(() => {
    usePageEditing().exitEditing()
  })

  it('初期状態の場合、isEditingTitle, isEditingBody, isEditingがすべてfalseであること', () => {
    const { isEditingTitle, isEditingBody, isEditing } = usePageEditing()
    expect(isEditingTitle.value).toBe(false)
    expect(isEditingBody.value).toBe(false)
    expect(isEditing.value).toBe(false)
  })

  it('isEditingTitleがtrueの場合、isEditingもtrueになること', () => {
    const { isEditingTitle, isEditing } = usePageEditing()
    isEditingTitle.value = true
    expect(isEditing.value).toBe(true)
  })

  it('isEditingBodyがtrueの場合、isEditingもtrueになること', () => {
    const { isEditingBody, isEditing } = usePageEditing()
    isEditingBody.value = true
    expect(isEditing.value).toBe(true)
  })

  it('isEditingTitleとisEditingBodyの両方がtrueの場合、isEditingはtrueになること', () => {
    const { isEditingTitle, isEditingBody, isEditing } = usePageEditing()
    isEditingTitle.value = true
    isEditingBody.value = true
    expect(isEditing.value).toBe(true)
  })

  it('exitEditing()を行ったとき、isEditingTitleとisEditingBodyの両方がfalseに戻ること', () => {
    const { isEditingTitle, isEditingBody, isEditing, exitEditing } =
      usePageEditing()
    isEditingTitle.value = true
    isEditingBody.value = true
    exitEditing()
    expect(isEditingTitle.value).toBe(false)
    expect(isEditingBody.value).toBe(false)
    expect(isEditing.value).toBe(false)
  })
})
