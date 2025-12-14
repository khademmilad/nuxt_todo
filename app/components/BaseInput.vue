<script setup lang="ts">
const props = defineProps<{
    modelValue: string,
    placeholder?: string,
    class?: string
}>();
const emit = defineEmits(['update:modelValue'])
</script>

<template>
<input
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :class="['windows98-input', props.class]"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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