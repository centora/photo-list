var appPhotos = angular.module("app-photos", [
	'ngMaterial',
	'ui.router',
	'ngMessages',
	'ui.filters'
]);

appPhotos.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/photo-list");
	$stateProvider
		.state('photo-list', {
			url: "/",
			templateUrl: "photo-list.html",
			controller: "PhotoListController"
		}).state('album', {
			url: "/album/:id",
			templateUrl: "album.html",
		  controller: "AlbumController"
		}).state('image', {
			url: "/image/2",
			templateUrl: "photo.html",
			controller: "ImageController"
		});
});

var root = 'http://jsonplaceholder.typicode.com';

appPhotos.service("photoService", function($http, $q){
	var deferred = $q.defer();
	$http.get(root + '/photos').then(function(data){
		deferred.resolve(data);
	});
	this.getPhotos = function(){
		return deferred.promise;
	}
});

appPhotos.controller("PhotoListController", function($scope, photoService){
	$scope.allImages = "";
	var promise = photoService.getPhotos();
	promise.then(function(data){
		$scope.allImages = data.data;
	});
});

appPhotos.controller("AlbumController", function($scope, photoService, $state, $location){
	$scope.images = "";
	$scope.url = $location.$$url;
	$scope.urlAlbumId = parseInt($scope.url.replace("/album/",""));
	console.log($scope.urlAlbumId);

	var promise = photoService.getPhotos();
	promise.then(function(data){
		$scope.images = data.data;
	});
});