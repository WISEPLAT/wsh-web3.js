var chai = require('chai');
var assert = chai.assert; 
var Web3 = require('../index.js');
var web3 = new Web3();
var u = require('./helpers/test.utils.js');

describe('web3.wsh', function() {
    describe('methods', function() {
        u.methodExists(web3.wsh, 'getBalance');
        u.methodExists(web3.wsh, 'getStorageAt');
        u.methodExists(web3.wsh, 'getTransactionCount');
        u.methodExists(web3.wsh, 'getCode');
        u.methodExists(web3.wsh, 'sendTransaction');
        u.methodExists(web3.wsh, 'call');
        u.methodExists(web3.wsh, 'getBlock');
        u.methodExists(web3.wsh, 'getTransaction');
        u.methodExists(web3.wsh, 'getUncle');
        u.methodExists(web3.wsh, 'getCompilers');
        u.methodExists(web3.wsh.compile, 'lll');
        u.methodExists(web3.wsh.compile, 'solidity');
        u.methodExists(web3.wsh.compile, 'serpent');
        u.methodExists(web3.wsh, 'getBlockTransactionCount');
        u.methodExists(web3.wsh, 'getBlockUncleCount');
        u.methodExists(web3.wsh, 'filter');
        u.methodExists(web3.wsh, 'contract');

        u.propertyExists(web3.wsh, 'coinbase');
        u.propertyExists(web3.wsh, 'mining');
        u.propertyExists(web3.wsh, 'gasPrice');
        u.propertyExists(web3.wsh, 'accounts');
        u.propertyExists(web3.wsh, 'defaultBlock');
        u.propertyExists(web3.wsh, 'blockNumber');
        u.propertyExists(web3.wsh, 'protocolVersion');
    });
});

