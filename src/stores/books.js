import { defineStore } from 'pinia';
import axios from 'axios';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
  }),
  actions: {
    async fetchBooks() {
      const res = await axios.get('http://localhost:3000/books');
      this.books = res.data;
    },
    async addBook(book) {
      await axios.post('http://localhost:3000/books', book);
      await this.fetchBooks();
    },
    async deleteBook(id) {
      await axios.delete(`http://localhost:3000/books/${id}`);
      await this.fetchBooks();
    },
    async updateBook(id, updatedBook) {
        await axios.put(`http://localhost:3000/books/${id}`, updatedBook);
        await this.fetchBooks();
    }      
  }
});
