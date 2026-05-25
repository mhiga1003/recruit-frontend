import { ref, computed } from 'vue'
import { usePages } from './usePages'

// ページに対する非同期処理の進行状態を全体で共有する
const isSubmittingTitle = ref(false)
const isSubmittingBody = ref(false)
const isDeleting = ref(false)

const isAnySubmitting = computed(
  () => isSubmittingTitle.value || isSubmittingBody.value,
)

export const usePageOperations = () => {
  const { isCreating } = usePages()

  // 削除/作成/保存のいずれかが進行中ならtrue
  const isAnyBusy = computed(
    () => isDeleting.value || isCreating.value || isAnySubmitting.value,
  )

  return {
    isSubmittingTitle,
    isSubmittingBody,
    isDeleting,
    isAnySubmitting,
    isAnyBusy,
  }
}
