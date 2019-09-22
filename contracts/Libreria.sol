pragma solidity >=0.4.21 <0.6.0;

contract herencia {


}


contract Libreria {

uint256 public constant  maxAmmountOfBooks = 20;

address payable public _owner;

struct Book {
        uint256 bookId;
        address payable owner;
        address temporalOwner;
        uint256 purchasePrice;
        uint256 lendingPrice;
    }

// mapping
mapping (uint256 => Book) public books;

constructor() public {
        _owner = msg.sender;
    }


// modifiers
modifier checkId (uint256 _id) {
        require(books[_id].bookId != _id, "Book already exists");
        _;

}

 modifier checkPurchasePrice (uint _id) {
        require(msg.value >= books[_id].purchasePrice);
        _;

} 

 modifier checkLendingPrice (uint _id) {
        require(msg.value >= books[_id].lendingPrice);
        _;

} 

// Funcion para agregar un libro dentro del array de libros.
 function addBook(uint256 _id, uint256 pPrice, uint256 lPrice) public checkId(_id) {
    
        books[_id].bookId = _id;
        books[_id].owner = _owner;
        books[_id].purchasePrice = pPrice;
        books[_id].lendingPrice = lPrice;
    }
 


// Funcion para la compra de un libro. Se requiere el id del libro y el precio de compra.
function buyBook(uint _id) public payable checkPurchasePrice(_id) {
    
    books[_id].owner.transfer(books[_id].purchasePrice);
    books[_id].owner = msg.sender;

    
}
    
 // Funcion para efectuar el prestamo de un libro. Se requiere el id del libro y el precio de alquiler.
function lendBook(uint _id) public payable {
    
    books[_id].owner.transfer(books[_id].lendingPrice);
    books[_id].temporalOwner = msg.sender;

    }

 // Funcion para efectuar la devolución de un libro. Se requiere el id del libro.
function returnBook(uint _id) public payable {
    books[_id].temporalOwner = books[_id].owner;


    }
    
    
}