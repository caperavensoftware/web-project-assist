
import {expect} from 'chai';
import 'aurelia-polyfills';
import {FileList} from './../../../src/components/file-list/file-list';

describe('FileList Tests', function() {
    let fileList;

    beforeEach(function() {
        fileList = new FileList ({});
    });
    
    it('constructor', function() {
        expect(fileList).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => FileList()).to.throw("Cannot call a class as a function");
    });    
});
