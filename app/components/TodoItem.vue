<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '~/stores/useTodoStore'

const props = defineProps<{
    todo: {
        id: number
        title: string
        completed: boolean
    }
}>()
const emit = defineEmits(['deleted', 'toggled'])
const store = useTodoStore()
const showModal = ref(false)
const editTitle = ref(props.todo.title)

const toggle = async () => {
    await store.toggleTodo(props.todo.id)
    emit('toggled')
}

const remove = async () => {
    await store.deleteTodo(props.todo.id)
    emit('deleted')
}
const startEdit  = () => {
    showModal.value = true
    editTitle.value = props.todo.title
}
const saveEdit = async () => {
    if (!editTitle.value.trim()) {
        showModal.value = false
        return
    }

    if (editTitle.value !== props.todo.title) {
        await store.updateTodo({
            id: props.todo.id,
            title: editTitle.value.trim(),
            completed: props.todo.completed
        })
        emit('toggled')
    }
    showModal.value = false
}

const closeModal = () => {
    showModal.value = false
    editTitle.value = props.todo.title
}   
</script>

<template>
    <div class="p-4 border rounded-lg flex items-center justify-between bg-white shadow-sm hover:shadow transition">
        <div class="flex items-center gap-3 flex-1">
            <input
                type="checkbox"
                :checked="todo.completed"
                @change="toggle"
                class="windows98-checkbox"
                />
            <h3
                :class="['ml-2 text-lg flex-1 cursor-pointer', {'line-through text-gray-400': todo.completed}]"
                @dblclick="startEdit"
            >{{ todo.title }}
        </h3>
        </div>
        <div class="flex gap-2">
            <BaseButton @click="startEdit">Edit</BaseButton>
            <BaseButton @click="remove">Delete</BaseButton>
        </div>
        <Modal
            v-if="showModal"
            :show="showModal"
            @close="closeModal"
            @save="saveEdit"
        >
        <div class="flex flex-col gap-4">
            <label class="font-bold text-gray-700">Edit Todo</label>
            <BaseInput 
                v-model="editTitle" 
                class="border border-gray-400 rounded px-2 py-1 text-lg bg-white" 
                autofocus
            />
        </div>
        </Modal>
    </div>
</template>

<style scoped>
.windows98-btn {
  font-family: 'Tahoma', 'Geneva', sans-serif;
  border-width: 2px;
  border-style: outset;
  background: #e0e0e0;
  color: #222;
  box-shadow: 2px 2px 0 #bbb;
  padding: 0.25rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  transition: background 0.1s;
}
.windows98-btn:active {
  border-style: inset;
  background: #d0d0d0;
}
.windows98-btn-danger {
  background: #f8d7da;
  color: #a94442;
  border-color: #a94442;
}
.windows98-btn-danger:active {
  background: #f1b0b7;
}

.windows98-checkbox {
  appearance: none;
  width: 22px;
  height: 22px;
  border: 2px outset #bbb;
  background: #f0f0f0;
  border-radius: 4px;
  box-shadow: 2px 2px 0 #888, 4px 4px 0 #ccc;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  margin-right: 0.5rem;
  transition: background 0.1s, border 0.1s;
}
.windows98-checkbox:checked {
  background: #b0c4de;
  border-style: inset;
}
.windows98-checkbox:checked::after {
  content: '';
  display: block;
  position: absolute;
  left: 6px;
  top: 2px;
  width: 7px;
  height: 13px;
  border: solid #222;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
