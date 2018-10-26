pragma solidity ^0.4.23;

library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal  pure returns (uint256) {
    uint256 c = a / b;
    return c;
  }

  function sub(uint256 a, uint256 b) internal  pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure  returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

contract Owned {

  address public owner;
  address newOwner;

  modifier only(address _allowed) {
    require(msg.sender == _allowed, "Not authorized");
    _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function transferOwnership(address _newOwner) public only(owner) {
    newOwner = _newOwner;
  }

  function acceptOwnership() public only(newOwner) {
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

  event OwnershipTransferred(address indexed _from, address indexed _to);

}

contract ERC20 is Owned {
  using SafeMath for uint;

  uint public totalSupply;
  mapping (address => uint) balances;
  event Transfer(address indexed _from, address indexed _to, uint _value);

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}

contract Token is ERC20 {
  using SafeMath for uint;

  string public name;
  string public symbol;
  uint8 public decimals;

  constructor(string _name, string _symbol, uint8 _decimals) public {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
  }

  function mint(address _to, uint _amount) public only(owner) returns(bool) {
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    emit Transfer(msg.sender, _to, _amount);
    return true;
  }
}