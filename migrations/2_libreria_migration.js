const bookCounters = artifacts.require("../libraries/bookCounters");
const Libreria = artifacts.require("Libreria");

module.exports = function(deployer) {
  deployer.deploy(bookCounters);
  deployer.link(bookCounters, Libreria);
  deployer.deploy(Libreria);
};
