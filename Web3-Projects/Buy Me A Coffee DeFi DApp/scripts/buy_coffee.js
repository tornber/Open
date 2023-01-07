// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

// return balance of given address
async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address)
    return hre.ethers.utils.formatEther(balanceBigInt)
}

// print balances of given list of addresses
async function printBalances(addresses) {
    let id = 0
    for(const address of addresses) {
      console.log(`address #${id} balance `,await getBalance(address))
      id++;
    }
}

// print memos stored on blockchain
async function printMemos(memos) {
    for(const memo of memos) {
      const timestamp = memo.timestamp
      const tipper = memo.name 
      const address = memo.address
      const message = memo.message
      console.log(`at ${timestamp} ${tipper} ${address} said: ${message}`)
    } 
}




async function main() {
  // get example accounts
  const [owner,tipper1,tipper2,tipper3] = await hre.ethers.getSigners()
  
  // get contract to deploy
  const BuyCoffeeContractFactory = await hre.ethers.getContractFactory('BuyMeACoffee') 
  
  // deploy contract
  const BuyCoffeeContract = await BuyCoffeeContractFactory.deploy()
  await BuyCoffeeContract.deployed()
  console.log("BuyMeACoffe contract deployed at",BuyCoffeeContract.address)

  // check balances before coffee purchase
  const addresses = [owner.address,tipper1.address,BuyCoffeeContract.address]
  console.log('== start ==')
  await printBalances(addresses)

  // buy a few coffees to owner
  const tip = {value: hre.ethers.utils.parseEther("1")}
  await BuyCoffeeContract.connect(tipper1).buyMeACoffee("a","message one",tip)
  await BuyCoffeeContract.connect(tipper2).buyMeACoffee("b","message two",tip)
  thirdTxn = await BuyCoffeeContract.connect(tipper3).buyMeACoffee("c","message three",tip)
  await thirdTxn.wait()

  // check balances after coffee purchase
  console.log("== bought coffee ==")
  await printBalances(addresses)

  // withdraw funds
  const withdrawTxn = await BuyCoffeeContract.connect(owner).withdrawTips()
  await withdrawTxn.wait()

  // check balance after withdraw
  console.log("== after withdraw tips ==")
  await printBalances(addresses)

  // read all memos
  console.log("== memos ==")
  await printMemos(await BuyCoffeeContract.getMemos())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
