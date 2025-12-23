<script setup lang="ts">
import {  useTodoStore } from '~/stores/useTodoStore';
import { onMounted, ref, computed } from 'vue';

const todoStore = useTodoStore();

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const filter = ref<'all' | 'active' | 'completed'>('all');

const fetchTodos = async () => {
    await todoStore.fetchTodos();
};

const filterTodos = computed(() => {
  if (filter.value === 'active') return todoStore.todos.filter(t => !t.completed);
  if (filter.value === 'completed') return todoStore.todos.filter(t => t.completed);
  return todoStore.todos;
})
const clearCompleted = async () => {
    const completedTodos = todoStore.todos.filter(t => t.completed);
    for (const todo of completedTodos) {
        await todoStore.deleteTodo(todo.id);
    }
    await fetchTodos();
}
onMounted(fetchTodos)
</script>

<template>
  <div class="max-w-2xl mx-auto py-8 px-2 sm:px-4 windows98-card">
    <TodoForm @added="fetchTodos" />

    <div class="flex gap-2 justify-center mb-4">
      <BaseButton
        v-for="f in ['all', 'active', 'completed']"
        :key="f"
        :class="filter === f ? 'bg-blue-200 text-blue-900' : 'bg-gray-100 text-gray-700'"
        @click="filter = f as 'all' | 'active' | 'completed'"
      >
        {{ f.charAt(0).toUpperCase() + f.slice(1) }}
      </BaseButton>
      <BaseButton
        class="ml-4 bg-red-200 text-red-700"
        @click="clearCompleted"
      >
        Clear Completed
      </BaseButton>
    </div>

    <div class="grid gap-4">
      <TodoItem
        v-for="todo in filterTodos"
        :key="todo.id"
        :todo="todo"
        @deleted="fetchTodos"
        @toggled="fetchTodos"
      />
    </div>
  </div>
</template>

<style scoped>
.windows98-card {
  background: #f0f0f0;
  border: 2px outset #bbb;
  border-radius: 8px;
  box-shadow: 4px 4px 0 #888, 8px 8px 0 #ccc;
  padding: 2rem 1rem;
}
</style>