import axios from "axios";

const API_URL = "http://localhost:5000/api/book/";
//const API_URL_GG = "https://www.googleapis.com/books/v1/";


class BookService {
  createBooks(id_book, title, authors) {
    return axios.post(API_URL + "create", {
      id_book,
      title,
      authors,
    });
  }

  findBooks(title, authors) {
    return axios.get(API_URL + "find", {
      title,
      authors,
    });
  }

  getBooks() {
    return axios.get(API_URL + "get");
  }

  search(query){
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query, {
      query
    });
  }
}

export default new BookService();
