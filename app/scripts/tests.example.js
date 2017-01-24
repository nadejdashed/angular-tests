/* EXAMPLE 1 */
function createModule(data, fn) {
    angular.mock.module('shop.actions');
    angular.mock.module((actionProvider) => {
        actionProvider.register(data, fn);
    });

    suite = {};
    angular.mock.inject(($injector) => {
        suite.$injector = $injector;
    });
}

afterEach(() => {

});

it('should register few services with appropriate name when object is passed', () => {
    createModule({
        a: () => 'A',
        b: () => 'B'
    });
    expect(suite.$injector.get('aAction')).toEqual('A');
});

/* EXAMPLE 2 */
beforeEach(() => {
    angular.mock.module(appName, ($provide) => {
        $provide.constant('shopPageConfig', {
            serviceUrl: undefined
        });
    });
});

/* EXAMPLE 3 */
let global = 'smth';

describe('Your test suite', () => {

});