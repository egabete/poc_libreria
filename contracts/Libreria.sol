pragma solidity >=0.4.21 <0.6.0;




contract LibreriaData {

    uint256 internal constant  maxAmmountOfBooks = 20;

    address payable public store;

    struct Book {
            uint256 bookId;
            address payable owner;
            address temporalOwner;
            uint256 purchasePrice;
            uint256 lendingPrice;
        }

    mapping (uint256 => Book) public books;

    uint256[] public bookIndex;

    constructor() internal {
        store = msg.sender;
        /*
        for (uint i = 0;i < maxAmmountOfBooks; i ++){
            books[i].bookId = i;
            books[i].owner = msg.sender;
            books[i].temporalOwner = msg.sender;
            books[i].purchasePrice = 10000000000;
            books[i].lendingPrice = 5000000000;

            bookIndex.push(books[i].bookId);
        }*/
        // inicialización datos blockchain
                books[0].bookId = 0;
                books[0].owner = msg.sender;
                books[0].temporalOwner = msg.sender;
                books[0].purchasePrice = 10000000000000;
                books[0].lendingPrice = 5000000000000;
                bookIndex.push(books[0].bookId);

                books[1].bookId = 1;
                books[1].owner = msg.sender;
                books[1].temporalOwner = msg.sender;
                books[1].purchasePrice = 10000000000000;
                books[1].lendingPrice = 5000000000000;
                bookIndex.push(books[1].bookId);
                
                books[2].bookId = 2;
                books[2].owner = msg.sender;
                books[2].temporalOwner = msg.sender;
                books[2].purchasePrice = 10000000000000;
                books[2].lendingPrice = 5000000000000;
                bookIndex.push(books[2].bookId);
                
                books[3].bookId = 3;
                books[3].owner = msg.sender;
                books[3].temporalOwner = msg.sender;
                books[3].purchasePrice = 10000000000000;
                books[3].lendingPrice = 5000000000000;
                bookIndex.push(books[3].bookId);
                
                books[4].bookId = 4;
                books[4].owner = msg.sender;
                books[4].temporalOwner = msg.sender;
                books[4].purchasePrice = 10000000000000;
                books[4].lendingPrice = 5000000000000;
                bookIndex.push(books[4].bookId);
                
                books[5].bookId = 5;
                books[5].owner = msg.sender;
                books[5].temporalOwner = msg.sender;
                books[5].purchasePrice = 10000000000000;
                books[5].lendingPrice = 5000000000000;
                bookIndex.push(books[5].bookId);
                
                books[6].bookId = 6;
                books[6].owner = msg.sender;
                books[6].temporalOwner = msg.sender;
                books[6].purchasePrice = 10000000000000000;
                books[6].lendingPrice = 5000000000000000;
                bookIndex.push(books[6].bookId);
                
                books[7].bookId = 7;
                books[7].owner = msg.sender;
                books[7].temporalOwner = msg.sender;
                books[7].purchasePrice = 10000000000000;
                books[7].lendingPrice = 5000000000000;
                bookIndex.push(books[7].bookId);
                
                books[8].bookId = 8;
                books[8].owner = msg.sender;
                books[8].temporalOwner = msg.sender;
                books[8].purchasePrice = 10000000000000;
                books[8].lendingPrice = 5000000000000;
                bookIndex.push(books[8].bookId);
                
                books[9].bookId = 9;
                books[9].owner = msg.sender;
                books[9].temporalOwner = msg.sender;
                books[9].purchasePrice = 10000000000000;
                books[9].lendingPrice = 5000000000000;
                bookIndex.push(books[9].bookId);
                
                books[10].bookId = 10;
                books[10].owner = msg.sender;
                books[10].temporalOwner = msg.sender;
                books[10].purchasePrice = 10000000000000;
                books[10].lendingPrice = 5000000000000;
                bookIndex.push(books[10].bookId);
                
                books[11].bookId = 11;
                books[11].owner = msg.sender;
                books[11].temporalOwner = msg.sender;
                books[11].purchasePrice = 10000000000;
                books[11].lendingPrice = 5000000000;
                bookIndex.push(books[11].bookId);
                
                books[12].bookId = 12;
                books[12].owner = msg.sender;
                books[12].temporalOwner = msg.sender;
                books[12].purchasePrice = 10000000000;
                books[12].lendingPrice = 5000000000;
                bookIndex.push(books[12].bookId);
                
                books[13].bookId = 13;
                books[13].owner = msg.sender;
                books[13].temporalOwner = msg.sender;
                books[13].purchasePrice = 10000000000;
                books[13].lendingPrice = 5000000000;
                bookIndex.push(books[13].bookId);
                
                books[14].bookId = 14;
                books[14].owner = msg.sender;
                books[14].temporalOwner = msg.sender;
                books[14].purchasePrice = 10000000000;
                books[14].lendingPrice = 5000000000;
                bookIndex.push(books[14].bookId);
                
                books[15].bookId = 15;
                books[15].owner = msg.sender;
                books[15].temporalOwner = msg.sender;
                books[15].purchasePrice = 10000000000;
                books[15].lendingPrice = 5000000000;
                bookIndex.push(books[15].bookId);
                
                books[16].bookId = 16;
                books[16].owner = msg.sender;
                books[16].temporalOwner = msg.sender;
                books[16].purchasePrice = 10000000000;
                books[16].lendingPrice = 5000000000;
                bookIndex.push(books[16].bookId);
                
                books[17].bookId = 17;
                books[17].owner = msg.sender;
                books[17].temporalOwner = msg.sender;
                books[17].purchasePrice = 10000000000;
                books[17].lendingPrice = 5000000000;
                bookIndex.push(books[17].bookId);
                
                books[18].bookId = 18;
                books[18].owner = msg.sender;
                books[18].temporalOwner = msg.sender;
                books[18].purchasePrice = 10000000000;
                books[18].lendingPrice = 5000000000;
                bookIndex.push(books[18].bookId);
                
                books[19].bookId = 19;
                books[19].owner = msg.sender;
                books[19].temporalOwner = msg.sender;
                books[19].purchasePrice = 10000000000;
                books[19].lendingPrice = 5000000000;
                bookIndex.push(books[19].bookId);


        // fin inicialización datos.
    }

}


