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
<<<<<<< HEAD
  
  state = {}


  componentDidMount() {
  
  const verVentasDataKey = this.props.drizzle.contracts.Libreria.methods.verVentas.cacheCall();
  
  this.setState({ verVentasDataKey});

  }

  getVentas = () => {
    const { Libreria } = this.props.drizzleState.contracts;
    // Guardo el objeto con el address del store
    const storeDrizzleObject = Libreria.verVentas[this.state.verVentasDataKey];

    // Si el objeto ya tiene el valor value (quiere decir que ya se obtuvo del contrato), guardo solo ese valor
    return storeDrizzleObject && storeDrizzleObject.value;
  };

=======
>>>>>>> f9e1b7f84a740e730a21c4a75a40fb06dba757e7

  render() {
    
    const booksRows = this.props.books.map(book => {
      return (
        <tr key={book.bookId}>
          {/* <td>{book.bookId}</td> */}

          <td style={{ textAlign: "center" }}>
            <img src={book.cover} style={{ width: "100px" }} />
            <p>{book.title}</p>
          </td>
          <td>WEI {book.purchasePrice}</td>
          <td>WEI {book.lendingPrice}</td>
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
<<<<<<< HEAD
        <p>Cantidad de Ventas: {this.getVentas()}</p>
=======
>>>>>>> f9e1b7f84a740e730a21c4a75a40fb06dba757e7
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
