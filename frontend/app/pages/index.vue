<script setup lang="ts">
import { computed, ref } from 'vue'

const {
  selectedPage,
  isUpdatingTitle,
  isUpdatingBody,
  isAnyBusy,
  updateTitle,
  updateBody,
} = usePages()
const { notify } = useNotification()
const { isEditingTitle, isEditingBody } = usePageEditing()

const title = computed(() => selectedPage.value?.title ?? '')
const body = computed(() => selectedPage.value?.body ?? '')

const draftTitle = ref('')
const draftBody = ref('')

const isDraftTitleValid = computed(() => isValidPageTitle(draftTitle.value))
const isDraftBodyValid = computed(() => isValidPageBody(draftBody.value))

const canSaveTitle = computed(
  () => isDraftTitleValid.value && !isAnyBusy.value,
)
const canSaveBody = computed(
  () => isDraftBodyValid.value && !isAnyBusy.value,
)

const startEditTitle = () => {
  draftTitle.value = title.value
}
const saveTitle = async () => {
  if (!selectedPage.value) return
  const pageId = selectedPage.value.id
  notify('送信しています…', { persistent: true })
  try {
    await updateTitle(pageId, draftTitle.value)
    isEditingTitle.value = false
    notify('タイトルの送信が完了しました', { color: 'success' })
  } catch {
    notify('タイトルの送信に失敗しました', { color: 'error' })
  }
}

const startEditBody = () => {
  draftBody.value = body.value
}
const saveBody = async () => {
  if (!selectedPage.value) return
  const pageId = selectedPage.value.id
  notify('送信しています…', { persistent: true })
  try {
    await updateBody(pageId, draftBody.value)
    isEditingBody.value = false
    notify('詳細の送信が完了しました', { color: 'success' })
  } catch {
    notify('詳細の送信に失敗しました', { color: 'error' })
  }
}
</script>

<template>
  <div class="page">
    <section class="page__main">
      <div class="page__title-row">
        <h1 v-if="!isEditingTitle" class="page__title">{{ title }}</h1>
        <div v-else class="page__title-edit">
          <input
            v-model="draftTitle"
            :disabled="isUpdatingTitle"
            class="page__title-input"
            type="text"
          />
          <p v-if="!isDraftTitleValid" class="page__validation-error">
            タイトルは{{ PAGE_TITLE_MIN_LENGTH }}文字以上{{
              PAGE_TITLE_MAX_LENGTH
            }}文字以下の文字列である必要があります。
          </p>
        </div>
        <EditActions
          v-model:editing="isEditingTitle"
          :can-save="canSaveTitle"
          :submitting="isUpdatingTitle"
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
        <div v-else class="page__content-edit">
          <textarea
            v-model="draftBody"
            :disabled="isUpdatingBody"
            class="page__content page__content--editing"
          />
          <p v-if="!isDraftBodyValid" class="page__validation-error">
            詳細は{{ PAGE_BODY_MIN_LENGTH }}文字以上{{
              PAGE_BODY_MAX_LENGTH
            }}文字以下の文字列である必要があります。
          </p>
        </div>
        <EditActions
          v-model:editing="isEditingBody"
          :can-save="canSaveBody"
          :submitting="isUpdatingBody"
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

  &__title-edit {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title-input {
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

  &__validation-error {
    padding-left: 30px;
    font-size: 12px;
    color: c.$error;
  }

  &__main {
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

  &__content-edit {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    gap: 4px;
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
