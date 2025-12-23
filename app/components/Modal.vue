<script setup lang="ts">
defineProps<{
    show: boolean
}>();

const emit = defineEmits(['close', 'save']);
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
            <div class="modal-container">
                <div class="modal-content">
                    <slot />
                </div>
                <div class="modal-footer">
                    <BaseButton @click="emit('save')" class="bg-blue-200">
                        Save
                    </BaseButton>
                    <BaseButton @click="emit('close')" class="bg-gray-200">
                        Cancel
                    </BaseButton>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-container {
    font-family: 'Tahoma', 'Geneva', sans-serif;
    background: #f0f0f0;
    border: 2px outset #bbb;
    border-radius: 8px;
    box-shadow: 4px 4px 0 #888;
    padding: 1.5rem;
    min-width: 400px;
    max-width: 90%;
}

.modal-content {
    margin-bottom: 1.5rem;
}

.modal-footer {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    transform: scale(0.9);
}
</style>
