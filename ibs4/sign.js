const xmlConverter = require('xml-js');
const rsa = require('js-crypto-rsa');
const fs = require('fs');
const {removeJsonTextAttribute} = require('../utils');

const keysFile = process.argv[3] || './keys.xml'

const {keys: {privateKey}} = JSON.parse(
    xmlConverter.xml2json(fs.readFileSync(keysFile, 'utf8'), {compact: true, textFn: removeJsonTextAttribute})
)

const fileToSign = fs.readFileSync('./ibs4/text.txt')

rsa.sign(
  fileToSign,
  privateKey,
  'SHA-256',
  {
    name: 'RSA-PSS',
    saltLength: 64
  }
  ).then( (signature) => {
    fs.writeFileSync('./ibs4/signature.txt', signature)

    console.log('signature is created')
})