var chai = require('chai');
var Web3 = require('../index');
var web3 = new Web3();
var testMethod = require('./helpers/test.method.js');

var method = 'getCode';


var tests = [{
    args: ['0x47d33b27bb249a2dbab4c0612bf9caf4c1950855'],
    formattedArgs: ['0x47d33b27bb249a2dbab4c0612bf9caf4c1950855', web3.wsh.defaultBlock],
    result: '0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855',
    formattedResult: '0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855',
    call: 'wsh_'+ method
},{
    args: ['0x47d33b27bb249a2dbab4c0612bf9caf4c1950855', 2],
    formattedArgs: ['0x47d33b27bb249a2dbab4c0612bf9caf4c1950855', '0x2'],
    result: '0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855',
    formattedResult: '0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855',
    call: 'wsh_'+ method
}];

testMethod.runTests('wsh', method, tests);

