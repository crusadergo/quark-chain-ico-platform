var Token = artifacts.require("./Token.sol");

contract('Token', function() {
  it("should send parameters with constructor", async function() {
    const instance = await Token.deployed();
    const name = await instance.name.call();
    const symbol = await instance.symbol.call();
    const decimals = await instance.decimals.call();
    assert.equal(name, 'Some coin');
    assert.equal(symbol, 'SMCN');
    assert.equal(decimals, 18);
  });
});

