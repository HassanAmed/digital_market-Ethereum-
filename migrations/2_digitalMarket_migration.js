const digitalMarket = artifacts.require("digitalMarket");

module.exports = function(deployer){
    deployer.deploy(digitalMarket);
};