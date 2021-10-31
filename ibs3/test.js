const xmlConverter = require('xml-js');
const rsa = require('js-crypto-rsa');
const fs = require('fs');
const {removeJsonTextAttribute} = require('../utils');

const keysFile = process.argv[3] || './keys.xml'

const {keys: {publicKey, privateKey}} = JSON.parse(
    xmlConverter.xml2json(fs.readFileSync(keysFile, 'utf8'), {compact: true, textFn: removeJsonTextAttribute})
)

const fileToEncript = fs.readFileSync('./ibs3/text.txt')

rsa.encrypt(
    fileToEncript,
    publicKey,
    'SHA-256',
    ).then( (encrypted) => {
      fs.writeFileSync('./ibs3/encripted.txt', encrypted)

      console.log('-----------encrypted')
      console.log(fs.readFileSync('./ibs3/encripted.txt', 'utf8'))
      console.log('\n')

      return rsa.decrypt(
        encrypted,
        privateKey,
        'SHA-256',
      );  
  }).then( (decrypted) => {
    fs.writeFileSync('./ibs3/decrypted.txt', decrypted)

    console.log('-----------decrypted')
    console.log(fs.readFileSync('./ibs3/decrypted.txt', 'utf8'))
  });