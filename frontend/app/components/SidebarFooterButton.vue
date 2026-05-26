<script setup lang="ts">
withDefaults(
  defineProps<{
    editMode: boolean
    canAdd?: boolean
  }>(),
  {
    canAdd: true,
  },
)

const emit = defineEmits<{
  'update:editMode': [value: boolean]
  add: []
}>()

const onEnter = () => emit('update:editMode', true)
const onExit = () => emit('update:editMode', false)
const onAdd = () => emit('add')
</script>

<template>
  <div class="sidebar-footer-btn">
    <v-btn
      v-if="!editMode"
      color="primary"
      variant="flat"
      rounded="md"
      height="auto"
      min-width="0"
      class="sidebar-footer-btn__btn"
      @click="onEnter"
    >
      <span class="sidebar-footer-btn__inner">
        <img
          src="/edit.svg"
          alt=""
          width="18"
          height="18"
          class="sidebar-footer-btn__icon"
        />
        <span class="sidebar-footer-btn__label">Edit</span>
      </span>
    </v-btn>
    <template v-else>
      <v-btn
        color="primary"
        variant="outlined"
        rounded="md"
        height="auto"
        min-width="0"
        :disabled="!canAdd"
        class="sidebar-footer-btn__btn sidebar-footer-btn__btn--outlined"
        @click="onAdd"
      >
        <span class="sidebar-footer-btn__inner">
          <img
            src="/+.svg"
            alt=""
            width="18"
            height="18"
            class="sidebar-footer-btn__icon"
          />
          <span class="sidebar-footer-btn__label">New page</span>
        </span>
      </v-btn>
      <v-btn
        color="primary"
        variant="flat"
        rounded="md"
        height="auto"
        min-width="0"
        class="sidebar-footer-btn__btn"
        @click="onExit"
      >
        <span class="sidebar-footer-btn__inner">
          <img
            src="/done.svg"
            alt=""
            width="18"
            height="18"
            class="sidebar-footer-btn__icon"
          />
          <span class="sidebar-footer-btn__label">Done</span>
        </span>
      </v-btn>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/colors' as c;

.sidebar-footer-btn {
  display: flex;
  gap: 10px;

  &__btn {
    width: 90px;
    padding: 6px 0;
    text-transform: none;
    letter-spacing: 0;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  &__icon {
    font-size: 18px;
  }

  &__label {
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
  }

  // outlined (New page) の各状態
  &__btn--outlined {
    background-color: #ffffff !important;

    &:hover:not(.v-btn--disabled) {
      background-color: c.$button-normal-disabled !important;
    }

    &:active:not(.v-btn--disabled) {
      background-color: c.$button-normal !important;
    }

    &.v-btn--disabled {
      background-color: #ffffff !important;
      color: c.$primary-disabled !important;
      opacity: 1 !important;

      :deep(.v-btn__overlay) {
        opacity: 0 !important;
      }
    }
  }
}
</style>
