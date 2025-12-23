import { defineStore } from 'pinia';
import {  useRuntimeConfig } from 'nuxt/app'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as any[]
    }),
    actions: {
        // Get config once an reuse
        getApiUrl(endpoint: string = '') {
            const config = useRuntimeConfig();
            return `${config.public.apiBase}/todos/${endpoint}`;
        },
        async fetchTodos() {
            const res = await $fetch<any[]>('/api/todos');
            this.todos = res;
        },
        async addTodo(payload: { title: string }) {
            await $fetch('/api/todos', {
                method: 'POST',
                body: payload
            })
        },
        async deleteTodo(id: number) {
            try {
                await $fetch(this.getApiUrl(`/${id}`), {
                    method: 'DELETE'
                })
            } catch (error) {
                console.error('Failed to delete todo:', error);
            }
        },
        async toggleTodo(id: number) {
            await $fetch(this.getApiUrl(`/${id}`), {
                method: 'PATCH'
            })
        },
        async updateTodo(payload: {
            id: number
            title: string
            completed: boolean
        }) {
            await $fetch(this.getApiUrl(`/${payload.id}`), {
                method: 'PUT',
                body: {
                    title: payload.title,
                    completed: payload.completed
                }
            })
        }
    }

});