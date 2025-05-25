<script setup>
import { ref, watch } from 'vue'
import { useBooksStore } from '@/stores/books'

const props = defineProps({
  editingBook: Object
})

const emit = defineEmits(['onClearEditing'])

const title = ref('')
const author = ref('')
const publishedYear = ref('')

const bookStore = useBooksStore()

watch(
  () => props.editingBook,
  (newBook) => {
    if (newBook) {
      title.value = newBook.title
      author.value = newBook.author
      publishedYear.value = newBook.published_year
    } else {
      title.value = ''
      author.value = ''
      publishedYear.value = ''
    }
  },
  { immediate: true }
)

const handleSubmit = async () => {
  const bookData = {
    title: title.value,
    author: author.value,
    published_year: parseInt(publishedYear.value)
  }

  if (props.editingBook) {
    await bookStore.updateBook(props.editingBook.id, bookData)
  } else {
    await bookStore.addBook(bookData)
  }

  emit('onClearEditing')
  title.value = ''
  author.value = ''
  publishedYear.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 bg-white shadow-md rounded-xl p-4 border border-gray-200">
    <div>
      <label class="block font-semibold">Judul</label>
      <input v-model="title" type="text" class="w-full border px-3 py-2 rounded" required />
    </div>
    <div>
      <label class="block font-semibold">Penulis</label>
      <input v-model="author" type="text" class="w-full border px-3 py-2 rounded" required />
    </div>
    <div>
      <label class="block font-semibold">Tahun Terbit</label>
      <input v-model="publishedYear" type="number" class="w-full border px-3 py-2 rounded" required />
    </div>
    <div class="text-right">
      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        {{ props.editingBook ? 'Update' : 'Tambah' }} Buku
      </button>
    </div>
  </form>
</template>
