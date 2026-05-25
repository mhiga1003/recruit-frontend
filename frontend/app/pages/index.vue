<script setup lang="ts">
import { computed, ref } from 'vue'

const title = ref('坊ちゃん')
const body = ref(
  Array(6)
    .fill(
      '親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。',
    )
    .join('\n\n'),
)

const isEditingTitle = ref(false)
const isEditingBody = ref(false)
const draftTitle = ref('')
const draftBody = ref('')
const isSubmittingTitle = ref(false)
const isSubmittingBody = ref(false)

const isDraftTitleValid = computed(() => isValidPageTitle(draftTitle.value))
const isDraftBodyValid = computed(() => isValidPageBody(draftBody.value))

const isAnySubmitting = computed(
  () => isSubmittingTitle.value || isSubmittingBody.value,
)

const canSaveTitle = computed(
  () => isDraftTitleValid.value && !isAnySubmitting.value,
)
const canSaveBody = computed(
  () => isDraftBodyValid.value && !isAnySubmitting.value,
)

const { notify } = useNotification()

// TODO: API連携時に置き換える
const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 1500))

const startEditTitle = () => {
  draftTitle.value = title.value
}
const saveTitle = async () => {
  isSubmittingTitle.value = true
  notify('送信しています…', { persistent: true })
  try {
    await fakeApiCall()
    title.value = draftTitle.value
    isEditingTitle.value = false
    notify('タイトルの送信が完了しました', { color: 'success' })
  } catch {
    notify('タイトルの送信に失敗しました', { color: 'error' })
  } finally {
    isSubmittingTitle.value = false
  }
}

const startEditBody = () => {
  draftBody.value = body.value
}
const saveBody = async () => {
  isSubmittingBody.value = true
  notify('送信しています…', { persistent: true })
  try {
    await fakeApiCall()
    body.value = draftBody.value
    isEditingBody.value = false
    notify('詳細の送信が完了しました', { color: 'success' })
  } catch {
    notify('詳細の送信に失敗しました', { color: 'error' })
  } finally {
    isSubmittingBody.value = false
  }
}
</script>

<template>
  <div class="page">
    <section class="page__body">
      <div class="page__title-row">
        <h1 v-if="!isEditingTitle" class="page__title">{{ title }}</h1>
        <input
          v-else
          v-model="draftTitle"
          :disabled="isSubmittingTitle"
          class="page__title-input"
          type="text"
        />
        <EditActions
          v-model:editing="isEditingTitle"
          :can-save="canSaveTitle"
          :submitting="isSubmittingTitle"
          @start="startEditTitle"
          @save="saveTitle"
        />
      </div>

      <div class="page__content-row">
        <article v-if="!isEditingBody" class="page__content">
          <p v-for="(paragraph, i) in body.split('\n\n')" :key="i">
            {{ paragraph }}
          </p>
        </article>
        <textarea
          v-else
          v-model="draftBody"
          :disabled="isSubmittingBody"
          class="page__content page__content--editing"
        />
        <EditActions
          v-model:editing="isEditingBody"
          :can-save="canSaveBody"
          :submitting="isSubmittingBody"
          @start="startEditBody"
          @save="saveBody"
        />
      </div>
    </section>

    <footer class="page__footer">
      <span>Copyright © 2021 Sample</span>
      <span>運営会社</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/colors' as c;

.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 30px 40px;

  &__title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    padding: 30px 0 20px 0;
  }

  &__title {
    padding-left: 30px;
    font-size: 24px;
    font-weight: 700;
    color: c.$text-regular;
  }

  &__title-input {
    flex: 1;
    font-size: 24px;
    font-weight: 700;
    color: c.$text-regular;
    background-color: #ffffff;
    border: 1px solid c.$bg-dark;
    border-radius: 4px;
    padding: 4px 8px 4px 30px;
    outline: none;

    &:focus {
      border-color: c.$primary;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    padding: 0 30px 30px;
    background-color: c.$bg-light;
    border-radius: 16px;
  }

  &__content-row {
    display: flex;
    flex: 1;
    min-height: 0;
    gap: 20px;

    :deep(.edit-actions) {
      align-self: flex-start;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 8px;
    font-size: 16px;
    line-height: 1.8;
    color: c.$text-regular;

    p + p {
      margin-top: 1.5em;
    }
  }

  &__content--editing {
    display: block;
    width: 100%;
    border: 1px solid c.$bg-dark;
    font-family: inherit;
    resize: none;
    outline: none;

    &:focus {
      border-color: c.$primary;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding: 30px 0 0;
    font-size: 12px;
    color: c.$text-light;
  }
}
</style>
