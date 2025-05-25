<script setup>
import { ref, onMounted } from 'vue'
import BookForm from '@/components/BookForm.vue'
import BookList from '@/components/BookList.vue'
import { useBooksStore } from '@/stores/books'

const bookStore = useBooksStore()

const selectedBook = ref(null)
const showDetailModal = ref(false)
const showEditModal = ref(false)

const openDetailModal = async (id) => {
  const book = await bookStore.fetchBookById(id)
  if (book) {
    selectedBook.value = book
    showDetailModal.value = true
  }
}

const openEditModal = (book) => {
  selectedBook.value = { ...book }
  showEditModal.value = true
}

const closeModal = () => {
  showDetailModal.value = false
  showEditModal.value = false
  selectedBook.value = null
}

onMounted(() => {
  bookStore.fetchBooks()
})
</script>

<template>
  <div class="container mx-auto p-4 space-y-6">
    <BookForm @onClearEditing="bookStore.fetchBooks" />
    <BookList
      :books="bookStore.books"
      @onEdit="openEditModal"
      @onDelete="bookStore.deleteBook"
      @onView="openDetailModal"
    />

    <!-- Modal: Detail Buku -->
    <div
      v-if="showDetailModal"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h3 class="text-xl font-bold mb-4">{{ selectedBook?.title }}</h3>
        <p><strong>Author:</strong> {{ selectedBook?.author }}</p>
        <p><strong>Published Year:</strong> {{ selectedBook?.published_year }}</p>

        <button
          @click="closeModal"
          class="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <div class="mt-4 text-right">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Modal: Edit Buku -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <h3 class="text-xl font-bold mb-4">Edit Buku</h3>

        <BookForm
          :editingBook="selectedBook"
          @onClearEditing="() => {
            closeModal()
            bookStore.fetchBooks()
          }"
        />

        <button
          @click="closeModal"
          class="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>
