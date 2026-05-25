import { ref, computed } from 'vue'

// ページのタイトル/詳細の編集状態を全体で共有する
const isEditingTitle = ref(false)
const isEditingBody = ref(false)

const isEditing = computed(
  () => isEditingTitle.value || isEditingBody.value,
)

const exitEditing = () => {
  isEditingTitle.value = false
  isEditingBody.value = false
}

export const usePageEditing = () => {
  return { isEditingTitle, isEditingBody, isEditing, exitEditing }
}
