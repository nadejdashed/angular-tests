'use strict';

angular.module('mock')
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
			'Results': 'Results',
			'Remove': 'Remove',
			'Add': 'Add',
			'Catch': 'Catch me',
			'Adv': 'Advertising',
			'Reset': 'Reset done task',
			'Done': 'Done',
			'Left': 'Left',
			'Panel': 'Count of panels: '
		},
		ru: {
			'Results': 'Результаты',
			'Remove': 'Удалить',
			'Add': 'Добавить',
			'Catch': 'Споймай меня',
			'Adv': 'Реклама',
			'Reset': 'Обнулить сделанные задания',
			'Done': 'Сделано',
			'Left': 'Осталось',
			'Panel': 'Количество панелей: '
		}
	});