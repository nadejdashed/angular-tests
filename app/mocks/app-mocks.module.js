'use strict';

angular.module('mock', [])
	.value('items', [
		{
			done: false,
			text: 'Write test'
		},
		{
			done: false,
			text: 'Finish project'
		}
	])
	.value('translations', {
		en: {
			'Remove': 'Remove',
			'Add': 'Add'
		},
		ru: {
			'Remove': 'Удалить',
			'Add': 'Добавить'
		}
	});