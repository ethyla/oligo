/* global ethers, task */

require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// require("dotenv").config({path: "../.env"});
// const mnemonic = process.env["MNEMONIC"];
// const infuraKey = process.env["VUE_APP_INFURA_API"];
// `https://goerli.infura.io/v3/` + infuraKey

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.0",
      },
      {
        version: "0.7.4",
        settings: {},
      },
    ],
  },
};
