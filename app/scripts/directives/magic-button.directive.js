'use strict';

angular.module('app').directive('magicButton', function () {
	return {
		//scope: true,
		link: function (scope, element, attr) {
			var elementNode = element[0],
				width = elementNode.offsetWidth,
				height = elementNode.offsetHeight;

			attr.$observe('magicButton', function(value){
				var result = (value === 'true');
				if (result) {
					elementNode.classList.add('magic-button');
					scope.buttonText = 'Catch';
				} else {
					elementNode.classList.remove('magic-button');
					scope.buttonText = 'Add';
				}
			});

			element.on('mouseover', function(){
				var top = parseInt(elementNode.style.top || 0, 10),
					left = parseInt(elementNode.style.left || 0, 10);

				elementNode.style.top = (top + height + 10) % 100 + 'px';
				elementNode.style.left = (left + width + 10) % 200 + 'px';
			});
			scope.$on('$destroy', function(){
				element.off('mouseover');
			});
		}
	};
});