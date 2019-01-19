window.onload = function() {
	'use strict'

	const BUTTON_DIFFERENCE = document.querySelector('.difference-btn');
	const BUTTON_EXPECTANCY = document.querySelector('.expectancy-life-btn');


	function average(array) {
		function plus(a, b) { return a + b; }

		return array.reduce(plus) / array.length;
	}

	// MOTHER-CHILD AGE DIFFERENCE ========================================

	function motherChildAge(statusText) {
		let json = JSON.parse(statusText);
		let resultBox = document.querySelector('#result');

		function searchFmales(array){
			return array.filter(function(person){
				return person["sex"]=="f";
			})
		}

		function searchMother(arrayMother, mainArray){
			let diff=[];

			arrayMother.forEach(function(name){
				mainArray.filter(function(person){
					if(person["mother"]==name["name"]){
						diff.push(person.born - name.born);
					}
				})
			});

			return average(diff);
		}

		resultBox.innerHTML = 'Mother-child age difference is ' + searchMother(searchFmales(json), json).toFixed(1);

		// return 'Mother-child age difference is ' + searchMother(searchFmales(json), json).toFixed(2); // Mother-child age difference
	}

	// console.log(motherChildAge(ANCESTRY)); // OUTPUT RESULT


	// HISTORICAL LIFE EXPECTANCY IN CENTURY ===================================

	function historicalLifeExpectancy(statusText) {
		let json = JSON.parse(statusText);
		let localArrayAge = [];
		let resultBox = document.querySelector('#result-expectancy');
		let mainResult;
		let century = prompt('What century are you interested in?');

		json.forEach(function(persone) {
			if (Math.ceil(persone['died'] / 100) == century) {
				localArrayAge.push(persone['died'] - persone['born']);
			}
		});

		if(century.toString().indexOf('.') === -1 &&  +century ) {
			if (localArrayAge.length) {
				mainResult = century + ' century : ' + '' + average(localArrayAge).toFixed(1) + ' average age';
			} else {
				mainResult = century + ' century is not found.';
			}
		} else {
			mainResult = 'you need type integer number';
		}
		
		resultBox.innerHTML = mainResult;
	}


	// ajax get function ====================================
	function ajaxGet(url, handler) {
		const XHR = new XMLHttpRequest();

		XHR.open('GET', url, true);
		XHR.send();

		XHR.onreadystatechange = function() {
			if (XHR.readyState !=4) {return}

			if (XHR.status != 200) {
				alert('Error ' + XHR.status + ': ' + XHR.statusText);
			} else {
				handler(XHR.responseText);
			}
		}
	}

	BUTTON_DIFFERENCE.addEventListener('click', function(){
		ajaxGet('ancestry.json', motherChildAge);
		this.innerHTML = 'done';
	});

	BUTTON_EXPECTANCY.addEventListener('click', function(){
		ajaxGet('ancestry.json', historicalLifeExpectancy);
	});
}