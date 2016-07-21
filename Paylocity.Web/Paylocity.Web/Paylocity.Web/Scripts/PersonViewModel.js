function PersonViewModel(firstName, lastName, regularPrice, parentPersonId, discountLetter, discountAmount) {

    var self = this;

    this.personId = ko.observable(new Date().getUTCMilliseconds());
    this.firstName = ko.observable(firstName);
    this.lastName = ko.observable(lastName);
    this.regularPrice = ko.observable(regularPrice);
    this.regularPriceDisplay = ko.computed(function () {
        var price = Number(this.regularPrice());
        price = formatCurrency(price);
        return price;
    }, this);

    this.discountLetter = ko.observable(discountLetter);
    this.discountAmount = ko.observable(discountAmount);
    this.applyDiscount = ko.computed(function () {
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
        price = formatCurrency(price);
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
    this.totalCostDisplay = ko.computed(function () {
        var dependentsCost = self.dependents().reduce(function (total, next) {
            return total + next.priceWithDiscount();
        }, 0);
        var totalCost = self.priceWithDiscount() + Number(dependentsCost);
        totalCost = formatCurrency(totalCost);
        return totalCost;
    });
};