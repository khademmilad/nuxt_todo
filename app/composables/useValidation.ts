import { ref } from "vue"

export function useValidation() {
    const errors = ref<Record<string, string>>({})

    function validateTodo(title: string) {
        errors.value = {}
        if (!title || title.trim().length < 3) {
            errors.value.title = 'Title must be at least 3 characters long.'
            return false
        }
        return true
    }
    return {
        errors,
        validateTodo
    }
}