const xmlConverter = require('xml-js');
const rsa = require('js-crypto-rsa');
const fs = require('fs');
const {removeJsonTextAttribute} = require('../utils');

const keysFile = process.argv[3] || './keys.xml'

const {keys: {publicKey}} = JSON.parse(
    xmlConverter.xml2json(fs.readFileSync(keysFile, 'utf8'), {compact: true, textFn: removeJsonTextAttribute})
)

const sign = fs.readFileSync('./ibs4/signature.txt')
const file = fs.readFileSync('./ibs4/text.txt')

rsa.verify(
    file,
    sign,
    publicKey,
    'SHA-256',
      { // optional
        name: 'RSA-PSS', // default. 'RSASSA-PKCS1-v1_5' is also available.
        saltLength: 64 // default is the same as hash length
      } 
    ).then( (valid) => {
        console.log(valid ? 'is valid' : 'isnt valid')
      });