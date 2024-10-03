// scripts/deploy.js
async function main() {
    const Healthcare = await ethers.getContractFactory("HealthcareData");
    const healthcare = await Healthcare.deploy();
    //await healthcare.deployed();
    console.log("HealthcareData deployed to:", healthcare.target);

    const AtomicSwap = await ethers.getContractFactory("AtomicSwap");
    const atomicSwap = await AtomicSwap.deploy();
    //await atomicSwap.deployed();
    console.log("AtomicSwap deployed to:", atomicSwap.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
