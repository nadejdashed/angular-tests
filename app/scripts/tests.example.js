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

/* EXAMPLE 4 */
describe('if configuration is not provided', () => {
   let injector;

   beforeEach(angular.mock.inject(($injector) => {
       let pageConfig = $injector.get('shopPageConfig');
       pageConfig.serviceUrl = undefined;
       injector = $injector;
   }));

   it('should throw error', () => {
       expect(() => {
           injector.get('vehicleData')
       }).toThrow();
   })
});

/* EXAMPLE 5 */
it('should work without any validation of selected flights', () => {
   resultsDataService.setRequestObj(fixedData.requestData);
   deferred.resolve(fixedData.responseData);
   $rootScrope.$apply();

   resultsDataService.submit();
   expect(setFlightSpy).toHaveBeenCalledWith(
       jasmine.objectContaining({finalSelection: true})
   );
});