'use strict';

var BigButtonDirective = function ($document) {
	return {
		replace:true,
		template: '<button ng-class="{big: isBigButton}" ng-click="onClick()">Big Button</button>',
		link: function(scope, elem, attr) {
			scope.isBigButton = false;

			$document.on('scroll', function(){
				var pageHeight = $document[0].documentElement.offsetHeight;
				var screenHeight = $document[0].documentElement.clientHeight;
				var scrollTop = $document[0].body.scrollTop;

				if (scrollTop + screenHeight >= pageHeight) {
					scope.isBigButton = true;
				} else {
					scope.isBigButton = false;
				}
				scope.$apply();
			});

			scope.onClick = function(){
				$document[0].body.scrollTop = 0;
			}
		}
	};
};

export default BigButtonDirective;