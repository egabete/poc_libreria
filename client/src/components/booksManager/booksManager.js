import React from "react";
/* import Tabs from "../tabs/tabs";
import ListBooks from "../listBooks/listBooks";
import Store from "../store/store";

 */
import booksJson from "../../books.json"

export default class BookManager extends React.Component {
  state = {
    dataKey: null
  };

  // Esto es lo mismo que estaba antes en listBooks. Se encarga de pedir los datos del contrato y cuando estan
  // los guarda en dataKey
  componentDidMount() {
    const { drizzle } = this.props;

    const libreria = drizzle.contracts.Libreria;
    debugger
    const dataKey = libreria.methods["getBooksIndexes"].cacheCall();

    console.log(dataKey);

    this.setState({ dataKey });
  }

  addBooksInfoToList = (books) => {
    // ver metodo MAP. le paso una funciona que se ejecuta por cada uno de los elementos de "books"
    return books.map(
      (book, index) => {
      const bookWithInfo = booksJson[index];
      bookWithInfo.isMyBook = book !== "0x0000000000000000000000000000000000000000"
      return bookWithInfo
    })
  }

  render() {
    // Codigo estandar para cargar el contrato
    const { Libreria } = this.props.drizzleState.contracts;
    console.log("Libreria",this.props.drizzleState.contracts)
    debugger

    // const { Adoption } = this.props.drizzleState && this.props.drizzleState.contracts;
   
    // using the saved `dataKey`, get the variable we're interested in
    // const adopters = Adoption.getAdopters[this.state.dataKey];
    const booksIndex = Libreria.getBooksIndexes[this.state.dataKey];


    if (booksIndex && booksIndex.value) {

    debugger
      // Juntamos la info del json (con la data de los libros), con el estado de la blockchain

/*    const createBooksInfoList = this.addBooksInfoToList(adopters.value);

      const myBooks = createBooksInfoList.filter(books => books.isMyBook);

      const storeBooks = createBooksInfoList.filter(books => !books.isMyBook);
 */

      // IMPORTANTE: hasta ahora manejamos una sola lista, digamos los comprados o para comprar
      // Hay que agregar logica para gestionar los prestados

      /* return (
        <Tabs
          leftContent={
            <ListBooks
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              books={myBooks}
            />
          }
          rightContent={
            <Store
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              books={storeBooks}
            />
          }
          leftTitle="My books"
          rightTitle="Store"
        />
      ) */
    }

    return <div />;
  }
}
