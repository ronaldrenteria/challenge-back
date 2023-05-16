const assert = require('assert');
const api = require('../services/files.service');

    describe('test api method to get list of files', () => {
        it('should return an array of files', (done) => {
        // import the method that gets the list of files
        const getListOfFiles = require('../services/files.service').getFiles;
        
        // call the method
        getListOfFiles((err, files) => {
            // assert that there is no error
            assert.equal(err, null);
            // assert that the returned value is an array
            assert(Array.isArray(files));
            done();
        });
        });
    });

    