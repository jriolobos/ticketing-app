'use strict';

describe('backend', function () {
   var scope, http;
   var url = 'http://192.168.1.2:8080';

    beforeEach(inject(function ($rootScope, $http) {
        $http.defaults.useXDomain = true;    // CORS
        scope = $rootScope.$new();
        http = $http;
    }));

/*    it("deberia traer la lista de tickets", function () {
        scope.$apply(function () {
            var res;
            http.get(url+"/ticketing/web/tickets")
                .success(function (data, status, headers, config) {
                             res = data;
                         })
                .error(function (data, status, headers, config) {
                           res = data;
                       });
            console.log('ret = ' + res);
            expect(res.echo).toBe("[]");
        });
    });*/
});
