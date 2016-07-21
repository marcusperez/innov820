function PaylocityViewModel() {
    var self = this;

    self.employees = ko.observableArray();

    self.employeeBenefitsCost = function () {
        return $("#txtEmployeeBenefitsCost").val();
    };

    self.dependentBenefitsCost = function () {
        return $("#txtDependentBenefitsCost").val();
    };
    
    self.discountLetter = function() {
        return $("#txtDiscountLetter").val();
    };

    self.employeeSalaryPerCheck = function () {
        return $("#txtEmployeeSalary").val();
    };

    self.discountAmount = function () {
        return Number($("#txtDiscountAmount").val()) / 100;
    };
    
    self.addEmployee = function () {
        //alert('test');
        var firstName = "";
        var lastName = "";       
        var parentPersonId = null;

        var personViewModel = new PersonViewModel(firstName, lastName, self.employeeBenefitsCost(), parentPersonId, self.discountLetter(), self.discountAmount());

        self.employees.push(personViewModel);
    };

    self.newEmployee = function () {
        self.employees.removeAll();
        self.addEmployee();
    };

    self.addDependent = function () {
        var parentPersonId = this.personId();

        var person = new PersonViewModel("", "", self.dependentBenefitsCost(), parentPersonId, self.discountLetter(), self.discountAmount());

        this.dependents.push(person);

        self.employees.push(person);
    };

    self.removeDependent = function () {

        var parentPersonId = this.parentPersonId();
        var personIdToRemove = this.personId();
        var indexToRemove = -1;

        $.each(self.employees(), function (index, value) {
            if (value.personId() === personIdToRemove) {
                indexToRemove = index;
            }
        });

        if (indexToRemove > -1) {
            self.employees.splice(indexToRemove, 1);
        }
    };

    self.totalCost = ko.computed(function () {
        var totalCost = self.employees().reduce(function (total, next) {
            return total + next.priceWithDiscount();
        }, 0);

        return Number(totalCost);
    });

    self.annualCost = ko.computed(function () {
        var totalCost = self.employees().reduce(function (total, next) {
            return total + next.priceWithDiscount();
        }, 0);

        totalCost = totalCost * 26;
        return Number(totalCost);
    });

    self.annualCostPercentage = ko.computed(function () {
        var totalCost = self.employees().reduce(function (total, next) {
            return total + next.priceWithDiscount();
        }, 0);

        return Number(totalCost);
    });

    self.annualSalary = ko.computed(function () {
        return self.employeeSalaryPerCheck() * 26;
    });

    //self.totalPaycheck = ko.computed(function () {
    //    var totalCost = self.employees().reduce(function (total, next) {
    //        return total + next.priceWithDiscount();
    //    }, 0);

    //    return Number(totalCost);
    //});

}