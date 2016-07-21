function PersonViewModel(firstName, lastName, regularPrice, parentPersonId, discountLetter, discountAmount) {

    var self = this;

    this.personId = ko.observable(new Date().getUTCMilliseconds());
    this.firstName = ko.observable(firstName);
    this.lastName = ko.observable(lastName);
    this.regularPrice = ko.observable(regularPrice).extend({ addCurrencyFormatted: 2 });
    this.discountLetter = ko.observable(discountLetter);
    this.discountAmount = ko.observable(discountAmount);
    this.applyDiscount = ko.computed(function () {

        //if (this.firstName() != null && this.firstName().toLowerCase().startsWith("a"))
        if (this.firstName() != null && this.firstName().toLowerCase().startsWith(this.discountLetter().toLowerCase())) {
            return this.discountAmount();
        } else {
            return 0;
        }
    }, this);
    this.priceWithDiscount = ko.computed(function () {
        return Number(this.applyDiscount() === 0 ? this.regularPrice() : this.regularPrice() - (this.regularPrice() * (this.applyDiscount() === 0 ? 1 : this.applyDiscount())));
    }, this);
    this.priceWithDiscountDisplay = ko.computed(function () {
        var price = Number(this.applyDiscount() === 0 ? this.regularPrice() : this.regularPrice() - (this.regularPrice() * (this.applyDiscount() === 0 ? 1 : this.applyDiscount())));
        price = price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        return price;
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