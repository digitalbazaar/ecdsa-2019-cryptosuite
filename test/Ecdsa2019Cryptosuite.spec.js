/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import {expect} from 'chai';

import jsigs from 'jsonld-signatures';
const {purposes: {AssertionProofPurpose}} = jsigs;

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
    });
  });

  describe('createVerifier()', () => {
    it('should create a verifier with Ed25519 Multikey', async () => {
    });

    it('should create a verifier with Ed25519VerificationKey2020', async () => {
    });

    it('should create a verifier with Ed25519VerificationKey2018', async () => {
    });

    it('should fail to create a verifier w/ unsupported key type', async () => {
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
