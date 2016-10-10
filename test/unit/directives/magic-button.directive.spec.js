'use strict';

describe('magicButtonDirective', function () {
	var element, scope, elementScope,
		$compile;

	beforeEach(module('app'));

	beforeEach(inject(function ($rootScope, _$compile_) {
		scope = $rootScope.$new();
		$compile = _$compile_;
	}));

	function createDirective(booleanValue){
		element = '<button magic-button="'+ booleanValue +'"></button>';
		element = $compile(element)(scope);
		elementScope = element.scope();
		scope.$digest();
	}

	// Used to simulate DOM event
	function triggerEvent(elem, type){
		var event = document.createEvent('Event');
		event.initEvent(type);
		elem.dispatchEvent(event);
	}

	it('should have class magic button and should have text "Catch" if attribute is true', function () {
		createDirective(true);
		expect(element.hasClass('magic-button')).toBeTruthy();
		expect(elementScope.buttonText).toBe('Catch');
	});

	it('should not have class magic button and should have text "Add" if attribute is false or empty', function () {
		createDirective(false);
		expect(element.hasClass('magic-button')).toBeFalsy();
		expect(elementScope.buttonText).toBe('Add');

		createDirective();
		expect(element.hasClass('magic-button')).toBeFalsy();
		expect(elementScope.buttonText).toBe('Add');
	});

	it('should change position on mouseover', function(){
		createDirective(true);

		var elementDOM = element[0],
			top = elementDOM.style.top,
			left = elementDOM.style.left;

		triggerEvent(element[0], 'mouseover');

		expect(elementDOM.style.top).not.toBe(top);
		expect(elementDOM.style.left).not.toBe(left);
	});
});