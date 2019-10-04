'use strict';

const fs = require('fs');
const { IamAuthenticator } = require('../../auth');
const CompareComply = require('../../compare-comply/v1');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

describe('compare comply integration', () => {
  const options = authHelper.auth.compareComply;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const compareComply = new CompareComply(options);
  describe('html conversion @slow', () => {
    test('convertToHtml', done => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
      };
      compareComply.convertToHtml(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.html).toBeTruthy();
        done();
      });
    });
  });

  describe('elementClassification', () => {
    test('classifyElements @slow', done => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
        filename: 'TestTable.pdf',
      };
      compareComply.classifyElements(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.document).toBeTruthy();
        expect(result.model_id).toBeTruthy();
        expect(result.model_version).toBeTruthy();
        expect(result.elements).toBeTruthy();
        expect(result.tables).toBeTruthy();
        expect(result.document_structure).toBeTruthy();
        expect(result.parties).toBeTruthy();
        expect(result.effective_dates).toBeTruthy();
        expect(result.termination_dates).toBeTruthy();
        expect(result.contract_amounts).toBeTruthy();
        done();
      });
    }, 10000);
  });

  describe('tables', () => {
    test('extractTables @slow', done => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
        filename: 'TestTable.pdf',
      };
      compareComply.extractTables(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.document).toBeTruthy();
        expect(result.model_id).toBeTruthy();
        expect(result.model_version).toBeTruthy();
        expect(result.tables).toBeTruthy();
        done();
      });
    }, 10000);
  });

  describe('comparison', () => {
    test('compareDocuments @slow', done => {
      jest.setTimeout(7000); // this test usually takes just under 7 seconds
      const params = {
        file1: fs.createReadStream(__dirname + '/../resources/contract_A.pdf'),
        file1Filename: 'contract_A.pdf',
        file1Label: 'test-file-1',
        file2: fs.createReadStream(__dirname + '/../resources/contract_B.pdf'),
        file2Filename: 'contract_B.pdf',
        file2Label: 'test-file-2',
      };
      compareComply.compareDocuments(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.model_version).toBeTruthy();
        expect(result.documents).toBeTruthy();
        expect(result.aligned_elements).toBeTruthy();
        expect(result.model_id).toBeTruthy();
        expect(result.unaligned_elements).toBeTruthy();
        done();
      });
    });
  });

  describe('feedback', () => {
    let feedbackId;
    test('addFeedback', done => {
      const params = {
        comment: 'testing testing comments v2 - node sdk test',
        userId: 'user_id_123x',
        feedbackData: {
          feedback_type: 'element_classification',
          document: {
            hash: '',
            title: 'doc title',
          },
          model_id: 'contracts',
          model_version: '11.00',
          location: {
            begin: '214',
            end: '237',
          },
          text:
            '1. IBM will provide a Senior Managing Consultant / expert resource, for up to 80 hours, to assist Florida Power & Light (FPL) with the creation of an IT infrastructure unit cost model for existing infrastructure.',
          original_labels: {
            types: [
              {
                label: {
                  nature: 'Obligation',
                  party: 'IBM',
                },
                provenance_ids: [
                  '85f5981a-ba91-44f5-9efa-0bd22e64b7bc',
                  'ce0480a1-5ef1-4c3e-9861-3743b5610795',
                ],
              },
              {
                label: {
                  nature: 'End User',
                  party: 'Exclusion',
                },
                provenance_ids: [
                  '85f5981a-ba91-44f5-9efa-0bd22e64b7bc',
                  'ce0480a1-5ef1-4c3e-9861-3743b5610795',
                ],
              },
            ],
            categories: [
              {
                label: 'Responsibilities',
                provenance_ids: [],
              },
              {
                label: 'Amendments',
                provenance_ids: [],
              },
            ],
          },
          updated_labels: {
            types: [
              {
                label: {
                  nature: 'Obligation',
                  party: 'IBM',
                },
              },
              {
                label: {
                  nature: 'Disclaimer',
                  party: 'Buyer',
                },
              },
            ],
            categories: [
              {
                label: 'Responsibilities',
              },
              {
                label: 'Audits',
              },
            ],
          },
        },
      };

      compareComply.addFeedback(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();

        feedbackId = result.feedback_id;

        expect(result.feedback_id).toBeDefined();
        expect(result.user_id).toBeDefined();
        expect(result.comment).toBeDefined();
        expect(result.created).toBeDefined();
        expect(result.feedback_data).toBeDefined();
        done();
      });
    }, 15000);

    test('getFeedback', done => {
      if (!feedbackId) {
        // We cannot run this test when addFeedback failed.
        return done();
      }

      const params = {
        feedbackId,
        headers: {
          'x-watson-metadata': 'customer_id=sdk-test-customer-id',
        },
      };
      compareComply.getFeedback(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.feedback_id).toBeDefined();
        expect(result.user_id).toBeDefined();
        expect(result.comment).toBeDefined();
        expect(result.created).toBeDefined();
        expect(result.feedback_data).toBeDefined();
        done();
      });
    }, 10000);

    test('listFeedback', done => {
      compareComply.listFeedback((err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.feedback).toBeDefined();
        expect(result.pagination).toBeDefined();
        done();
      });
    }, 10000);

    test('deleteFeedback', done => {
      if (!feedbackId) {
        // We cannot run this test when addFeedback failed.
        return done();
      }

      const params = {
        feedbackId,
      };
      compareComply.deleteFeedback(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.message).toBeDefined();
        done();
      });
    });
  });

  describe('batches @slow', () => {
    let batchId;
    test('createBatch / updateBatch', done => {
      const params = {
        _function: 'html_conversion',
        inputCredentialsFile: fs.createReadStream(
          __dirname + '/../resources/cc_input_auth_file.json'
        ),
        inputBucketLocation: 'us-south',
        inputBucketName: 'compare-comply-integration-test-bucket-input',
        outputCredentialsFile: fs.createReadStream(
          __dirname + '/../resources/cc_output_auth_file.json'
        ),
        outputBucketLocation: 'us-south',
        outputBucketName: 'compare-comply-integration-test-bucket-output',
      };
      compareComply.createBatch(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.function).toBeTruthy();
        expect(result.input_bucket_name).toBeTruthy();
        expect(result.output_bucket_name).toBeTruthy();
        expect(result.input_bucket_location).toBeTruthy();
        expect(result.output_bucket_location).toBeTruthy();
        expect(result.status).toBeTruthy();
        expect(result.created).toBeTruthy();
        expect(result.estimated_completion_time).toBeTruthy();
        expect(result.updated).toBeTruthy();
        expect(result.batch_id).toBeTruthy();
        expect(result.document_counts).toBeTruthy();

        // save the batch id
        batchId = result.batch_id;

        // updateBatch needs to run almost immediately after createBatch
        // the update method ONLY works on documents that are 'pending' and it does
        // not take long for the documents to finish processing.
        const params = {
          batchId,
          action: 'rescan',
        };

        compareComply.updateBatch(params, (err, res) => {
          expect(err).toBeNull();
          const { result } = res || {};
          expect(res).toBeDefined();
          expect(result.function).toBeTruthy();
          expect(result.input_bucket_name).toBeTruthy();
          expect(result.output_bucket_name).toBeTruthy();
          expect(result.input_bucket_location).toBeTruthy();
          expect(result.output_bucket_location).toBeTruthy();
          expect(result.status).toBeTruthy();
          expect(result.created).toBeTruthy();
          expect(result.updated).toBeTruthy();
          expect(result.batch_id).toBeTruthy();
          expect(result.document_counts).toBeTruthy();
          done();
        });
      });
    });

    test('getBatch', done => {
      const params = {
        batchId,
      };
      compareComply.getBatch(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.function).toBeTruthy();
        expect(result.input_bucket_name).toBeTruthy();
        expect(result.output_bucket_name).toBeTruthy();
        expect(result.input_bucket_location).toBeTruthy();
        expect(result.output_bucket_location).toBeTruthy();
        expect(result.status).toBeTruthy();
        expect(result.created).toBeTruthy();
        expect(result.updated).toBeTruthy();
        expect(result.batch_id).toBeTruthy();
        expect(result.document_counts).toBeTruthy();
        done();
      });
    });

    test('listBatches', done => {
      compareComply.listBatches((err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.batches).toBeTruthy();
        done();
      });
    });
  });
});
