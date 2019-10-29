const Libreria = artifacts.require("Libreria");

contract("Libreria", accounts => {
  const store = accounts[0];
  const user = accounts[1];
  let libreria;

  beforeEach(async function() {
    libreria = await Libreria.deployed();
  });

  it("Check store value when deployed", async () => {
    const expectedValue = store;

    const value = await libreria.store.call();
    assert.equal(value, expectedValue, "When deployed value must be store!");
  });

  it("buyBook() with correct purchase price and check owner", async () => {
    const bookIndex = await libreria.getBookIndex.call();

    const position = 1;
    const bookId = bookIndex[position];

    let book = await libreria.books.call(bookId);

    const previousOwner = book.owner;

    await libreria.buyBook(bookId, { from: user, value: book.purchasePrice });

    book = await libreria.books.call(bookId);

    const currentOwner = book.owner;

    assert.notEqual(previousOwner, currentOwner, "After buying the book the owner must change");
  });

  it("buyBook() with lower purchase price and check owner", async () => {
    const bookIndex = await libreria.getBookIndex.call();

    const position = 2;
    const bookId = bookIndex[position];

    let book = await libreria.books.call(bookId);

    const previousOwner = book.owner;

    try {
      await libreria.buyBook(bookId, { from: user, value: book.purchasePrice - 10 });
      asset.fail("The buy should fail if the price is not right");
    } catch (e) {
      assert.ok("The buy has failed");
    }

    book = await libreria.books.call(bookId);
    const currentOwner = book.owner;

    assert.equal(previousOwner, currentOwner, "The owner must not have changed");
  });

  it("lendBook() with correct lend price and check owner and temporal owner", async () => {
    const bookIndex = await libreria.getBookIndex.call();

    const position = 3;
    const bookId = bookIndex[position];

    let book = await libreria.books.call(bookId);

    const previousOwner = book.owner;
    const previousTemporalOwner = book.temporalOwner;

    await libreria.lendBook(bookId, { from: user, value: book.lendingPrice });

    book = await libreria.books.call(bookId);

    const currentOwner = book.owner;
    const currentTemporalOwner = book.temporalOwner;

    assert.equal(previousOwner, currentOwner, "Owner should not change");
    assert.notEqual(previousTemporalOwner, currentTemporalOwner, "Temporal Owner should change");
  });

  it("lendBook() with lower lend price and check owner and temporal owner", async () => {
    const bookIndex = await libreria.getBookIndex.call();

    const position = 4;
    const bookId = bookIndex[position];

    let book = await libreria.books.call(bookId);

    const previousOwner = book.owner;
    const previousTemporalOwner = book.temporalOwner;

    try {
      await libreria.lendBook(bookId, { from: user, value: book.lendingPrice - 10 });
      asset.fail("The lend should fail if the price is not right");
    } catch (e) {
      assert.ok("The lend has failed");
    }

    const currentOwner = book.owner;
    const currentTemporalOwner = book.temporalOwner;

    assert.equal(previousOwner, currentOwner, "Owner should not change");
    assert.equal(previousTemporalOwner, currentTemporalOwner, "Temporal Owner should not change");
  });

  it("returnBook() ", async () => {
    const bookIndex = await libreria.getBookIndex.call();

    const position = 5;
    const bookId = bookIndex[position];

    // Initial state
    let book = await libreria.books.call(bookId);

    const firstOwner = book.owner;
    const firstTemporalOwner = book.temporalOwner;

    // Get book
    await libreria.lendBook(bookId, { from: user, value: book.lendingPrice });

    book = await libreria.books.call(bookId);

    const secondOwner = book.owner;
    const secondTemporalOwner = book.temporalOwner;

    assert.equal(firstOwner, secondOwner, "After loan owner should not change");
    assert.notEqual(firstTemporalOwner, secondTemporalOwner, "After loan temporal owner should change");

    // Return book
    await libreria.returnBook(bookId, { from: user });

    book = await libreria.books.call(bookId);

    const finalOwner = book.owner;
    const finalTemporalOwner = book.temporalOwner;

    assert.equal(secondOwner, finalOwner, "After return owner should not change");
    assert.equal(firstTemporalOwner, finalTemporalOwner, "After return final temporal owner should be the same as first temporal owner");
    assert.equal(store, finalTemporalOwner, "After return final temporal owner should be the store");
    assert.notEqual(secondTemporalOwner, finalTemporalOwner, "After return second temporal owner should not be the same as final temporal owner");
  });
});
