import React from "react";
/* import Tabs from "../tabs/tabs";
import ListBooks from "../listBooks/listBooks";
import Store from "../store/store";

 */
//import booksJson from "../../books.json";
import ListBooks from "../listBooks/listBooks";
import Store from "../store/store";

const TOTAL_BOOKS = 20;

export default class BookManager extends React.Component {
  state = {
    storeDataKey: null,
    booksDataKey: {}
  };

  // Esto es lo mismo que estaba antes en listBooks. Se encarga de pedir los datos del contrato y cuando estan
  // los guarda en dataKey
  componentDidMount() {
    const { drizzle } = this.props;

    const libreria = drizzle.contracts.Libreria;

    const storeDataKey = libreria.methods.store.cacheCall();

    let booksDataKey = {};

    // Llamo a la funcion tantas veces como libros hay (no encontre mejor forma aun)
    for (let i = 0; i < TOTAL_BOOKS; i++) {
      booksDataKey[i] = libreria.methods.books.cacheCall(i);
    }

    this.setState({ storeDataKey, booksDataKey });
  }

  render() {
    // Codigo estandar para cargar el contrato
    const { Libreria } = this.props.drizzleState.contracts;

    const myAddress = this.props.drizzleState.accounts[0];

    const storeAddressObject = Libreria.store[this.state.storeDataKey];

    // Objeto con la info de los libros, similar al del contrato
    let booksInfo = {};

    // Me aseguro que ya haya obtenido la informacion del total de libros que hay (como hice 20 llamadas, necesito esperar tener la info de todas las llamadas)
    if (
      storeAddressObject &&
      storeAddressObject.value &&
      Libreria.books &&
      Object.keys(Libreria.books).length === TOTAL_BOOKS
    ) {
      const storeAddress = storeAddressObject.value;
      for (let i = 0; i < TOTAL_BOOKS; i++) {
        // Leo la info del libro
        const book = Libreria.books[this.state.booksDataKey[i]];
        // Obtengo el id de ese libro
        const bookId = book && book.value && book.value.bookId;
        // Guardo el libro en la key correspoindiente al bookID
        booksInfo[bookId] = book.value;
      }

      // Creo una lista de mis libros y otras del store
      let myBooks = [];
      let storeBooks = [];

      const iAmTheStore = myAddress === storeAddress;

      // Creo una lista, a partir de los IDs del objeto con la info de los libros (creado en linea 43)
      const listOfBooksIDs = Object.keys(booksInfo);
      for (var i = 0; i < listOfBooksIDs.length; i++) {
        const currentBook = booksInfo[listOfBooksIDs[i]];

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

      console.log({ myBooks });
      console.log({ storeBooks });

      let listBooksComponent = (
        <div style={{ flex: "50%" }}>
          {iAmTheStore ? <h2>Soy el store</h2> : <h2>Mis Libros</h2>}
          <ListBooks
            books={myBooks}
            storeAddress={storeAddress}
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
          />
        </div>
      );

      let storeComponent;
      if (myAddress !== storeAddress) {
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

    return <div />;
  }
}
