import appName from '../app.module';

describe('magicButtonDirective', () => {
	let suite;

	beforeEach(angular.mock.module(appName));

	beforeEach(angular.mock.inject(($rootScope, _$compile_, $document) => {
		suite = {};
		suite.scope = $rootScope.$new();
        suite.$document = $document;
        suite.$compile = _$compile_;
	}));

	afterEach(() => {
		suite.element.remove();
		suite = null;
	});

	let createDirective = (booleanValue) => {
		suite.element = `<button magic-button="${booleanValue}"></button>`;
		suite.element = suite.$compile(suite.element)(suite.scope);
		suite.elementScope = suite.element.scope();
		suite.scope.$digest();
	};

	// Used to simulate DOM event
	let triggerEvent = (elem, type) => {
		let event = suite.$document[0].createEvent('Event');
		event.initEvent(type);
		elem.dispatchEvent(event);
	};

	it('should have class magic button and should have text "Catch" if attribute is true', () => {
		createDirective(true);
		expect(suite.element.hasClass('magic-button')).toBeTruthy();
		expect(suite.elementScope.buttonText).toBe('Catch');
	});

	it('should not have class magic button and should have text "Add" if attribute is false or empty', () => {
		createDirective(false);
		expect(suite.element.hasClass('magic-button')).toBeFalsy();
		expect(suite.elementScope.buttonText).toBe('Add');

		createDirective();
		expect(suite.element.hasClass('magic-button')).toBeFalsy();
		expect(suite.elementScope.buttonText).toBe('Add');
	});

	it('should change position on mouseover', () => {
		createDirective(true);

		let elementDOM = suite.element[0],
			top = elementDOM.style.top,
			left = elementDOM.style.left;

		triggerEvent(suite.element[0], 'mouseover');

		expect(elementDOM.style.top).not.toBe(top);
		expect(elementDOM.style.left).not.toBe(left);
	});
});