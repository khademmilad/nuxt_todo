import { defineStore } from 'pinia';
import {  useRuntimeConfig } from 'nuxt/app'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as any[]
    }),
    actions: {
        async fetchTodos() {
            const config = useRuntimeConfig();
            const res = await $fetch<any[]>(`${config.public.apiBase}/todos`);
            this.todos = res;
        },
        async addTodo(payload: { title: string }) {
            const config = useRuntimeConfig();
            await $fetch(`${config.public.apiBase}/todos`, {
                method: 'POST',
                body: payload
            })
        },
        async deleteTodo(id: number) {
            const config = useRuntimeConfig();
            try {
                await $fetch(`${config.public.apiBase}/todos/${id}`, {
                    method: 'DELETE'
                })
            } catch (error) {
                console.error('Failed to delete todo:', error);
            }
        },
        async toggleTodo(id: number) {
            const config = useRuntimeConfig();
            await $fetch(`${config.public.apiBase}/todos/${id}`, {
                method: 'PATCH'
            })
        }
    }
});