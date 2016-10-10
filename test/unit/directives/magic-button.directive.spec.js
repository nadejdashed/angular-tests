'use strict';

describe('magicButtonDirective', function () {
	var suite;

	beforeEach(module('app'));

	beforeEach(inject(function ($rootScope, _$compile_) {
		suite = {};
		suite.scope = $rootScope.$new();
		suite.$compile = _$compile_;
	}));

	afterEach(function(){
		suite.element.remove();
		suite = null;
	});

	function createDirective(booleanValue){
		suite.element = '<button magic-button="'+ booleanValue +'"></button>';
		suite.element = suite.$compile(suite.element)(suite.scope);
		suite.elementScope = suite.element.scope();
		suite.scope.$digest();
	}

	// Used to simulate DOM event
	function triggerEvent(elem, type){
		var event = document.createEvent('Event');
		event.initEvent(type);
		elem.dispatchEvent(event);
	}

	it('should have class magic button and should have text "Catch" if attribute is true', function () {
		createDirective(true);
		expect(suite.element.hasClass('magic-button')).toBeTruthy();
		expect(suite.elementScope.buttonText).toBe('Catch');
	});

	it('should not have class magic button and should have text "Add" if attribute is false or empty', function () {
		createDirective(false);
		expect(suite.element.hasClass('magic-button')).toBeFalsy();
		expect(suite.elementScope.buttonText).toBe('Add');

		createDirective();
		expect(suite.element.hasClass('magic-button')).toBeFalsy();
		expect(suite.elementScope.buttonText).toBe('Add');
	});

	it('should change position on mouseover', function(){
		createDirective(true);

		var elementDOM = suite.element[0],
			top = elementDOM.style.top,
			left = elementDOM.style.left;

		triggerEvent(suite.element[0], 'mouseover');

		expect(elementDOM.style.top).not.toBe(top);
		expect(elementDOM.style.left).not.toBe(left);
	});
});