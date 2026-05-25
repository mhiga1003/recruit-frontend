<script setup lang="ts">
withDefaults(
  defineProps<{
    editing: boolean
    canSave?: boolean
    submitting?: boolean
  }>(),
  {
    canSave: true,
    submitting: false,
  },
)

const emit = defineEmits<{
  'update:editing': [value: boolean]
  start: []
  cancel: []
  save: []
}>()

const handleStart = () => {
  emit('update:editing', true)
  emit('start')
}
const handleCancel = () => {
  emit('update:editing', false)
  emit('cancel')
}
const handleSave = () => {
  emit('save')
}
</script>

<template>
  <div class="edit-actions">
    <v-btn
      v-if="!editing"
      variant="flat"
      rounded="md"
      height="auto"
      min-width="0"
      class="edit-actions__btn edit-actions__btn--wide edit-actions__btn--primary"
      @click="handleStart"
    >
      <span class="edit-actions__inner">
        <v-icon icon="mdi-pencil" class="edit-actions__icon" />
        <span class="edit-actions__label">Edit</span>
      </span>
    </v-btn>
    <template v-else>
      <v-btn
        variant="flat"
        rounded="md"
        height="auto"
        min-width="0"
        :disabled="submitting"
        class="edit-actions__btn edit-actions__btn--normal"
        @click="handleCancel"
      >
        <span class="edit-actions__inner">
          <v-icon icon="mdi-close" class="edit-actions__icon" />
          <span class="edit-actions__label">Cancel</span>
        </span>
      </v-btn>
      <v-btn
        variant="flat"
        rounded="md"
        height="auto"
        min-width="0"
        :disabled="!canSave"
        class="edit-actions__btn edit-actions__btn--primary"
        @click="handleSave"
      >
        <span class="edit-actions__inner">
          <v-icon icon="mdi-content-save" class="edit-actions__icon" />
          <span class="edit-actions__label">Save</span>
        </span>
      </v-btn>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/colors' as c;

.edit-actions {
  display: flex;
  gap: 10px;

  &__btn {
    width: 40px;
    padding: 6px 0;
    text-transform: none;
    letter-spacing: 0;
    color: #ffffff !important;
  }

  &__btn--wide {
    width: 90px;
  }

  &__btn--primary {
    background-color: c.$primary !important;

    &:hover:not(.v-btn--disabled) {
      background-color: c.$primary-hover !important;
    }

    &:active:not(.v-btn--disabled) {
      background-color: c.$primary-pressed !important;
    }

    &.v-btn--disabled {
      background-color: c.$primary-disabled !important;
      opacity: 1 !important;
    }
  }

  &__btn--normal {
    background-color: c.$button-normal !important;

    &:hover:not(.v-btn--disabled) {
      background-color: c.$button-normal-hover !important;
    }

    &:active:not(.v-btn--disabled) {
      background-color: c.$button-normal-pressed !important;
    }

    &.v-btn--disabled {
      background-color: c.$button-normal-disabled !important;
      opacity: 1 !important;
    }
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
}
</style>
