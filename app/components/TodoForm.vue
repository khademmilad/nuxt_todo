<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore} from '../store/useTodoStore'
import { useValidation } from '../composables/useValidation'

const title = ref('')
const store = useTodoStore()
const { errors, validateTodo} = useValidation()
const emit = defineEmits(['added'])

const handleInput = () => {
    validateTodo(title.value)
}

const submit = async () => {
    if (!validateTodo(title.value)) return
    await store.addTodo({title: title.value})
    title.value = ''
    emit('added')
}
</script>

<template>
    <form @submit.prevent="submit" class="bg-white shadow rounded-lg p-4 flex flex-col gap-3 max-w-xl mx-auto mb-6">
        <div class="flex gap-2 itmes-center">
            <BaseInput
                v-model="title"
                placeholder="what needs to be done?"
                class="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
            <BaseButton type="submit" class="h-10">Add</BaseButton>
        </div>
        <div v-if="errors.title" class="text-red-600 mt-2">{{ errors.title }}</div>
    </form>
</template>