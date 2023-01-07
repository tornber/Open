const Employer = artifacts.require('Employer.sol');
// const Storage = artifacts.require('Storage.sol')

module.exports = function(deployer) {
    deployer.deploy(Employer,"Amazon")
    // deployer.deploy(Storage)
}