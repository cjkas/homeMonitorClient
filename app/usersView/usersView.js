'use strict';

angular.module('myApp.usersView')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService) {
console.log("uv");
var self = this;

self.user = { id:null, login:"", password: "", repassword: "", version: null};
self.users = [];

self.submit = submit;
self.edit = edit;
self.remove = remove;
self.reset = reset;

    fetchAllUsers();

    function fetchAllUsers(){
        UserService.fetchAllUsers()
            .then(
            function(d) {
                self.users = d;
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
    }

    function createContact(user){
        UserService.createUser(user)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while creating Contact');
            }
        );
    }

    function updateContact(user){
        UserService.updateUser(user)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while updating Contact');
            }
        );
    }

    function deleteContact(id){
        UserService.deleteContact(id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while deleting Contact');
            }
        );
    }

    function submit() {
        if(self.user.id===null){
            console.log('Saving New Contact', self.user);
            createContact(self.user);
        }else{
            console.log('Contact updated with id ', self.user.id);
            updateContact(self.user, self.user.id);
        }
        reset();
    }

    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.users.length; i++){
            if(self.users[i].id === id) {
                self.user = angular.copy(self.users[i]);
                break;
            }
        }
    }

    function remove(id){
        console.log('id to be deleted', id);
        if(self.user.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteContact(id);
    }


    function reset(){
        self.user={ id:null, login:"", password:"", repassword:"", version: null };
        $scope.myForm.$setPristine(); //reset Form
    }

}]);