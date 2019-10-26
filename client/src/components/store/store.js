import React from "react";

export default class Store extends React.Component {
  handleBuy = bookId => {
    const { drizzle, drizzleState, books } = this.props;
    const contract = drizzle.contracts.Libreria;

    // let drizzle know we want to call the `set` method with `value`

    const options = {
      from: drizzleState.accounts[0],
      value: books[bookId].purchasePrice
    };

    contract.methods.buyBook.cacheSend(bookId, options);
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
        <tr key={book.bookId}>
          {/* <td>{book.bookId}</td> */}

          <td style={{ textAlign: "center" }}>
            <img src={book.cover} style={{ width: "100px" }} />
            <p>{book.title}</p>
          </td>
          <td>$ {book.purchasePrice}</td>
          <td>$ {book.lendingPrice}</td>
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
              {/* <th>ID</th> */}
              <th>Portada</th>
              <th>Compra</th>
              <th>Alquiler</th>
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
