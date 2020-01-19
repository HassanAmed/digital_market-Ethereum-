pragma solidity >=0.4.17 <0.6.0;
pragma experimental ABIEncoderV2;

contract digitalMarket {
    struct Author {
        string name;
        string author_id;
        string country;
        uint   revenue;
        bool exists;
    }
    uint public authorCount;
    mapping (string => Author) authorBase;
    
    struct Reader {
        string name;
        string readerId;
        uint count;
        bool exists;
    }
    uint public readerCount;
    mapping (string => Reader) readerBase;

    struct Book {
        string title;
        string isbn;
        string author;
        string author_id;
        uint price;
    }
    uint public bookCount;
    Book[] private bookBase;
    struct Book2 {
        string title;
        string isbn;
        string author;
        uint price;
        string reader;
    }
    Book2[] private bookBase2;
  //  mapping (string => Book) bookBase;

    function registerAuthor(string memory _name, string memory _id, string memory _country) public {
        Author memory a1;

        a1.name = _name;
        a1.author_id = _id;
        a1.country = _country;
        a1.revenue = 0;
        a1.exists = true;

    authorBase[_id] = a1;
    authorCount++;
    }
    function registerReader(
        string memory _name,
        string memory _id) public {
        Reader memory r1;

        r1.name = _name;
        r1.readerId = _id;
        r1.count = readerCount + 1;
        r1.exists = true;

        readerBase[_id] = r1;
        readerCount++;
        }

    function publishBook(
        string memory _title,
        string memory _isbn,
        uint  _price,
        string memory _author_id
        ) public {
        if(authorBase[_author_id].exists == false) {
            revert('Author id  is not registered');  
        }
        Book memory b1;
        b1.title = _title;
        b1.isbn = _isbn;
        b1.price = _price;
        b1.author = authorBase[_author_id].name;
        b1.author_id = _author_id;
        bookBase.push(b1);
        bookCount++;
    }

    function getAuthorBooks() public view returns(Book[] memory){
        return bookBase;
        
    }
    function purchaseBook(
        string memory _title,
        string memory _readerId

        ) public returns(uint) {
        if(readerBase[_readerId].exists == false) {
            revert('Reader id  is not registered');  
        }
        uint itr;
        for(itr; itr <= bookBase.length; itr++) {
            if(keccak256(abi.encodePacked(bookBase[itr].title)) == keccak256(abi.encodePacked(_title))){
                Book2 memory b2;
                b2.title = bookBase[itr].title;
                b2.isbn = bookBase[itr].isbn;
                b2.author = bookBase[itr].author;
                b2.price = bookBase[itr].price;
                b2.reader = readerBase[_readerId].name;
                bookBase2.push(b2);
                uint rev = payAuthor(bookBase[itr].author_id, b2.price);
                return(rev);
            }
            }
            revert('Title did not match. No book with such name found');
    }
    function getReaderBooks() public view returns(Book2[] memory){
        return bookBase2;
        
    }
    function payAuthor(string memory _author_id, uint price) internal returns
    (uint){
         authorBase[_author_id].revenue = authorBase[_author_id].revenue + price;
         return authorBase[_author_id].revenue;
    }
    function getAuthor(string memory _key) public view returns(Author memory){
        return authorBase[_key];    
    }
    function getReader(string memory _key) public view returns(Reader memory) {
        return readerBase[_key];
    }
    function resellBook(string memory _title,
                        string memory _reader,
                        string memory prevOwnerID,
                        string memory newOwnerID )
                        public returns(uint){
        if(readerBase[prevOwnerID].exists == false || readerBase[newOwnerID].exists == false) {
            revert('Reader id  is not registered');  
        }
        uint itr;
        for(itr; itr <= bookBase2.length; itr++) {
            if((keccak256(abi.encodePacked(bookBase2[itr].title)) == keccak256(abi.encodePacked(_title)))
            &&  keccak256(abi.encodePacked(bookBase2[itr].reader)) == keccak256(abi.encodePacked(_reader))){
                bookBase2[itr].reader = readerBase[newOwnerID].name;
                uint depPrice = depreciate(bookBase2[itr].price);
                bookBase2[itr].price = depPrice;
                return(depPrice);
            }
        }
        revert('Reader does not own book with provided title - Invalid params provided');
}
    function depreciate(uint price) internal pure returns (uint) {
        return ((price*90)/100);
    }
}