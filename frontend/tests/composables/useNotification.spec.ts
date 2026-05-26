import {
  NOTIFICATION_DEFAULT_TIMEOUT_MS,
  useNotification,
} from '../../app/composables/useNotification'

describe('useNotification', () => {
  beforeEach(() => {
    const { message, visible, color, timeout } = useNotification()
    message.value = ''
    visible.value = false
    color.value = ''
    timeout.value = NOTIFICATION_DEFAULT_TIMEOUT_MS
  })

  it('notify()が呼ばれたとき、messageとvisibleがセットされること', () => {
    const { notify, message, visible } = useNotification()
    notify('hello')
    expect(message.value).toBe('hello')
    expect(visible.value).toBe(true)
  })

  it('notify()のオプションが未指定の場合、colorは空文字、timeoutはNOTIFICATION_DEFAULT_TIMEOUT_MSになること', () => {
    const { notify, color, timeout } = useNotification()
    notify('msg')
    expect(color.value).toBe('')
    expect(timeout.value).toBe(NOTIFICATION_DEFAULT_TIMEOUT_MS)
  })

  it('notify()のオプションのcolorを指定した場合、colorがセットされること', () => {
    const { notify, color } = useNotification()
    notify('msg', { color: 'success' })
    expect(color.value).toBe('success')
  })

  it('notify()のオプションのpersistentにtrueを指定した場合、timeoutが-1(タイムアウトしない設定)になること', () => {
    const { notify, timeout } = useNotification()
    notify('送信中', { persistent: true })
    expect(timeout.value).toBe(-1)
  })

  it('notify()のオプションのpersistentとtimeoutの両方を指定した場合、persistentが優先されてtimeoutが-1(タイムアウトしない設定)になること', () => {
    const { notify, timeout } = useNotification()
    notify('msg', { persistent: true, timeout: 1000 })
    expect(timeout.value).toBe(-1)
  })

  it('notify()のオプションのtimeoutを指定した場合、timeoutにその値がセットされること', () => {
    const { notify, timeout } = useNotification()
    notify('msg', { timeout: 5000 })
    expect(timeout.value).toBe(5000)
  })

  it('dismiss()が呼ばれたとき、visibleがfalseになること', () => {
    const { notify, dismiss, visible } = useNotification()
    notify('msg')
    expect(visible.value).toBe(true)
    dismiss()
    expect(visible.value).toBe(false)
  })
})
