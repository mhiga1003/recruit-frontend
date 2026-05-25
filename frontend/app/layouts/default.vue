<script setup lang="ts">
const { message, visible, timeout, color } = useNotification()
</script>

<template>
  <v-app>
    <AppSidebar />
    <v-main class="bg-white">
      <slot />
    </v-main>
    <v-snackbar v-model="visible" :timeout="timeout" :color="color">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>
