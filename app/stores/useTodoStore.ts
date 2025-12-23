import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as any[]
    }),
    actions: {
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
                await $fetch('/api/todos', {
                    method: 'DELETE',
                    body: { id }
                })
            } catch (error) {
                console.error('Failed to delete todo:', error);
            }
        },
        async toggleTodo(id: number) {
            await $fetch('/api/todos', {
                method: 'PATCH',
                body: { id }
            })
        },
        async updateTodo(payload: {
            id: number
            title: string
            completed: boolean
        }) {
            await $fetch('/api/todos', {
                method: 'PUT',
                body: payload
            })
        }
    }

});