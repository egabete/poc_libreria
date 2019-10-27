import React, { Component } from "react";
import "./App.css";

import BooksManager from "./components/booksManager/booksManager";

// Clase APP = Componente React "APP"
export default class App extends Component {
  state = { loading: true, drizzleState: this.props.drizzle };



  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store, what is the store ??
    this.storeUnsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.storeUnsubscribe();
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
