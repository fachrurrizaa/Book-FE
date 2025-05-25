<script setup>
const props = defineProps({
  books: Array
})

const emit = defineEmits(['onEdit', 'onDelete', 'onView'])

const handleDelete = (id) => {
  if (confirm('Yakin ingin menghapus buku ini?')) {
    emit('onDelete', id)
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="book in books"
      :key="book.id"
      class="bg-white shadow-md rounded-xl p-4 border border-gray-200"
    >
      <h3 class="text-lg font-bold mb-2">{{ book.title }}</h3>
      <p class="text-sm text-gray-700">Penulis: {{ book.author }}</p>
      <p class="text-sm text-gray-700 mb-4">Tahun: {{ book.published_year }}</p>

      <div class="flex flex-row-reverse gap-2">
        <button
          @click="handleDelete(book.id)"
          class="text-red-600 hover:underline text-sm"
        >
          Hapus
        </button>
        <button
          @click="$emit('onEdit', book)"
          class="text-yellow-600 hover:underline text-sm"
        >
          Edit
        </button>
        <button
          @click="$emit('onView', book.id)"
          class="text-blue-600 hover:underline text-sm"
        >
          Detail
        </button>
      </div>
    </div>
  </div>
</template>
