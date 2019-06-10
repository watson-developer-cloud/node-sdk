'use strict';

const fs = require('fs');
const CompareComply = require('../../compare-comply/v1');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const serviceErrorUtils = require('../resources/service_error_util');

describe('compare_comply_integration', () => {
  const compare_comply = new CompareComply(auth.compare_comply);
  describe('html conversion @slow', () => {
    test('convertToHtml', done => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
        filename: 'TestTable.pdf',
      };
      compare_comply.convertToHtml(
        params,
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          expect(err).toBeNull();
          expect(res.html).toBeTruthy();
          done();
        })
      );
    });
  });

  describe('elementClassification', () => {
    test('classifyElements @slow', done => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
        filename: 'TestTable.pdf',
      };
      compare_comply.classifyElements(
        params,
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          expect(err).toBeNull();
          expect(res.document).toBeTruthy();
          expect(res.model_id).toBeTruthy();
          expect(res.model_version).toBeTruthy();
          expect(res.elements).toBeTruthy();
          expect(res.tables).toBeTruthy();
          expect(res.document_structure).toBeTruthy();
          expect(res.parties).toBeTruthy();
          expect(res.effective_dates).toBeTruthy();
          expect(res.termination_dates).toBeTruthy();
          expect(res.contract_amounts).toBeTruthy();
          done();
        })
      );
    }, 10000);
  });

  describe('tables', () => {
    test('extractTables @slow', done => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
        filename: 'TestTable.pdf',
      };
      compare_comply.extractTables(
        params,
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          expect(err).toBeNull();
          expect(res.document).toBeTruthy();
          expect(res.model_id).toBeTruthy();
          expect(res.model_version).toBeTruthy();
          expect(res.tables).toBeTruthy();
          done();
        })
      );
    }, 10000);
  });

  describe('comparison', () => {
    test('compareDocuments @slow', done => {
      jest.setTimeout(7000); // this test usually takes just under 7 seconds
      const params = {
        file_1: fs.createReadStream(__dirname + '/../resources/contract_A.pdf'),
        file_1_filename: 'contract_A.pdf',
        file_1_label: 'test-file-1',
        file_2: fs.createReadStream(__dirname + '/../resources/contract_B.pdf'),
        file_2_filename: 'contract_B.pdf',
        file_2_label: 'test-file-2',
      };
      compare_comply.compareDocuments(
        params,
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          expect(err).toBeNull();
          expect(res.model_version).toBeTruthy();
          expect(res.documents).toBeTruthy();
          expect(res.aligned_elements).toBeTruthy();
          expect(res.model_id).toBeTruthy();
          expect(res.unaligned_elements).toBeTruthy();
          done();
        })
      );
    });
  });

  describe('feedback', () => {
    let feedback_id;
    test('addFeedback', done => {
      const params = {
        comment: 'testing testing comments v2 - node sdk test',
        user_id: 'user_id_123x',
        feedback_data: {
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

      compare_comply.addFeedback(
        params,
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          feedback_id = res.feedback_id;

          expect(err).toBeNull();
          expect(res.feedback_id).toBeDefined();
          expect(res.user_id).toBeDefined();
          expect(res.comment).toBeDefined();
          expect(res.created).toBeDefined();
          expect(res.feedback_data).toBeDefined();
          done();
        })
      );
    }, 15000);

    test('getFeedback', done => {
      if (!feedback_id) {
        // We cannot run this test when addFeedback failed.
        return done();
      }

      const params = {
        feedback_id,
        headers: {
          'x-watson-metadata': 'customer_id=sdk-test-customer-id',
        },
      };
      compare_comply.getFeedback(
        params,
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          expect(err).toBeNull();
          expect(res.feedback_id).toBeDefined();
          expect(res.user_id).toBeDefined();
          expect(res.comment).toBeDefined();
          expect(res.created).toBeDefined();
          expect(res.feedback_data).toBeDefined();
          done();
        })
      );
    }, 10000);

    test('listFeedback', done => {
      compare_comply.listFeedback(
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          expect(err).toBeNull();
          expect(res.feedback).toBeDefined();
          expect(res.pagination).toBeDefined();
          done();
        })
      );
    }, 10000);

    test('deleteFeedback', done => {
      if (!feedback_id) {
        // We cannot run this test when addFeedback failed.
        return done();
      }

      const params = {
        feedback_id,
      };
      compare_comply.deleteFeedback(
        params,
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.message).toBeDefined();
          done();
        })
      );
    });
  });

  describe('batches @slow', () => {
    let batchId;
    test('createBatch / updateBatch', done => {
      const params = {
        _function: 'html_conversion',
        input_credentials_file: fs.createReadStream(
          __dirname + '/../resources/cc_input_auth_file.json'
        ),
        input_bucket_location: 'us-south',
        input_bucket_name: 'compare-comply-integration-test-bucket-input',
        output_credentials_file: fs.createReadStream(
          __dirname + '/../resources/cc_output_auth_file.json'
        ),
        output_bucket_location: 'us-south',
        output_bucket_name: 'compare-comply-integration-test-bucket-output',
      };
      compare_comply.createBatch(params, (err, res) => {
        expect(err).toBeNull();
        expect(res.function).toBeTruthy();
        expect(res.input_bucket_name).toBeTruthy();
        expect(res.output_bucket_name).toBeTruthy();
        expect(res.input_bucket_location).toBeTruthy();
        expect(res.output_bucket_location).toBeTruthy();
        expect(res.status).toBeTruthy();
        expect(res.created).toBeTruthy();
        expect(res.estimated_completion_time).toBeTruthy();
        expect(res.updated).toBeTruthy();
        expect(res.batch_id).toBeTruthy();
        expect(res.document_counts).toBeTruthy();

        // save the batch id
        batchId = res.batch_id;

        // updateBatch needs to run almost immediately after createBatch
        // the update method ONLY works on documents that are 'pending' and it does
        // not take long for the documents to finish processing.

        const params = {
          batch_id: batchId,
          action: 'rescan',
        };

        compare_comply.updateBatch(params, (err, res) => {
          expect(err).toBeNull();
          expect(res.function).toBeTruthy();
          expect(res.input_bucket_name).toBeTruthy();
          expect(res.output_bucket_name).toBeTruthy();
          expect(res.input_bucket_location).toBeTruthy();
          expect(res.output_bucket_location).toBeTruthy();
          expect(res.status).toBeTruthy();
          expect(res.created).toBeTruthy();
          expect(res.updated).toBeTruthy();
          expect(res.batch_id).toBeTruthy();
          expect(res.document_counts).toBeTruthy();
          done();
        });
      });
    });

    test('getBatch', done => {
      const params = {
        batch_id: batchId,
      };
      compare_comply.getBatch(params, (err, res) => {
        expect(err).toBeNull();
        expect(res.function).toBeTruthy();
        expect(res.input_bucket_name).toBeTruthy();
        expect(res.output_bucket_name).toBeTruthy();
        expect(res.input_bucket_location).toBeTruthy();
        expect(res.output_bucket_location).toBeTruthy();
        expect(res.status).toBeTruthy();
        expect(res.created).toBeTruthy();
        expect(res.updated).toBeTruthy();
        expect(res.batch_id).toBeTruthy();
        expect(res.document_counts).toBeTruthy();
        done();
      });
    });

    test('listBatches', done => {
      compare_comply.listBatches((err, res) => {
        expect(err).toBeNull();
        expect(res.batches).toBeTruthy();
        done();
      });
    });
  });
});
