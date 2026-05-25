<script setup lang="ts">
const { pages, selectedId, addPage, deletePage } = usePages()
const { message, visible, timeout, color, notify } = useNotification()

const onAddPage = async () => {
  notify('送信しています…', { persistent: true })
  try {
    await addPage()
    notify('新しいページを作成しました', { color: 'success' })
  } catch {
    notify('ページの作成に失敗しました', { color: 'error' })
  }
}

const onDeletePage = (id: string) => {
  deletePage(id)
}
</script>

<template>
  <v-app>
    <AppSidebar
      v-model:selected-id="selectedId"
      :pages="pages"
      @add="onAddPage"
      @delete="onDeletePage"
    />
    <v-main class="bg-white">
      <slot />
    </v-main>
    <v-snackbar v-model="visible" :timeout="timeout" :color="color">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>
