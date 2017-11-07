import jsdom from 'mocha-jsdom';
import $ from 'jquery';
import {{Namespace}} from '../../src/main';
import { defaults as DEFAULTS} from '../../src/constant';

describe('{{Namespace}}', () => {
  describe('{{Namespace}}()', () => {
    it('should have {{Namespace}}', () => {
      expect({{Namespace}}).to.be.an('function');
    });

    it('should have defaults', () => {
      expect({{Namespace}}.defaults).to.be.an('object');
    });
{{#if events}}
    it('should have events', () => {
      expect({{Namespace}}.events).to.be.an('object');
    });
{{/if}}
{{#if classes}}
    it('should have classes', () => {
      expect({{Namespace}}.classes).to.be.an('object');
    });
{{/if}}
{{#if methods}}
    it('should have methods', () => {
      expect({{Namespace}}.methods).to.be.an('array');
    });
{{/if}}
  });

  describe('constructor()', () => {
    it('should work with element', () => {
      let element = document.createElement('div');
      let {{namespace}} = new {{Namespace}}(element);

      expect({{namespace}}).to.be.an('object');
      expect({{namespace}}.options).to.be.eql(DEFAULTS);
    });

    it('should have options', () => {
      let element = document.createElement('div');
      let {{namespace}} = new {{Namespace}}(element);

      expect({{namespace}}.options).to.be.an('object');
    });
  });

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      let element = document.createElement('div');
      let $element = $(element);

      expect($element.as{{Namespace}}()).to.be.equal($element);

      let api = $element.data('{{namespace}}');

      expect(api).to.be.an('object');
      expect(api.options).to.be.an('object');
    });
  });

  describe('api call', () => {
    it('should not call bind', () => {
      let $element = $(document.createElement('div')).as{{Namespace}}();
      expect($element.as{{Namespace}}('bind')).to.be.undefined;
    });

    it('should call destroy', () => {
      let $element = $(document.createElement('div')).as{{Namespace}}();
      $element.as{{Namespace}}('destroy')
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
    });
  });

  describe('initialize()', () => {
    let $element;

    beforeEach(function() {
      $element = $(document.createElement('div'));
    });

    it('should trigger ready event', () => {
      let called = 0;

      $element.on('{{namespace}}:ready', function(event, api) {
        expect(api.is('initialized')).to.be.true;
        called++;
      });

      $element.as{{Namespace}}();
      expect(called).to.be.equal(1);
    });
  });

  describe('destroy()', () => {
    let $element;
    let api;

    beforeEach(function() {
      $element = $(document.createElement('div')).as{{Namespace}}();
      api = $element.data('{{namespace}}');
    });

    it('should trigger destroy event', () => {
      let called = 0;

      $element.on('{{namespace}}:destroy', function(event, api) {
        expect(api.is('initialized')).to.be.false;
        called++;
      });

      $element.as{{Namespace}}('destroy');

      expect(called).to.be.equal(1);
    });
  });

  describe('enable()', () => {
    let $element;
    let api;

    beforeEach(function() {
      $element = $(document.createElement('div')).as{{Namespace}}();
      api = $element.data('{{namespace}}');
    });

    it('should enable the plugin', () => {
      $element.as{{Namespace}}('disable');
      $element.as{{Namespace}}('enable');

      expect(api.is('disabled')).to.be.false;
    });

    it('should trigger enable event', () => {
      let called = 0;

      $element.on('{{namespace}}:enable', function(event, api) {
        expect(api.is('disabled')).to.be.false;
        called++;
      });

      $element.as{{Namespace}}('enable');
      expect(called).to.be.equal(1);
    });
  });

  describe('disable()', () => {
    let $element;
    let api;

    beforeEach(function() {
      $element = $(document.createElement('div')).as{{Namespace}}();
      api = $element.data('{{namespace}}');
    });

    it('should disable the plugin', () => {
      $element.as{{Namespace}}('disable');

      expect(api.is('disabled')).to.be.true;
    });

    it('should trigger disable event', () => {
      let called = 0;

      $element.on('{{namespace}}:disable', function(event, api) {
        expect(api.is('disabled')).to.be.true;
        called++;
      });

      $element.as{{Namespace}}('disable');
      expect(called).to.be.equal(1);
    });
  });
});
