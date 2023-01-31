// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./StackToken.sol";
import "./RewardsToken.sol";

contract DefiToken {
    // Declaraciones iniciales
    string public name = "Defitoken";
    address public owner;
    StackToken public stackToken;
    RewardsToken public rewardsToken;

    // Estructuras de datos
    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    // Constructor
    constructor(StackToken _stackToken, RewardsToken _rewardsToken) {
        stackToken = _stackToken;
        rewardsToken = _rewardsToken;
        owner = msg.sender;
    }

    // Stake de tokens
    function stakeTokens(uint256 _amount) public {
        // Se require una cantidad superior a 0
        require(_amount > 0, "La cantidad no puede ser menor a 0");
        // Transferir tokens JAM al Smart Contract principal
        stackToken.transferFrom(msg.sender, address(this), _amount);
        // Actualizar el saldo del staking
        stakingBalance[msg.sender] += _amount;
        // Guardar el staker
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // Actualizar el estado del staking
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Quitar el staking de los tokens
    function unstakeTokens() public {
        // Saldo del staking de un usuario
        uint256 balance = stakingBalance[msg.sender];
        // Se require una cantidad superior a 0
        require(balance > 0, "El balance del staking es 0");
        // Transferencia de los tokens al usuario
        stackToken.transfer(msg.sender, balance);
        // Resetea el balance de staking del usuario
        stakingBalance[msg.sender] = 0;
        // Actualizar el estado del staking
        isStaking[msg.sender] = false;
    }

    // Emision de Tokens (recompensas)
    function issueTokens() public {
        // Unicamente ejecutable por el owner
        require(msg.sender == owner, "No eres el owner");
        // Emitir tokens a todos los stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                rewardsToken.transfer(recipient, balance);
            }
        }
    }
}
