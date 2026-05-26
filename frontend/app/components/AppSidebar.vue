<script setup lang="ts">
import { ref } from 'vue'
import type { Page } from '~/composables/usePages'

const {
  pages,
  selectedId,
  selectedPage,
  isDeleting,
  isAnyBusy,
  addPage,
  deletePage,
} = usePages()
const { isEditing, exitEditing } = usePageEditing()
const { notify } = useNotification()

const isEditMode = ref(false)

const isDeleteDialogOpen = ref(false)
const pageToDelete = ref<Page>()

// 編集中に他のページへ遷移しようとしたときの確認モーダル
const isNavigationDialogOpen = ref(false)
const pendingSelectId = ref<number>()
const isPendingAdd = ref(false)

const selectPage = (id: number) => {
  selectedId.value = id
}

const onSelectPage = (id: number) => {
  if (isEditing.value) {
    pendingSelectId.value = id
    isPendingAdd.value = false
    isNavigationDialogOpen.value = true
    return
  }
  selectPage(id)
}

const doAddPage = async () => {
  notify('送信しています…', { persistent: true })
  try {
    await addPage()
    notify('新しいページを作成しました', { color: 'success' })
  } catch {
    notify('ページの作成に失敗しました', { color: 'error' })
  }
}

const onAddPage = () => {
  if (isEditing.value) {
    pendingSelectId.value = undefined
    isPendingAdd.value = true
    isNavigationDialogOpen.value = true
    return
  }
  doAddPage()
}

const confirmNavigation = () => {
  exitEditing()
  if (isPendingAdd.value) {
    doAddPage()
  } else if (pendingSelectId.value !== undefined) {
    selectPage(pendingSelectId.value)
  }
  pendingSelectId.value = undefined
  isPendingAdd.value = false
  isNavigationDialogOpen.value = false
}

const cancelNavigation = () => {
  pendingSelectId.value = undefined
  isPendingAdd.value = false
  isNavigationDialogOpen.value = false
}

const requestDelete = (page: Page) => {
  pageToDelete.value = page
  isDeleteDialogOpen.value = true
}

const cancelDelete = () => {
  isDeleteDialogOpen.value = false
}

const confirmDelete = async () => {
  if (!pageToDelete.value) return
  const id = pageToDelete.value.id
  try {
    await deletePage(id)
    isDeleteDialogOpen.value = false
    notify('ページの削除が完了しました', { color: 'success' })
  } catch {
    notify('ページの削除に失敗しました', { color: 'error' })
  }
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__logo">
        <img
          src="/logo.svg"
          alt=""
          width="32"
          height="32"
          class="sidebar__logo-mark"
        />
        <span class="sidebar__logo-text">ServiceName</span>
      </div>
    </div>

    <v-list class="sidebar__list" nav density="comfortable">
      <v-list-item
        v-for="page in pages"
        :key="page.id"
        :active="page.id === selectedPage?.id"
        :class="[
          'sidebar__item',
          { 'sidebar__item--active': page.id === selectedPage?.id },
        ]"
        @click="onSelectPage(page.id)"
      >
        <v-list-item-title>{{ page.title }}</v-list-item-title>
        <template v-if="isEditMode" #append>
          <v-btn
            icon
            variant="text"
            size="small"
            color="button-normal"
            :disabled="isAnyBusy"
            class="sidebar__delete-btn"
            @click.stop="requestDelete(page)"
          >
            <img src="/delete.svg" alt="削除" width="18" height="18" />
          </v-btn>
        </template>
      </v-list-item>
    </v-list>

    <div class="sidebar__footer">
      <SidebarFooterButton
        v-model:edit-mode="isEditMode"
        :can-add="!isAnyBusy"
        @add="onAddPage"
      />
    </div>
  </aside>

  <v-dialog v-model="isNavigationDialogOpen" max-width="400">
    <v-card class="delete-dialog">
      <v-card-text class="delete-dialog__text">
        <p class="delete-dialog__title">このページから遷移しますか？</p>
        <p>編集中の内容は保存されません。</p>
      </v-card-text>
      <v-card-actions class="delete-dialog__actions">
        <v-btn variant="text" @click="cancelNavigation">キャンセル</v-btn>
        <v-btn color="primary" variant="flat" @click="confirmNavigation">
          遷移
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="isDeleteDialogOpen"
    max-width="400"
    :persistent="isDeleting"
  >
    <v-card class="delete-dialog">
      <v-card-text class="delete-dialog__text">
        <p class="delete-dialog__title">
          {{ pageToDelete?.title }} を削除します。
        </p>
        <p>一度削除すると、元に戻すことはできません。</p>
      </v-card-text>
      <v-card-actions class="delete-dialog__actions">
        <v-btn variant="text" :disabled="isDeleting" @click="cancelDelete">
          キャンセル
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          :disabled="isDeleting"
          @click="confirmDelete"
        >
          削除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
@use '~/assets/styles/colors' as c;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-right: 1px solid c.$border-light;
  z-index: 1;

  &__header {
    padding: 30px 30px 20px;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__logo-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: c.$primary;
    color: #ffffff;
    font-weight: 900;
    font-size: 24px;
  }

  &__logo-text {
    font-weight: 700;
    font-size: 18px;
    color: c.$text-regular;
  }

  &__list {
    flex: 1;
    overflow-y: auto;
    padding: 0 0 0 10px;
  }

  &__item {
    height: 44px;
    margin-bottom: 0 !important;
    padding: 0 40px;
    color: c.$text-regular;
    border-radius: 4px 0 0 4px;

    &--active {
      background-color: c.$bg-light;
      color: c.$secondary;
      font-weight: 700;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    background-color: c.$bg-light;
  }

  &__delete-btn {
    width: 28px !important;
    height: 28px !important;
    border-radius: 4px !important;

    :deep(.v-btn__overlay) {
      border-radius: inherit;
    }

    :deep(.v-icon) {
      font-size: 22px;
    }

    &:hover:not(.v-btn--disabled) {
      background-color: c.$button-normal-disabled !important;
    }

    &:active:not(.v-btn--disabled) {
      background-color: c.$button-normal !important;
    }

    &.v-btn--disabled {
      color: c.$button-normal-disabled !important;
      opacity: 1 !important;
    }
  }
}

.delete-dialog {
  &__text {
    padding: 24px;
    color: c.$text-regular;
    text-align: center;

    p + p {
      margin-top: 8px;
    }
  }

  &__title {
    font-weight: 700;
  }

  &__actions {
    justify-content: center;
    gap: 8px;
    padding: 0 16px 16px;
  }
}
</style>
