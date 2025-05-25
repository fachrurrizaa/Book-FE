import { defineStore } from 'pinia';
import axios from 'axios';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
  }),
  actions: {
    async fetchBooks() {
      const res = await axios.get('https://book-api-beta-drab.vercel.app/books');
      this.books = res.data;
    },
    async fetchBookById(id) {
      try {
        const res = await axios.get(`https://book-api-beta-drab.vercel.app/books/${id}`)
        return res.data
      } catch (err) {
        console.error('Gagal mengambil detail buku', err)
        return null
      }
    },
    async addBook(book) {
      await axios.post('https://book-api-beta-drab.vercel.app/books', book);
      await this.fetchBooks();
    },
    async deleteBook(id) {
      await axios.delete(`https://book-api-beta-drab.vercel.app/books/${id}`);
      await this.fetchBooks();
    },
    async updateBook(id, updatedBook) {
        await axios.put(`https://book-api-beta-drab.vercel.app/books/${id}`, updatedBook);
        await this.fetchBooks();
    }      
  }
});
