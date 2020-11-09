// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  //  let main = "0x6F1c50e76a5aE39CccbDc4425AB6e8cda26690CD";
  //   // Needed because the first promise return is always empty (truffle bug?)
  //   await deployer.deploy(FakeDai);
  //   let dai = await deployer.deploy(FakeDai);
  //   let timelock = await deployer.deploy(Timelock, main, 1000000);
  //   let uni = await deployer.deploy(Uni, main, main, 1603395158);
  //   let governor = await deployer.deploy(
  //     GovernorAlpha,
  //     timelock.address,
  //     uni.address
  //   );

  //   let votevault = await deployer.deploy(
  //     VoteVault,
  //     uni.address,
  //     governor.address,
  //     main
  //   );

  //   await deployer.deploy(
  //     VoteBuy,
  //     governor.address,
  //     votevault.address,
  //     dai.address
  //   );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
