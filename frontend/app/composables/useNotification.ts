import { ref } from 'vue'

type NotifyColor = '' | 'success' | 'error' | 'info'

export const NOTIFICATION_DEFAULT_TIMEOUT_MS = 3000
// Vuetify v-snackbar で「自動消去しない」を表す値
const NO_AUTO_DISMISS = -1

const message = ref('')
const visible = ref(false)
const timeout = ref<number>(NOTIFICATION_DEFAULT_TIMEOUT_MS)
const color = ref<NotifyColor>('')

export const useNotification = () => {
  /**
   * 通知を表示する。
   * - persistent: true を渡すと自動消去されない（送信中などに使う）
   * - timeout: 自動消去までのミリ秒（デフォルト3000）
   * - color: 通知の色（省略でデフォルト=グレー）
   */
  const notify = (
    msg: string,
    opts?: {
      persistent?: boolean
      timeout?: number
      color?: NotifyColor
    },
  ) => {
    message.value = msg
    timeout.value = opts?.persistent
      ? NO_AUTO_DISMISS
      : (opts?.timeout ?? NOTIFICATION_DEFAULT_TIMEOUT_MS)
    color.value = opts?.color ?? ''
    visible.value = true
  }

  const dismiss = () => {
    visible.value = false
  }

  return { message, visible, timeout, color, notify, dismiss }
}
