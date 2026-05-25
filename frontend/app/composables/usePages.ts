import { ref, computed } from 'vue'

export type Page = {
  id: string
  title: string
  body: string
}

export const DEFAULT_NEW_PAGE_TITLE = '新しいページ'
export const DEFAULT_NEW_PAGE_BODY = 'ページの詳細を入力してください。'

// 初期データ（将来的に API から取得する想定）
const samplePagePlaceholder = 'ページの詳細を入力してください。'
const initialPages: Page[] = [
  { id: '1', title: 'こころ', body: samplePagePlaceholder },
  { id: '2', title: '我輩は猫である', body: samplePagePlaceholder },
  {
    id: '3',
    title: '坊ちゃん',
    body: Array(6)
      .fill(
        '親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。',
      )
      .join('\n\n'),
  },
  { id: '4', title: '学問のすゝめ', body: samplePagePlaceholder },
  { id: '5', title: '羅生門', body: samplePagePlaceholder },
  { id: '6', title: '蜘蛛の糸', body: samplePagePlaceholder },
  { id: '7', title: '走れメロス', body: samplePagePlaceholder },
  { id: '8', title: '伊豆の踊子', body: samplePagePlaceholder },
  { id: '9', title: '注文の多い料理店', body: samplePagePlaceholder },
  { id: '10', title: '銀河鉄道の夜', body: samplePagePlaceholder },
]

const pages = ref<Page[]>(initialPages)
const selectedId = ref<string>('3')
const isCreating = ref(false)

const selectedPage = computed(
  () => pages.value.find((p) => p.id === selectedId.value) ?? null,
)

// TODO: API連携時に置き換える（本番では POST /content の結果をそのまま返す）
const fakeCreatePageApi = async (
  input: Omit<Page, 'id'>,
): Promise<Page> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  // ID は本来 DB が採番した値が返ってくる
  return { id: String(Date.now()), ...input }
}

export const usePages = () => {
  const selectPage = (id: string) => {
    selectedId.value = id
  }

  const addPage = async (): Promise<Page> => {
    isCreating.value = true
    try {
      const newPage = await fakeCreatePageApi({
        title: DEFAULT_NEW_PAGE_TITLE,
        body: DEFAULT_NEW_PAGE_BODY,
      })
      pages.value.push(newPage)
      selectedId.value = newPage.id
      return newPage
    } finally {
      isCreating.value = false
    }
  }

  const deletePage = (id: string) => {
    pages.value = pages.value.filter((p) => p.id !== id)
    if (selectedId.value === id && pages.value.length > 0) {
      selectedId.value = pages.value[0]!.id
    }
  }

  const updateTitle = (id: string, title: string) => {
    const page = pages.value.find((p) => p.id === id)
    if (page) page.title = title
  }

  const updateBody = (id: string, body: string) => {
    const page = pages.value.find((p) => p.id === id)
    if (page) page.body = body
  }

  return {
    pages,
    selectedId,
    selectedPage,
    isCreating,
    selectPage,
    addPage,
    deletePage,
    updateTitle,
    updateBody,
  }
}
