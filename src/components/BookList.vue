<script setup>
    import { useBooksStore } from '../stores/books';
    const store = useBooksStore();
</script>

<template>
  <ul>
    <li
      v-for="book in store.books"
      :key="book.id"
      class="mb-4 border rounded p-4 flex justify-between items-center"
    >
      <div>
        <p class="font-semibold">{{ book.title }}</p>
        <p class="text-sm text-gray-600">By {{ book.author }} - {{ book.published_year }}</p>
      </div>
      <div class="flex gap-4">
        <button @click="$emit('edit-book', book)" class="text-blue-600 hover:underline">Edit</button>
        <button @click="store.deleteBook(book.id)" class="text-red-600 hover:underline">Delete</button>
      </div>
    </li>
  </ul>
</template>