import {bookCounters} from "../libraries/bookCounters.sol";

contract Libreria is LibreriaData {

    bookCounters.Counters private counters;

    address private owner;
    bool private stopped = false;

// ============================= START MODIFIERS ============================= //

    modifier checkId (uint256 _id) {
        require(books[_id].bookId != _id, "Book already exists");
        _;

    }

    modifier checkPurchasePrice (uint _id) {
        require(msg.value >= books[_id].purchasePrice, "Transfer is not enougth to purchase this book");
        _;

    }

    modifier checkLendingPrice (uint _id) {
        require(msg.value >= books[_id].lendingPrice, "Transfer is not enougth to borrow this book");
        _;

    }

    modifier stopInEmergency {
        if (!stopped)
        _;
    }

    modifier onlyInEmergency {
        if (stopped)
        _;
    }

// =============================  END MODIFIERS  ============================= //

// ============================= START FUNCTIONS ============================= //

    // Funcion para activar o desactivar el contrato. Solo disponible para el owner del contrato.
    function switchOnOff() public {
        if (msg.sender == owner) {
            stopped = !stopped;
        }
    }

    // Funcion para la compra de un libro. Se requiere el id del libro y el precio de compra.
    function buyBook(uint256 _id) public payable checkPurchasePrice(_id) stopInEmergency {


        books[_id].owner.transfer(books[_id].purchasePrice);
        books[_id].owner = msg.sender;
        bookCounters.incSellsCounter(counters);


    }

    //Funcion para ver el contador de ventas de libros de la libreria.
    function verVentas( )
    public
    view
    returns (uint256)
    {

        uint256 sellscounter = bookCounters.viewSellsCounter(counters);
        return sellscounter;

    }

    // Funcion para efectuar el prestamo de un libro. Se requiere el id del libro y el precio de alquiler.
    function lendBook(uint256 _id) public payable stopInEmergency{

        books[_id].owner.transfer(books[_id].lendingPrice);
        books[_id].temporalOwner = msg.sender;

    }

    // Funcion para efectuar la devolución de un libro. Se requiere el id del libro.
    function returnBook(uint256 _id) public payable stopInEmergency{
        books[_id].temporalOwner = books[_id].owner;

    }

    function getBookIndex() public view returns (uint256[] memory){
        return bookIndex;
    }

    // Funcion para agregar un libro dentro del array de libros.
    /*function addBook(uint256 _id, uint256 pPrice, uint256 lPrice) public checkId(_id) stopInEmergency {

        books[_id].bookId = _id;
        books[_id].owner = store;
        books[_id].purchasePrice = pPrice;
        books[_id].lendingPrice = lPrice;
    }*/

// =============================  END FUNCTIONS  ============================= //

}