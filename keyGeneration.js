const rsa = require('js-crypto-rsa');
const xmlConverter = require('xml-js');
const fs = require('fs');

const keysFile = process.argv[2] || './ibs3/keys.xml'

rsa.generateKey(2048)
    .then( (keys) => {
        fs.writeFileSync(keysFile, xmlConverter.json2xml({ keys }, {compact: true, spaces: 4}))

        console.log('KEYS ARE GENERATED AND STORED INTO ' + keysFile)
    })