describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('starter.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('ChokeDetailCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have enabled chokes to be true', function(){
        expect($scope.chokes.toEqual(true);
    });
});
