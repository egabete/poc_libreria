import React from "react";
/* import Tabs from "../tabs/tabs";
import ListBooks from "../listBooks/listBooks";
import Store from "../store/store";

 */
//import booksJson from "../../books.json";
import ListBooks from "../listBooks/listBooks";
import Store from "../store/store";

export default class BookManager extends React.Component {
  state = {
    storeDataKey: null,
    booksDataKey: null,
    bookIndexDataKey: null,
    haveRequestedBooksFromContract: false
  };

  // Esto es lo mismo que estaba antes en listBooks. Se encarga de pedir los datos del contrato y cuando estan
  // los guarda en dataKey
  componentDidMount() {
    const libreriaContract = this.props.drizzle.contracts.Libreria;

    const storeDataKey = libreriaContract.methods.store.cacheCall();

    const getBookIndexDataKey = libreriaContract.methods.getBookIndex.cacheCall();

    this.setState({ storeDataKey, getBookIndexDataKey });
  }

  /**  Esta funcion se ejecuta cada vez que alguna información de la blockchain cambia
   *  Una vez tiene la longitud del array de indices de los libros, pide la información de cada uno
   *  de esos libros
   */
  componentDidUpdate() {
    const { getBookIndexDataKey, booksDataKey } = this.state;

    const libreriaContract = this.props.drizzle.contracts.Libreria;

    const getBookIndex = this.props.drizzleState.contracts.Libreria.getBookIndex;

    // Si ya obtuve la info del array de libros, y todavia no pedi la info de cada libro del array
    if (getBookIndex && getBookIndex[getBookIndexDataKey] && !booksDataKey) {
      // Guardo el array con los indices de los libros
      const bookIndexList = getBookIndex[getBookIndexDataKey].value;

      // Por cada id del array, pido la info del libro y guardo la referencia en el store
      let booksDataKey = {};
      bookIndexList.forEach(bookId => {
        booksDataKey[bookId] = libreriaContract.methods.books.cacheCall(bookId);
      });

      this.setState({ booksDataKey });
    }
  }

  getMyAddress = () => {
    return this.props.drizzleState.accounts[0];
  };

  getStoreAddress = () => {
    const { Libreria } = this.props.drizzleState.contracts;
    // Guardo el objeto con el address del store
    const storeDrizzleObject = Libreria.store[this.state.storeDataKey];

    // Si el objeto ya tiene el valor value (quiere decir que ya se obtuvo del contrato), guardo solo ese valor
    return storeDrizzleObject && storeDrizzleObject.value;
  };

  getBookIndex = () => {
    const { Libreria } = this.props.drizzleState.contracts;

    // Guardo la informacion del array de indices de libros
    const bookIndexDrizzleObject = Libreria.getBookIndex[this.state.getBookIndexDataKey];
    // Si el objeto ya tiene el valor value (quiere decir que ya se obtuvo del contrato), guardo solo ese valor
    return bookIndexDrizzleObject && bookIndexDrizzleObject.value;
  };

  getBooks = bookIndex => {
    const { Libreria } = this.props.drizzleState.contracts;

    const booksDrizzleObject = Libreria.books;

    // Solo cuando la longitud de booksDrizzleObject coincida con la longitud de bookIndex, tengo toda la data
    if (Object.keys(booksDrizzleObject).length < bookIndex.length) {
      return false;
    }

    // Objeto con la info de los libros, similar al del contrato
    let books = {};
    bookIndex.forEach(bookId => {
      // Leo la info del libro
      const book = Libreria.books[this.state.booksDataKey[bookId]];
      // Guardo el libro en la key correspoindiente al bookID
      books[bookId] = book.value;
    });

    return books;
  };

  classifyBooks = (books, bookIndex, myAddress, storeAddress) => {
    // Creo una lista de mis libros y otras del store
    let myBooks = [];
    let storeBooks = [];

    const iAmTheStore = myAddress === storeAddress;

    // Creo una lista, a partir de los IDs del objeto con la info de los libros (creado en linea 43)
    for (var i = 0; i < bookIndex.length; i++) {
      const currentBook = books[bookIndex[i]];

      // Por cada libro, si soy el owner o el temporalOwner, lo guardo en mi lista. Sino, asumo que es del store
      if (iAmTheStore) {
        // Si soy el store, y soy el dueño del libro y el dueño temporal, lo muestro
        if (currentBook.owner === myAddress && currentBook.temporalOwner === myAddress) {
          myBooks.push(currentBook);
        }
      } else {
        // Si no soy el store

        // Si soy owner final o temporal, lo agrego a mi lista
        if (currentBook.owner === myAddress || currentBook.temporalOwner === myAddress) {
          myBooks.push(currentBook);
        } else if (
          // Si el owner temporal y final es el store, lo muestro en el store
          // Tengo que chequear las 2 cosas, porque un tercero puede tener el libro a prestamo, y yo no tengo que verlo en el store
          currentBook.owner === storeAddress &&
          currentBook.temporalOwner === storeAddress
        ) {
          storeBooks.push(currentBook);
        }
      }
    }

    return { myBooks, storeBooks };
  };

  render() {
    const defaultBody = <div />;

    // Guardo mi address
    const myAddress = this.getMyAddress();

    // Guardo el address del store
    const storeAddress = this.getStoreAddress();

    // Guardo el array de indices de libros
    const bookIndex = this.getBookIndex();

    // Si todavia no obtuve ninguno de estos datos, dibujo un div vacio
    if (!storeAddress || !bookIndex) {
      return defaultBody;
    }

    // Guardo la información de cada libro
    const books = this.getBooks(bookIndex);

    if (!books) {
      return defaultBody;
    }

    const iAmTheStore = myAddress === storeAddress;

    const { myBooks, storeBooks } = this.classifyBooks(books, bookIndex, myAddress, storeAddress);

    // Una vez tengo las listas de mis libros y los libros del store, creo la logica de dibujado

    let title;
    if (iAmTheStore) {
      title = <h2>Soy el store</h2>;
    } else {
      title = <h2>Mis Libros</h2>;
    }

    let listBooksComponent = (
      <div style={{ flex: "50%" }}>
        {title}
        <ListBooks
          books={myBooks}
          storeAddress={storeAddress}
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
        />
      </div>
    );

    let storeComponent;
    if (!iAmTheStore) {
      storeComponent = (
        <div style={{ borderLeft: "solid 1px gray", flex: "50%" }}>
          <Store
            books={storeBooks}
            storeAddress={storeAddress}
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
          />
        </div>
      );
    }

    return (
      <div style={{ display: "flex" }}>
        {listBooksComponent}
        {storeComponent}
      </div>
    );
  }
}
