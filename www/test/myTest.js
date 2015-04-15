describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });
});

//describe("Test controller", function() {
//    var scope,  mockTest, q, ctrl;
//    var deferred;

//    beforeEach(module("starter.controllers"));

//    beforeEach(function() {
//        mockTest = {
//            getTestData: function() {
//                deferred = q.defer();
//                return deferred.promise;
//            }
//        }
//    });

//    beforeEach(inject(function ($controller, $rootScope, $q) {
//        //inject scope
//        scope = $rootScope.$new();
//        //inject controller
//        ctrl = $controller;
//        //mock Test object
//        mockTest = jasmine.createSpyObj('mockTest', ['getTestData']);
//        q = $q;
//    }));

//    describe('test', function() {
//        beforeEach(function() {
//            mockTest.getTestData.and.returnValue(q.when({ result: 'I Promise' }));
//            controller("DashCtrl", { $scope: scope, Test: mockTest });
//            scope.$apply();
//        });
//    });


//    it('neco', function () {
//        console.log(scope.testObject); 
//        expect(scope.testObject.result).toBe("I Promise");
//    });

//})