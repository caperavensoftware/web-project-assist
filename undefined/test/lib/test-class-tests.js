import {expect, assert} from 'chai';
import {TestClass} from './../../../app/src/lib/test-class';

describe('App Tests', function() {
    let instance;

    beforeEach(function() {
        instance = new TestClass();
    });

    it('constructor', function() {
        // Assert
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        // Assert
        expect(() => TestClass()).to.throw("Cannot call a class as a function");
    });

    it('dispose', function() {
        // Act
        instance.dispose();

        // Assert
        // .. put your code here
    });
});