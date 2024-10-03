const { expect } = require("chai");

describe("HealthcareData and AtomicSwap", function () {
  let healthcare, atomicSwap;
  let owner, receiver;

  beforeEach(async function () {
    [owner, receiver] = await ethers.getSigners();

    const Healthcare = await ethers.getContractFactory("HealthcareData");
    healthcare = await Healthcare.deploy();
    //await healthcare.deployed();

    const AtomicSwap = await ethers.getContractFactory("AtomicSwap");
    atomicSwap = await AtomicSwap.deploy();
    //await atomicSwap.deployed();
  });

  it("Should add and retrieve patient data", async function () {
    await healthcare.addPatientData("John Doe", 40, "No medical issues");
    const patientData = await healthcare.getPatientData(owner.address);
    expect(patientData.name).to.equal("John Doe");
    expect(patientData.age).to.equal(40);
  });

  it("Should create and complete an atomic swap", async function () {
    const secret = "mySecret";
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(secret));

    await atomicSwap.createSwap(hash, receiver.address, "Patient record data");
    await atomicSwap.connect(receiver).completeSwap(hash, secret);

    const swap = await atomicSwap.swaps(hash);
    expect(swap.completed).to.equal(true);
  });
});
