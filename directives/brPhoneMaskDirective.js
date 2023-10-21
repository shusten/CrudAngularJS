angular.module('myApp').directive('brPhoneMask', function() {
  return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
          ngModelCtrl.$parsers.push(function(viewValue) {
              var cleanedValue = viewValue.replace(/\D/g, '');

              if (cleanedValue.length > 10) {
                  
                  cleanedValue = cleanedValue.substring(0, 10);
              }

              if (cleanedValue.length >= 2) {
                  cleanedValue = '(' + cleanedValue.substring(0, 2) + ')' + cleanedValue.substring(2);
              }

              if (cleanedValue.length >= 7) {
                  cleanedValue = cleanedValue.substring(0, 7) + '-' + cleanedValue.substring(7);
              }

              ngModelCtrl.$setViewValue(cleanedValue);
              ngModelCtrl.$render();

              return cleanedValue;
          });
      }
  };
});
