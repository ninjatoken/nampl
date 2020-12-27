const uFragments = artifacts.require("uFragments");
const Orch = artifacts.require("Orchestrator");
const Policy = artifacts.require("UFragmentsPolicy");
const FS = require("fs");
const DEPLOY_CONFIG_FILE = process.env.DEPLOY_CONFIG;

module.exports = function (deployer) {
  deployer.then(async()=>{
    
    // deployer.deploy(NamplCrowdSale);
    let configFile = FS.readFileSync(DEPLOY_CONFIG_FILE,{flag:'r'});
    let config  = JSON.parse(configFile);

    let envIndex = process.argv.indexOf("--env");
    let deployEnv = process.argv[ envIndex+ 1];
    
    console.log("deploy env:"+deployEnv);

    await deployer.deploy(uFragments);
    await deployer.deploy(Policy);
    await deployer.deploy(Orch, Policy.address);

    let coinOwner = config[deployEnv].coinOwner;
    let policyOwner = config[deployEnv].policyOwner;
    
    console.log("coinOwner:"+coinOwner);
    console.log("policyOwner:"+policyOwner);

    let nampl = await uFragments.deployed();
    await nampl.initialize(coinOwner);

    let policy = await Policy.deployed();
                                                     //1.0  -  -  -  -  -  -
    await policy.initialize(policyOwner, nampl.address, "1000000000000000000");

  });
  
  
};
