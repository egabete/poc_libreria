import React, { Component } from "react";
import "./App.css";

import BooksManager from "./components/booksManager/booksManager";

// Clase APP = Componente React "APP"
export default class App extends Component {
  state = { loading: true, drizzleState: this.props.drizzle };

  setAccountChangeListener() {
    // Esta funcinon crea un listener para detectar el cambio de cuenta en metamask
    const accountChangeListener = () => {
      window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();
      });
    }

    // Si tengo disponible ethereum como variable global, agrego el listener
    if (window.ethereum){
      accountChangeListener();
    } else {
      // Si no esta disponible window.etherum, reintento mas 5 segundos mas tarde
      setTimeout(() => {
        this.setAccountChangeListener()
      }, 5000)
    }
  }

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store, what is the store ??
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });

    this.setAccountChangeListener();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    if (this.state.loading) {
      return "Loading Drizzle...";
    }

    return (
      <div className="App">

        <BooksManager
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        >
        </BooksManager>
      </div>
    );
  }
}
