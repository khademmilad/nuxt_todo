<script setup lang="ts">
const inputValue = ref('');

const handleSubmit = () => {
  alert(`Submitted value: ${inputValue.value}`);
};
</script>

<template>
  <div>
    <h2>Home Page</h2>
    <p>This content should appear inside the default layout</p>
  </div>
  <BaseButton @click="handleSubmit">Click Me</BaseButton>
  <BaseInput
    v-model:modalValue="inputValue"
    placeholder="Enter some text"
  />
</template>
