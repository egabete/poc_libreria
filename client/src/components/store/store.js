import React from "react";

export default class Store extends React.Component {
  handleBuy = bookId => {
    const { drizzle, drizzleState, books } = this.props;
    const contract = drizzle.contracts.Libreria;

    // let drizzle know we want to call the `set` method with `value`
    contract.methods.buyBook.cacheSend(bookId, {
      from: drizzleState.accounts[0],
      value: books[bookId].purchasePrice
    });
  };

  handleRent = bookId => {
    const { drizzle, drizzleState, books } = this.props;
    const contract = drizzle.contracts.Libreria;

    // let drizzle know we want to call the `set` method with `value`
    contract.methods.lendBook.cacheSend(bookId, {
      from: drizzleState.accounts[0],
      value: books[bookId].lendingPrice
    });
  };

  render() {
    const booksRows = this.props.books.map(book => {
      return (
        <tr>
          <td>{book.bookId}</td>
          <td>{book.purchasePrice}</td>
          <td>{book.lendingPrice}</td>
          <td>
            <button
              onClick={() => {
                this.handleBuy(book.bookId);
              }}
            >
              Comprar
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                this.handleRent(book.bookId);
              }}
            >
              Alquilar
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <h2>Store</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Precio compra</th>
              <th>Precio alquiler</th>
              <th>Comprar</th>
              <th>Alquilar</th>
            </tr>
          </thead>
          <tbody>{booksRows}</tbody>
        </table>
      </div>
    );
  }
}
