window.onload = function() {

	// 'Class ToDoList'
	function ToDoList(externalOptions) {
		this.options = {
			listClass: 'todo-list', 					//default class for list
			buttonDeleteClass: 'delete-button' 			//default class for delete button
		};

		this.elements = {
			list: document.createElement('ul') 			//creating list
		}

		for (let key in externalOptions) {
			this.options[key] = externalOptions[key]; 	// adding externalOptions from arguments to inner object 'options'
		}

		this.init(); 									// initialization prototype methods
	}

	ToDoList.prototype = {
		init: function () {
			this.findElements();
			this.events();
		},
		findElements: function() {
			this.elements.mainHolder = document.querySelector(this.options.holder); 						// Main holder
			this.elements.resultHolder = this.elements.mainHolder.querySelector(this.options.listHolder) 	// finding holder for list from Main holder
			this.elements.buttonAdd = this.elements.mainHolder.querySelector(this.options.buttonForAdd); 	// finding 'add button' from Main holder
			this.elements.inputText = this.elements.mainHolder.querySelector(this.options.input); 			// finding main input from Main holder
		},
		createNode: function() {
			this.elements.list.classList.add(this.options.listClass); //adding class to list
			this.elements.resultHolder.appendChild(this.elements.list); // appending list to result holder 
		},
		addingListItemNode: function() {
			let list = this.elements.list;
			let input = this.elements.inputText;
			let value = input.value.trim();
			let item = document.createElement('li');

			console.log(this.elements.resultHolder.children[0], list)

			if (this.elements.resultHolder.children[0] != list) {
				// if have no list in holder
				this.createNode(); // adding list
			}

			if (value) {
				item.innerHTML = value + '<button type="button" class="'  + this.options.buttonDeleteClass + '">x</button>'; // creating inner html list item
				list.appendChild(item); // adding list item to list
				input.value = ''; 		// cleaning input value
			}

		},
		removeListItemNode: function(listItem) {
			if(!listItem) {
				// if have no target (list item) > remove first list item
				this.elements.list.children[0].remove();
			} else {
				listItem.remove();
			}
		},
		checkedListNode: function(listItem) {
			let lastListItem = this.elements.list.children.langth - 1;

			if(!listItem) {
				// if have no checked target (list item) > adding class first list item
				this.elements.list.children[0].classList.toggle('checked');
			} else {
				listItem.classList.toggle('checked'); // adding class if list item checked
			}
		},
		events: function() {
			let self = this; // save context

			// adding list item handler ('bind' for bind correct context)
			this.elements.buttonAdd.addEventListener('click', this.addingListItemNode.bind(this));

			// adding list item handler for keyboard
			this.elements.inputText.addEventListener('keypress', function(e) {
				let key = e.which || e.keyCode;

				if (key === 13) {
					self.addingListItemNode();
				}
			});

			// removing list item and checking list item
			this.elements.list.addEventListener('click', function(e) {
				let target = e.target;
				let targetWrapper = target.parentNode;
				let targetHasClassButton = target.classList.contains(self.options.buttonDeleteClass); // if clicked on delete button > 'true'

				if (targetHasClassButton) {
					self.removeListItemNode(targetWrapper); // remove list item 'li'
				}

				if (target.tagName == 'LI') {
					self.checkedListNode(target); 			// check list item 'li'
				}

			});
		}
	}

	let myToDo = new ToDoList({
		holder: '.list-wrapper',
		listHolder: '#list-result',
		input: '.input-list',
		buttonForAdd: '.btn'
	});

	console.log(myToDo);
}
