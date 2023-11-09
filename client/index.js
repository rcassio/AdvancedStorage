import Web3 from 'web3';
import AdvanceStorage from '../build/contracts/AdvancedStorage.json';

let web3;
let advancedStorage;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            window.ethereum.enable()
            .then(() => {
                resolve(
                    new Web3(window.ethereum)
                );
            })
            .catch(e => {
                reject(e);
            });
            return;
        }
        //Case 2: no metamask present, just connect to Ganache
        if(typeof window.web3 !== 'undefined') {
            return resolve(
              new Web3(window.web3.currentProvider)
            );
          }
          resolve(new Web3('http://localhost:9545'));
    });
};

const initContract = () => {
    const deploymentKey = Object.keys(
        AdvanceStorage.networks
    )[0];
    return new web3.eth.Contract(
        AdvanceStorage.abi,
        AdvanceStorage
        .networks[deploymentKey]
        .address
    );
};

const initApp = () => {
    const $addData = document.getElementById('addData');
    const $data = document.getElementById('data');
    let accounts = [];

    web3.eth.getAccounts()
    .then(_accounts => {
        accounts = _accounts;
        return advancedStorage.methods
        .getAll()
        .call();
    })
    .then(result => {
        $data.innerHTML = result.join(', ');
    });

    $addData.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = e.target.elements[0].value;
        advancedStorage.methods
        .add(data)
        .send({from: accounts[0]})
        .then(result => {
            return advancedStorage.methods
            .getAll()
            .call();
        })
        .then( result => {
            $data.innerHTML = result.join(', ');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
    .then(_web3 => {
        web3 = _web3;
        advancedStorage = initContract();
        initApp();
    })
    .catch(e => console.log(e.message));
});