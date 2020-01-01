pragma solidity >=0.4.13 <0.6.0;
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
        string id;
        uint count;
        bool exists;
    }
    uint public readerCount;
    mapping (string => Reader) readerBase;

    struct Book {
        string title;
        string isbn;
        string author;
        uint price;
    }
    Book[] private bookBase;
  //  mapping (string => Book) bookBase;

    function registerAuthor(string memory _name, string memory _id, string memory _country) public {
        Author memory a1;

        a1.name = _name;
        a1.author_id = _id;
        a1.country = _country;
        a1.revenue = 0;
        a1.exists = true;

    authorBase[_id] = a1;
    }
    function registerReader(
        string memory _name,
        string memory _id) public {
        Reader memory r1;

        r1.name = _name;
        r1.id = _id;
        if (readerCount == 0) r1.count = 1;
        else r1.count = readerCount;
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
        bookBase.push(b1);
    }
    function getAuthorBooks (string memory authorName) public view  returns(string[] memory){
        uint itr;
        uint itr2;
        string[] memory bookList;
        for(itr; itr <= bookBase.length; itr++) {
            if(keccak256(abi.encodePacked(bookBase[itr].author)) == keccak256(abi.encodePacked(authorName))){
                Book memory b1;
                b1 = bookBase[itr];
                bookList[itr2] = b1.title;
                itr2++;
            }
        
        }
        return bookList;
    }
    }