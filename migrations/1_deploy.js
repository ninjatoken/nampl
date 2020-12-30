const uFragments = artifacts.require("uFragments");
const Orch = artifacts.require("Orchestrator");
const Policy = artifacts.require("UFragmentsPolicy");
const FS = require("fs");
const DEPLOY_CONFIG_FILE = process.env.DEPLOY_CONFIG;
const web3 = require("web3");

module.exports = function (deployer) {
  deployer.then(async()=>{

    if(!DEPLOY_CONFIG_FILE){
      console.error('deploy config file paht is not specified.');
      return;
    }

    // deployer.deploy(NamplCrowdSale);
    let configFile = FS.readFileSync(DEPLOY_CONFIG_FILE,{flag:'r'});
    let config  = JSON.parse(configFile);

    let envIndex = process.argv.indexOf("--env");
    let deployEnv = process.argv[ envIndex+ 1];
    
    console.log("deploy env:"+deployEnv);

    await deployer.deploy(uFragments);
    await deployer.deploy(Policy);
    await deployer.deploy(Orch);

    let coinOwner = config[deployEnv].coinOwner;
    let policyOwner = config[deployEnv].policyOwner;
    
    console.log("coinOwner:"+coinOwner);
    console.log("policyOwner:"+policyOwner);

    let nampl = await uFragments.deployed();
    let policy = await Policy.deployed();
    let orch = await Orch.deployed();

    console.log("nampl.address:"+nampl.address);
    console.log("policy.address:"+policy.address);
    console.log("orch.address:"+orch.address);

    await nampl.initialize(policyOwner);
    await nampl.setMonetaryPolicy(policy.address);
    
    
    await policy.initialize(policyOwner, nampl.address, web3.utils.toBN("111683333333333337120"));
    await policy.setOrchestrator(orch.address);

    await orch.initialize(policyOwner, policy.address);

  });
  
  
};
