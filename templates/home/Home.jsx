import React, { useEffect, useState } from "react";
import Web3 from "web3";

import StackToken from "../../abis/StackToken.json";
import RewardsToken from "../../abis/RewardsToken.json";
import DefiToken from "../../abis/DefiToken.json";

import { CardComponent } from "../../components/card/Card";
import styles from "./Home.module.css";

import stacking from "/public/images/stacking.png";
import rewards from "/public/images/rewards.png";

export const HomeTemplate = () => {
  const [loading, setLoading] = useState();
  const [account, setAccount] = useState();
  const [stackingToken, setStackingToken] = useState();
  const [stackingTokenBalance, setStackingTokenBalance] = useState();

  const [rewardsToken, setRewardsToken] = useState();
  const [rewardsTokenBalance, setRewardsTokenBalance] = useState();

  const [defiToken, setDefiToken] = useState();
  const [defiTokenBalance, setDefiTokenBalance] = useState();

  async function loadweb3() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Deberías considerar usar Metamask!");
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();

    const networkId = await web3.eth.net.getId();

    // Carga de los SmartContract - StackToken
    const stackingTokenData = StackToken.networks[networkId];
    if (stackingTokenData) {
      const stackingTokenC = new web3.eth.Contract(
        StackToken.abi,
        stackingTokenData.address
      );
      setStackingToken(stackingTokenC);
      const stackingTokenBalance = await stackingTokenC.methods
        .balanceOf(accounts[0])
        .call();
      setStackingTokenBalance(stackingTokenBalance);
    }

    const rewardsTokenData = RewardsToken.networks[networkId];
    if (rewardsTokenData) {
      const rewardsTokenC = new web3.eth.Contract(
        RewardsToken.abi,
        rewardsTokenData.address
      );
      setRewardsToken(rewardsTokenC);
      const rewardsTokenBalance = await rewardsTokenC.methods
        .balanceOf(accounts[0])
        .call();
      setRewardsTokenBalance(rewardsTokenBalance);
    }

    const defiTokenData = DefiToken.networks[networkId];
    if (defiTokenData) {
      const defiTokenC = new web3.eth.Contract(
        DefiToken.abi,
        defiTokenData.address
      );
      setDefiToken(defiTokenC);
      const defiTokenBalance = await defiTokenC.methods
        .stakingBalance(accounts[0])
        .call();
      setDefiTokenBalance(defiTokenBalance);
    }
  }

  useEffect(() => {
    loadweb3();
    loadBlockchainData();
  }, []);

  const stakeToken = (amount) => {
    setLoading(true);
    stackingToken.methods
      .approve(defiToken._address, amount)
      .send({
        from: account,
      })
      .on("transactionHash", (hash) => {
        defiToken.methods.stakeTokens(amount).send({
          from: account,
        });
      })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };

  const unstakeToken = () => {
    setLoading(true);
    defiToken.methods
      .unstakeTokens()
      .send({
        from: account,
      })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };

  const handleStakeTokens = (value) => {
    const amount = window.web3.utils.toWei(value, "Ether");
    stakeToken(amount);
  };

  return (
    <div className={styles.container}>
      {stackingTokenBalance && (
        <CardComponent
          title="Stacking"
          text="Haz stacking"
          textBtn="Stake"
          textBtn2="Unstake"
          img={stacking}
          balance={stackingTokenBalance}
          handleStakeTokens={handleStakeTokens}
          handleUnstakeTokens={unstakeToken}
        />
      )}
      {rewardsTokenBalance && (
        <CardComponent
          title="Rewards"
          text="Retira tus rewards"
          textBtn="Stake"
          textBtn2="Unstake"
          img={rewards}
          balance={rewardsTokenBalance}
        />
      )}
    </div>
  );
};
