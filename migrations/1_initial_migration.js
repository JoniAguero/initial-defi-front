const DefiToken = artifacts.require("DefiToken");
const StackToken = artifacts.require("StackToken");
const RewardsToken = artifacts.require("RewardsToken");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(StackToken);
  const stackToken = await StackToken.deployed();

  await deployer.deploy(RewardsToken);
  const rewardsToken = await RewardsToken.deployed();

  await deployer.deploy(DefiToken, stackToken.address, rewardsToken.address);
  const defiToken = await RewardsToken.deployed();

  // Transferrir Rewards token a DefiToken
  rewardsToken.transfer(defiToken.address, "1000000000000000000000000");

  // Transferrir Stacking token a DefiToken
  stackToken.transfer(accounts[1], "100000000000000000000");
};
