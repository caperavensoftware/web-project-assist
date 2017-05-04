
import {expect} from 'chai';
import 'aurelia-polyfills';
import {TaskRunner} from './../../src/lib/task-runner';

describe('TaskRunner Tests', function() {
    let taskRunner;

    beforeEach(function() {
        taskRunner = new TaskRunner ();
    });
    
    it('constructor', function() {
        expect(taskRunner).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => TaskRunner()).to.throw("Cannot call a class as a function");
    });    
});
