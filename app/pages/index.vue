<script setup lang="ts">
import {  useTodoStore } from '~/server/store/useTodoStore';
import { onMounted, ref, computed } from 'vue';

const todoStore = useTodoStore();

const todos = ref<Todo[]>([]);
const filter = ref<'all' | 'active' | 'completed'>('all');

const fetchTodos = async () => {
    await todoStore.fetchTodos();
    todos.value = todoStore.todos;
};

const filterTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.completed);
  if (filter.value === 'completed') return todos.value.filter(t => t.completed);
  return todos.value;
})

</script>

<template>
  <BaseButton 
    v-for="f in ['all', 'active', 'completed']"
    :key="f"
    @click="filter = f"
  />
</template>

