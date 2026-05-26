<script setup lang="ts">
const { message, visible, timeout, color } = useNotification()
</script>

<template>
  <v-app>
    <AppSidebar />
    <v-main class="main bg-white">
      <slot />
    </v-main>
    <v-snackbar v-model="visible" :timeout="timeout" :color="color">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<style scoped lang="scss">
.main {
  padding-left: 280px;
}
</style>
