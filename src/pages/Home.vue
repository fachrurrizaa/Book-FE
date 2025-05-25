<script setup>
    import BookForm from '../components/BookForm.vue';
    import BookList from '../components/BookList.vue';
    import { useBooksStore } from '../stores/books';
    import { onMounted, ref } from 'vue';

    const store = useBooksStore();
    const editingBook = ref(null);

    const handleEdit = (book) => {
    editingBook.value = { ...book };
    };

    onMounted(() => {
    store.fetchBooks();
    });
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Books Management</h1>
    <BookForm :editingBook="editingBook" @clear-editing="editingBook = null" />
    <BookList @edit-book="handleEdit" />
  </div>
</template>

