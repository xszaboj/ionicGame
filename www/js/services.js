angular.module('starter.services', ['angular-data.DSCacheFactory'])

///**
// * A simple example service that returns some data.
// */
//    .factory('Friends', function() {
//        // Might use a resource here that returns a JSON array

//        // Some fake testing data
//        var friends = [
//            { id: 0, name: 'Scruff McGruff' },
//            { id: 1, name: 'G.I. Joe' },
//            { id: 2, name: 'Miss Frizzle' },
//            { id: 3, name: 'Ash Ketchum' }
//        ];

//        return {
//            all: function() {
//                return friends;
//            },
//            get: function(friendId) {
//                // Simple index lookup
//                return friends[friendId];
//            }
//        }
//    })
//    .factory('Test', function ($http, $q) {
//        return {
//            getTestData: function () {
//                var deffered = $q.defer();
//                $http.get('Data/DataSource2.json').success(function (data) {
//                    deffered.resolve(data);

//                }).error(function (response, status, headers, config) {
//                    deffered.reject(status);
//                });
//                return deffered.promise;
//            }
//        }

//});
