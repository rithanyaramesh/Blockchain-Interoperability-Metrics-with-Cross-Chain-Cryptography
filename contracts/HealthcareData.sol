// contracts/HealthcareData.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareData {
    struct Patient {
        string name;
        uint256 age;
        string medicalHistory;
    }

    mapping(address => Patient) public patients;

    function addPatientData(string memory _name, uint256 _age, string memory _medicalHistory) public {
        patients[msg.sender] = Patient(_name, _age, _medicalHistory);
    }

    function getPatientData(address _patient) public view returns (string memory, uint256, string memory) {
        Patient memory patient = patients[_patient];
        return (patient.name, patient.age, patient.medicalHistory);
    }
}
