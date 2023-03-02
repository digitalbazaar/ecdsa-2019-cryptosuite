/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import {expect} from 'chai';

import jsigs from 'jsonld-signatures';
const {purposes: {AssertionProofPurpose}} = jsigs;

import * as EcdsaMultikey from '@digitalbazaar/ecdsa-multikey';
import {
  credential,
  ecdsaMultikeyKeyPair,
  ecdsaSecp256KeyPair,
  ecdsaSecp384KeyPair,
  ecdsaSecp521KeyPair
} from './mock-data.js';
import {DataIntegrityProof} from '@digitalbazaar/data-integrity';
import {cryptosuite as ecdsa2019Cryptosuite} from '../lib/index.js';

import {loader} from './documentLoader.js';

const documentLoader = loader.build();

describe('Ecdsa2019Cryptosuite', () => {
  describe('exports', () => {
    it('it should have proper exports', async () => {
      should.exist(ecdsa2019Cryptosuite);
      ecdsa2019Cryptosuite.name.should.equal('ecdsa-2019');
      ecdsa2019Cryptosuite.requiredAlgorithm.should.equal('P-256');
      ecdsa2019Cryptosuite.canonize.should.be.a('function');
      ecdsa2019Cryptosuite.createVerifier.should.be.a('function');
    });
  });

  describe('canonize()', () => {
    it('should canonize using URDNA2015 w/ n-quads', async () => {
      const unsignedCredential = {...credential};

      let result;
      let error;
      try {
        result = await ecdsa2019Cryptosuite.canonize(
          unsignedCredential, {documentLoader});
      } catch(e) {
        error = e;
      }

      expect(error).to.not.exist;
      expect(result).to.exist;
      /* eslint-disable max-len */
      const expectedResult = `<http://example.edu/credentials/1872> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://schema.org#AlumniCredential> .
<http://example.edu/credentials/1872> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://www.w3.org/2018/credentials#VerifiableCredential> .
<http://example.edu/credentials/1872> <https://www.w3.org/2018/credentials#credentialSubject> <https://example.edu/students/alice> .
<http://example.edu/credentials/1872> <https://www.w3.org/2018/credentials#issuanceDate> "2010-01-01T19:23:24Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://example.edu/credentials/1872> <https://www.w3.org/2018/credentials#issuer> <https://example.edu/issuers/565049> .
<https://example.edu/students/alice> <https://schema.org#alumniOf> "Example University" .\n`;
      /* eslint-enable max-len */
      result.should.equal(expectedResult);
    });
  });

  describe('createVerifier()', () => {
    it('should create a verifier with ECDSA Multikey', async () => {
      let verifier;
      let error;
      try {
        verifier = await ecdsa2019Cryptosuite.createVerifier({
          verificationMethod: {...ecdsaMultikeyKeyPair}
        });
      } catch(e) {
        error = e;
      }
      expect(error).to.not.exist;
      expect(verifier).to.exist;
      verifier.algorithm.should.equal('ECDSA');
      verifier.id.should.equal('https://example.edu/issuers/565049#zDnaekGZTb' +
        'QBerwcehBSXLqAg6s55hVEBms1zFy89VHXtJSa9');
      verifier.verify.should.be.a('function');
    });

    it('should create a verifier with EcdsaSecp256r1VerificationKey2019',
    async () => {
      let verifier;
      let error;
      const keyPair = await EcdsaMultikey.from(ecdsaSecp256KeyPair);
      try {
        verifier = await ecdsa2019Cryptosuite.createVerifier({
          verificationMethod: keyPair
        });
      } catch(e) {
        error = e;
      }
      expect(error).to.not.exist;
      expect(verifier).to.exist;
      verifier.algorithm.should.equal('ECDSA');
      verifier.id.should.equal('https://example.edu/issuers/565049#zDnaekGZTb' +
        'QBerwcehBSXLqAg6s55hVEBms1zFy89VHXtJSa9');
      verifier.verify.should.be.a('function');
    });

    it('should create a verifier with EcdsaSecp384r1VerificationKey2019',
    async () => {
      let verifier;
      let error;
      const keyPair = await EcdsaMultikey.from(ecdsaSecp384KeyPair);
      try {
        verifier = await ecdsa2019Cryptosuite.createVerifier({
          verificationMethod: keyPair
        });
      } catch(e) {
        error = e;
      }
      expect(error).to.not.exist;
      expect(verifier).to.exist;
      verifier.algorithm.should.equal('ECDSA');
      verifier.id.should.equal('https://example.edu/issuers/565049#zDnaekGZTb' +
        'QBerwcehBSXLqAg6s55hVEBms1zFy89VHXtJSa9');
      verifier.verify.should.be.a('function');
    });

    it('should create a verifier with EcdsaSecp521r1VerificationKey2019',
    async () => {
      let verifier;
      let error;
      const keyPair = await EcdsaMultikey.from(ecdsaSecp521KeyPair);
      try {
        verifier = await ecdsa2019Cryptosuite.createVerifier({
          verificationMethod: keyPair
        });
      } catch(e) {
        error = e;
      }
      expect(error).to.not.exist;
      expect(verifier).to.exist;
      verifier.algorithm.should.equal('ECDSA');
      verifier.id.should.equal('https://example.edu/issuers/565049#zDnaekGZTb' +
        'QBerwcehBSXLqAg6s55hVEBms1zFy89VHXtJSa9');
      verifier.verify.should.be.a('function');
    });

    it('should fail to create a verifier w/ unsupported key type', async () => {
      let verifier;
      let error;
      const keyPair = await EcdsaMultikey.from(ecdsaSecp256KeyPair);
      keyPair.type = 'BadKeyType';
      try {
        verifier = await ecdsa2019Cryptosuite.createVerifier({
          verificationMethod: keyPair
        });
      } catch(e) {
        error = e;
      }
      expect(error).to.exist;
      expect(verifier).to.not.exist;
      error.message.should.equal('Unsupported key type "BadKeyType".');
    });
  });

  describe('sign() and verify()', () => {
    it('should fail to sign with undefined term', async () => {
    });

    it('should fail to sign with relative type URL', async () => {
    });

    it('should fail to sign with incorrect signer algorithm', async () => {
    });
  });

  describe('verify() multikey key type', () => {
    before(async () => {});

    it('should verify a document', async () => {
    });

    it('should fail verification if "proofValue" is not string', async () => {
    });

    it('should fail verification if "proofValue" is not given', async () => {
    });

    it('should fail verification if proofValue string does not start with "z"',
      async () => {});

    it('should fail verification if proof type is not DataIntegrityProof',
      async () => {});
  });
});
