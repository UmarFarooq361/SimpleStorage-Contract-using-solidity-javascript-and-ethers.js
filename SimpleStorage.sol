// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SimpleStorage {
    uint public number;

    function store(uint _number) public virtual {
        number = _number;
    }

    struct People {
        string name;
        uint numbers;
    }
    mapping(string => uint) public nameTofavNumber;
    People[] public people;

    function addPerson(string memory _name, uint _numbers) public {
        people.push(People(_name, _numbers));
        nameTofavNumber[_name] = _numbers;
    }

    function retrieve() public view returns (uint) {
        return number;
    }

    // different way to add data into struct of array
    // function addPersonMethod1(string memory _name, uint _numbers) public{
    //     People memory newpeople = People({name : _name, numbers : _numbers});
    //     people.push((newpeople));
    // }
    // function addPersonMethod2(string memory _name, uint _numbers) public{
    //     People memory newspeople = People(_name, _numbers);
    //     people.push((newspeople));
    // }
}
