function PaylocityViewModel() {
    var self = this;

    self.employees = ko.observableArray();

    self.ApplyComputedObservables = function () {

    };

    self.AddEmployee = function () {
        //alert('test');
        var firstName = $("#txtFirstName").val();
        var lastName = $("#txtLastName").val();
        var benefitsCost = $("#txtEmployeeBenefitsCost").val();

        var personViewModel = new PersonViewModel(firstName, lastName, benefitsCost, null);

        self.employees.push(personViewModel);
    };

    self.AddDependent = function () {
        var parentPersonId = this.personId();

        var person = new PersonViewModel("", "", $("#txtDependentBenefitsCost").val(), parentPersonId);
        this.dependents.push(person);

        self.employees.push(person);
    };

    self.RemoveDependent = function () {

        var parentPersonId = this.parentPersonId();
        var personIdToRemove = this.personId();
        var indexToRemove = -1;

        $.each(self.employees, function (index, value) {
            $.each(value, function (index2, value2) {

                if (value2.personId() === personIdToRemove) {
                    indexToRemove = index2;
                }

            });
        });

        if (indexToRemove > -1) {
            self.employees.splice(indexToRemove, 1);
        }

    };
}