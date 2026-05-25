import { computed } from 'vue'

export type Page = {
  id: number
  title: string
  body: string
  createdAt?: string
  updatedAt?: string
}

export const DEFAULT_NEW_PAGE_TITLE = '新しいページ'
export const DEFAULT_NEW_PAGE_BODY = 'ページの詳細を入力してください。'

export const usePages = () => {
  const { apiBase } = useRuntimeConfig().public
  const contentUrl = `${apiBase}/content`

  const {
    data: pages,
    pending: isFetching,
    error: fetchError,
    refresh,
  } = useFetch<Page[]>(contentUrl, {
    key: 'pages',
    default: () => [],
  })

  // useState で SSR-safe な共有 state を提供
  const selectedId = useState<number | null>('pages:selectedId', () => null)
  const isCreating = useState('pages:isCreating', () => false)
  const isDeleting = useState('pages:isDeleting', () => false)
  const isUpdatingTitle = useState('pages:isUpdatingTitle', () => false)
  const isUpdatingBody = useState('pages:isUpdatingBody', () => false)

  // 選択中のページを取得
  // selectedId が未設定または該当ページがない場合は先頭ページにフォールバック
  // → サイドバーのハイライトとメイン表示の両方が自動で先頭ページに同期する
  const selectedPage = computed(() => {
    if (!pages.value?.length) return null
    return (
      pages.value.find((p) => p.id === selectedId.value) ?? pages.value[0]!
    )
  })

  // 削除/作成/保存のいずれかが進行中なら true
  const isAnyBusy = computed(
    () =>
      isCreating.value ||
      isDeleting.value ||
      isUpdatingTitle.value ||
      isUpdatingBody.value,
  )

  const addPage = async (): Promise<Page> => {
    isCreating.value = true
    try {
      const newPage = await $fetch<Page>(contentUrl, {
        method: 'POST',
        body: {
          title: DEFAULT_NEW_PAGE_TITLE,
          body: DEFAULT_NEW_PAGE_BODY,
        },
      })
      await refresh()
      selectedId.value = newPage.id
      return newPage
    } finally {
      isCreating.value = false
    }
  }

  const deletePage = async (id: number) => {
    isDeleting.value = true
    try {
      await $fetch(`${contentUrl}/${id}`, { method: 'DELETE' })
      await refresh()
      if (selectedId.value === id) {
        selectedId.value = pages.value?.[0]?.id ?? null
      }
    } finally {
      isDeleting.value = false
    }
  }

  const updateTitle = async (id: number, title: string) => {
    isUpdatingTitle.value = true
    try {
      await $fetch(`${contentUrl}/${id}`, {
        method: 'PUT',
        body: { title },
      })
      await refresh()
    } finally {
      isUpdatingTitle.value = false
    }
  }

  const updateBody = async (id: number, body: string) => {
    isUpdatingBody.value = true
    try {
      await $fetch(`${contentUrl}/${id}`, {
        method: 'PUT',
        body: { body },
      })
      await refresh()
    } finally {
      isUpdatingBody.value = false
    }
  }

  return {
    pages,
    selectedId,
    selectedPage,
    isFetching,
    isCreating,
    isDeleting,
    isUpdatingTitle,
    isUpdatingBody,
    isAnyBusy,
    fetchError,
    refresh,
    addPage,
    deletePage,
    updateTitle,
    updateBody,
  }
}
