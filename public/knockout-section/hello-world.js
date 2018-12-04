var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
    
    this.fullName = ko.pureComputed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
    this.hideSecretText = true;
};

window.ViewModel = ViewModel;

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('knockout-section').innerHTML += `<div data-bind="template: { name: 'hello-world', data: data }"></div>`;
    ko.applyBindings({
        data: new ViewModel("Knockout", "world")
    }, document.getElementById('knockout-section'));
});
