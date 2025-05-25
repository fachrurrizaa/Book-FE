<script setup>
    import { ref, watch } from 'vue';
    import { useBooksStore } from '../stores/books';

    const store = useBooksStore();

    // Props
    const props = defineProps({
        editingBook: Object, // diterima dari parent
    });

    // Local state
    const form = ref({ title: '', author: '', published_year: null });
    const editingBookId = ref(null);

    // Watch kalau editingBook berubah
    watch(() => props.editingBook, (newBook) => {
    if (newBook) {
        form.value = { ...newBook };
        editingBookId.value = newBook.id;
    }
    });

    const handleSubmit = async () => {
        if (editingBookId.value) {
            await store.updateBook(editingBookId.value, form.value);
        } else {
            await store.addBook(form.value);
        }
        resetForm();
    };

    const resetForm = () => {
        form.value = { title: '', author: '', published_year: null };
        editingBookId.value = null;
        // kirim event ke parent
        emit('clear-editing');
    };

    // Emit event ke parent biar bisa clear state
    const emit = defineEmits(['clear-editing']);
</script>


<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 mb-6">
    <input v-model="form.title" type="text" placeholder="Title" required class="border p-2 rounded w-full" />
    <input v-model="form.author" type="text" placeholder="Author" required class="border p-2 rounded w-full" />
    <input v-model.number="form.published_year" type="number" placeholder="Published Year" required class="border p-2 rounded w-full" />

    <div class="flex gap-2">
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {{ editingBookId ? 'Update Book' : 'Add Book' }}
      </button>
      <button v-if="editingBookId" @click="resetForm" type="button" class="text-gray-600 hover:underline">
        Cancel
      </button>
    </div>
  </form>
</template>

