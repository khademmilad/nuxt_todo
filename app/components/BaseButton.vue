<script setup lang="ts">
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  class?: string
  disable?: boolean
}>();
</script>

<template>
    <button
        :type="props.type || 'button'"
        :class="['windows98-btn', props.class]"
        :disabled="props.disable"
    >
        <slot />
    </button>
</template>

<style scoped>
.windows98-btn {
  font-family: 'Tahoma', 'Geneva', sans-serif;
  border-width: 2px;
  border-style: outset;
  background: #e0e0e0;
  color: #222;
  box-shadow: 2px 2px 0 #bbb;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  transition: background 0.1s;
  user-select: none;
  cursor: pointer;
}

.windows98-btn:active {
  border-style: inset;
  background: #d0d0d0;
}
</style>