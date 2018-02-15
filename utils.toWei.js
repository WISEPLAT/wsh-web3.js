var chai = require('chai');
var utils = require('../lib/utils/utils');
var assert = chai.assert;

describe('lib/utils/utils', function () {
    describe('toWei', function () {
        it('should return the correct value', function () {
            
            assert.equal(utils.toWei(1, 'wei'),    '1');
            assert.equal(utils.toWei(1, 'kwei'),   '1000');
            assert.equal(utils.toWei(1, 'Kwei'),   '1000');
            assert.equal(utils.toWei(1, 'babbage'),   '1000');
            assert.equal(utils.toWei(1, 'mwei'),   '1000000');
            assert.equal(utils.toWei(1, 'Mwei'),   '1000000');
            assert.equal(utils.toWei(1, 'lovelace'),   '1000000');
            assert.equal(utils.toWei(1, 'gwei'),   '1000000000');
            assert.equal(utils.toWei(1, 'Gwei'),   '1000000000');
            assert.equal(utils.toWei(1, 'shannon'),   '1000000000');
            assert.equal(utils.toWei(1, 'szabo'),  '1000000000000');
            assert.equal(utils.toWei(1, 'finney'), '1000000000000000');
            assert.equal(utils.toWei(1, 'wise'),  '1000000000000000000');
            assert.equal(utils.toWei(1, 'kwise'), '1000000000000000000000');
            assert.equal(utils.toWei(1, 'grand'),  '1000000000000000000000');
            assert.equal(utils.toWei(1, 'mwise'), '1000000000000000000000000');
            assert.equal(utils.toWei(1, 'gwise'), '1000000000000000000000000000');
            assert.equal(utils.toWei(1, 'twise'), '1000000000000000000000000000000');

            assert.equal(utils.toWei(1, 'kwei'),    utils.toWei(1, 'femtowise'));
            assert.equal(utils.toWei(1, 'szabo'),   utils.toWei(1, 'microwise'));
            assert.equal(utils.toWei(1, 'finney'),  utils.toWei(1, 'milliwise'));
            assert.equal(utils.toWei(1, 'milli'),    utils.toWei(1, 'milliwise'));
            assert.equal(utils.toWei(1, 'milli'),    utils.toWei(1000, 'micro'));

            assert.throws(function () {utils.toWei(1, 'wei1');}, Error);
        });
    });
});
