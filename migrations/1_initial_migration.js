const DefiToken = artifacts.require("DefiToken");
const StackToken = artifacts.require("StackToken");
const RewardsToken = artifacts.require("RewardsToken");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(StackToken);
  const stackToken = await StackToken.deployed();

  await deployer.deploy(RewardsToken);
  const rewardsToken = await RewardsToken.deployed();

  await deployer.deploy(DefiToken, stackToken.address, rewardsToken.address);
  const defiToken = await DefiToken.deployed();

  // Transferrir Rewards token a DefiToken
  await rewardsToken.transfer(defiToken.address, "1000000000000000000000000");

  // Transferrir Stacking token a DefiToken
  await stackToken.transfer(accounts[1], "100000000000000000000");
};
