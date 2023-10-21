angular.module('myApp').directive('brCellPhoneMask', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$parsers.push(function(viewValue) {
                var cleanedValue = viewValue.replace(/\D/g, '');

                if (cleanedValue.length > 11) {
                    
                    cleanedValue = cleanedValue.substring(0, 11);
                }

                if (cleanedValue.length >= 2) {
                    cleanedValue = '(' + cleanedValue.substring(0, 2) + ')' + cleanedValue.substring(2);
                }

                if (cleanedValue.length >= 8) {
                    cleanedValue = cleanedValue.substring(0, 8) + '-' + cleanedValue.substring(8);
                }

                ngModelCtrl.$setViewValue(cleanedValue);
                ngModelCtrl.$render();

                return cleanedValue;
            });
        }
    };
});
