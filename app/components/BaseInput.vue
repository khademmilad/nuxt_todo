<script setup lang="ts">
const props = defineProps<{
    modalValue: string,
    placeholder?: string,
    class?: string
}>();
const emit = defineEmits(['update:modalValue'])
</script>

<template>
<input
    :value="props.modalValue"
    :placeholder="props.placeholder"
    :class="['windows98-input', props.class]"
    @input="emit('update:modalValue', ($event.target as HTMLInputElement).value)"
/>

</template>

<style scoped>
.windows98-input {
  font-family: 'Tahoma', 'Geneva', sans-serif;
  border-width: 2px;
  border-style: inset;
  background: #fff;
  color: #222;
  box-shadow: 2px 2px 0 #bbb;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  transition: background 0.1s;
}
</style>