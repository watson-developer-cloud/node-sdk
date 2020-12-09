'use strict';

const fs = require('fs');
const { IamAuthenticator } = require('../../dist/auth');
const CompareComply = require('../../dist/compare-comply/v1');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

describe('compare comply integration', () => {
  const options = authHelper.auth.compareComply;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const compareComply = new CompareComply(options);
  describe('html conversion @slow', () => {
    it('should convertToHtml', async () => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
      };

      const res = await compareComply.convertToHtml(params);
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.html).toBeTruthy();
    });
  });

  describe('elementClassification', () => {
    it('should classifyElements @slow', async () => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
        filename: 'TestTable.pdf',
      };

      const res = await compareComply.classifyElements(params);
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
    }, 10000);
  });

  describe('tables', () => {
    it('should extractTables @slow', async () => {
      const params = {
        file: fs.createReadStream(__dirname + '/../resources/TestTable.pdf'),
        filename: 'TestTable.pdf',
      };

      const res = await compareComply.extractTables(params);
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.document).toBeTruthy();
      expect(result.model_id).toBeTruthy();
      expect(result.model_version).toBeTruthy();
      expect(result.tables).toBeTruthy();
    }, 10000);
  });

  describe('comparison', () => {
    it('should compareDocuments @slow', async () => {
      jest.setTimeout(7000); // this test usually takes just under 7 seconds
      const params = {
        file1: fs.createReadStream(__dirname + '/../resources/contract_A.pdf'),
        file1Filename: 'contract_A.pdf',
        file1Label: 'test-file-1',
        file2: fs.createReadStream(__dirname + '/../resources/contract_B.pdf'),
        file2Filename: 'contract_B.pdf',
        file2Label: 'test-file-2',
      };

      const res = await compareComply.compareDocuments(params);
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.model_version).toBeTruthy();
      expect(result.documents).toBeTruthy();
      expect(result.aligned_elements).toBeTruthy();
      expect(result.model_id).toBeTruthy();
      expect(result.unaligned_elements).toBeTruthy();
    });
  });

  describe('feedback', () => {
    let feedbackId;
    it('should addFeedback', async () => {
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

      const res = await compareComply.addFeedback(params);
      const { result } = res || {};
      expect(result).toBeDefined();

      feedbackId = result.feedback_id;

      expect(result.feedback_id).toBeDefined();
      expect(result.user_id).toBeDefined();
      expect(result.comment).toBeDefined();
      expect(result.created).toBeDefined();
      expect(result.feedback_data).toBeDefined();
    }, 25000);

    it('should getFeedback', async () => {
      // We cannot run this test when addFeedback failed.
      expect(feedbackId).toBeTruthy();

      const params = {
        feedbackId,
        headers: {
          'x-watson-metadata': 'customer_id=sdk-test-customer-id',
        },
      };

      const res = await compareComply.getFeedback(params);
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.feedback_id).toBeDefined();
      expect(result.user_id).toBeDefined();
      expect(result.comment).toBeDefined();
      expect(result.created).toBeDefined();
      expect(result.feedback_data).toBeDefined();
    }, 20000);

    it('should listFeedback', async () => {
      const res = await compareComply.listFeedback();
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.feedback).toBeDefined();
      expect(result.pagination).toBeDefined();
    }, 10000);

    it('should deleteFeedback', async () => {
      // We cannot run this test when addFeedback failed.
      expect(feedbackId).toBeTruthy();

      const params = {
        feedbackId,
      };

      const res = await compareComply.deleteFeedback(params);
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.status).toBe(200);
      expect(result.message).toBeDefined();
    });
  });

  describe('batches @slow', () => {
    let batchId;
    it('should createBatch / updateBatch', async () => {
      let params = {
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

      try {
        const res = await compareComply.createBatch(params);
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
      } catch (err) {
        expect(err).toBeNull();
      }

      params = {
        batchId,
        action: 'rescan',
      };

      // updateBatch needs to run almost immediately after createBatch
      // the update method ONLY works on documents that are 'pending' and it does
      // not take long for the documents to finish processing.
      try {
        const res = await compareComply.updateBatch(params);
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
      } catch (err) {
        expect(err).toBeNull();
      }
    });

    it('should getBatch', async () => {
      const params = {
        batchId,
      };

      const res = await compareComply.getBatch(params);
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
    });

    it('should listBatches', async () => {
      const res = await compareComply.listBatches();
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.batches).toBeTruthy();
    });
  });
});
