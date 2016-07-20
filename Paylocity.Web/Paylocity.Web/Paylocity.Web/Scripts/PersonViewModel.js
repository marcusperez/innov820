function PersonViewModel(firstName, lastName, regularPrice, parentPersonId) {

    var self = this;

    this.personId = ko.observable(new Date().getUTCMilliseconds());
    this.firstName = ko.observable(firstName);
    this.lastName = ko.observable(lastName);
    this.regularPrice = ko.observable(regularPrice);
    this.applyDiscount = ko.computed(function () {

        if (this.firstName() != null && this.firstName().toLowerCase().startsWith("a")) {
            return 0.10;
        } else {
            return 0;
        }
    }, this);
    this.priceWithDiscount = ko.computed(function () {
        return Number(this.applyDiscount() === 0 ? this.regularPrice() : this.regularPrice() - (this.regularPrice() * (this.applyDiscount() === 0 ? 1 : this.applyDiscount())));
    }, this);
    this.parentPersonId = ko.observable(parentPersonId);
    this.isDependent = ko.computed(function () {
        return this.parentPersonId() != null;
    }, this);
    this.dependents = ko.observableArray();
    this.totalCost = ko.computed(function () {
        var dependentsCost = self.dependents().reduce(function (total, next) {
            return total + next.priceWithDiscount();
        }, 0);

        return self.priceWithDiscount() + Number(dependentsCost);
    });
};