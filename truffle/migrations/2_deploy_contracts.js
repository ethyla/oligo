const FakeDai = artifacts.require("FakeDai");
const Timelock = artifacts.require("Timelock");
const GovernorAlpha = artifacts.require("GovernorAlpha");
const Uni = artifacts.require("Uni");
const VoteBuy = artifacts.require("VoteBuy");
const VoteVault = artifacts.require("VoteVault");

module.exports = async function (deployer) {
  let main = "0x6F1c50e76a5aE39CccbDc4425AB6e8cda26690CD";
  // Needed because the first promise return is always empty (truffle bug?)
  await deployer.deploy(FakeDai);
  let dai = await deployer.deploy(FakeDai);
  let timelock = await deployer.deploy(Timelock, main, 1000000);
  let uni = await deployer.deploy(Uni, main, main, 1603395158);
  let governor = await deployer.deploy(
    GovernorAlpha,
    timelock.address,
    uni.address
  );

  let votevault = await deployer.deploy(
    VoteVault,
    uni.address,
    governor.address,
    main
  );

  await deployer.deploy(
    VoteBuy,
    governor.address,
    votevault.address,
    dai.address
  );
};
