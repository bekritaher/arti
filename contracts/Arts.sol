// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;



contract Arts {
  address public owner = msg.sender;

  struct Art {
     string id;
    string titre;
    string description;
    string date;
    string image;
    uint256 price;
    address owner;
  }


uint256  TOTAL_ARTS=0;
Art[] public arts;





  constructor() { }
  




  function mintArt(string memory id,string memory titre ,string memory description,string memory date,string memory image,uint256 price,address utilisateur ) public  
  {
Art memory art; 
art.id=id;
art.titre=titre;
art.description=description;
art.date=date;
art.image=image;
art.price=price;
art.price=1e17;
art.owner=utilisateur;
arts.push(art);
TOTAL_ARTS++;
  }



  function buyArt(string memory id)  external payable  {
    // require(_index < TOTAL_ARTS && _index >= 0);
 
    
     for(uint i=0; i<arts.length; i++){
       if (keccak256(abi.encodePacked(arts[i].id))==keccak256(abi.encodePacked(id))){
         require(msg.value >= arts[i].price);
        payable(arts[i].owner).transfer(1e17);
        
         arts[i].owner = msg.sender;
          
     
       }
      }
  }
  
}