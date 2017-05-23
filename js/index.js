$(function() {
	var BUTTON_NUM = 12;



	var lowerCase =   ['n', 'a', 'h', 's', 'e', 'i', 'r', 'o', 't', 'CAPS', '__', '123'];
	var upperCase =   ['N', 'A', 'H', 'S',' E', 'I', 'R', 'O', 'T', 'CAPS', '__', '123'];
	var punctuation = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '__', 'abc'];

	var config1 = ['w', 'v', 'k', 'u'];

	var config2 = ['p'];

	var config3 = ['m', 'd', 'b', 'x'];

	var config4 = ['j', 'g', 'c'];

	var config5 = ['q', 'f'];

	var config6 = ['l'];

	var config7 = ['z', 'y'];

	// bottom Letter Index = 0, 2, 4, 5, 8, 11

	// clear text field button
	$('#clear').click(function() {
		$('#inputText h1').empty();
	})

	// display initial keyboard
	for (var i = 0; i < BUTTON_NUM; i++) {
		var button = $('<div class="col col-sm-4 button test' + i + '">');

		if (i === 0 || i === 3) {
			button.append('<h3 class="config1">' + lowerCase[i] + '</h3>');
			if (i === 0) {
				button.append('<h5 class="config1">' + config1[0] + '</h5>');
				button.append('<h5>' + config1[1] + '</h5>');
			}
			if (i === 3) {
				button.append('<h5 class="config1">' + config1[2] + '</h5>');
				button.append('<h5>' + config1[3] + '</h5>');				
			}
		} else if (i === 1) {
			button.append('<h3>' + lowerCase[i] + '</h3>');
			button.append('<h5>' + config2[0] + '</h5>');				
			

		} else if (i === 2 || i === 5) {
			if (i === 2) {
				button.append('<h5 class="config2">' + config3[0] + '</h5>');				
				button.append('<h3 class="config2">' + lowerCase[i] + '</h3>');
				button.append('<h5>' + config3[1] + '</h5>');
			}
			if (i === 5) {
				button.append('<h5 class="config2">' + config3[2] + '</h5>');				
				button.append('<h3 class="config2">' + lowerCase[i] + '</h3>');
				button.append('<h5>' + config3[3] + '</h5>');
			}

		} else if (i === 4) {
			button.append('<h5 class="config4">' + config4[0] + '</h5>');				
			button.append('<h3 class="config4">' + lowerCase[i] + '</h3>');
			button.append('<h5 class="config4">' + config4[1] + '</h5>');
			button.append('<h5>' + config4[2] + '</h5>');

		} else if (i === 6) {
			button.append('<h5>' + config5[0] + '</h5>');
			button.append('<h3 class="config5">' + lowerCase[i] + '</h3>');
			button.append('<h5 class="config5">' + config5[1] + '</h5>');			
		} else if (i === 7) {
			button.append('<h5>' + config6[0] + '</h5>');
			button.append('<h3>' + lowerCase[i] + '</h3>');


	 	} else if (i === 8) {
			button.append('<h5>' + config7[0] + '</h5>');
			button.append('<h5 class="config7">' + config7[1] + '</h5>');
			button.append('<h3 class="config7">' + lowerCase[i] + '</h3>');

	 	} else  {
			button.append('<h3>' + lowerCase[i] + '</h3>');
		}



		if (lowerCase[i] === 'CAPS') {
			button.attr('id', 'toUpCaps');
		} 
		if (lowerCase[i] === '123') {
			button.attr('id', 'nums');
		}


		$('#keyboard').append(button);
		
	}

	var textInput = document.getElementById('inputText');

  	// swipe left --> backspace
  	Hammer(textInput).on('swipeleft', function() {
		var val = $('#inputText h1');
		var valLength = val.text().length;

		val.text(val.text().substring(0, valLength - 1));
  	});

  	// swipe right --> add space
  	Hammer(textInput).on('swiperight', function() {
  		var val = $('#inputText h1');
  		val.text(val.text() + ' ');
  	})

	// Display string that user transcribes 
	var currentString = document.getElementById('displayText');
	var index = 0; //current index in the array of string
	var strings = [
			'The quick brown fox jumped over the lazy fence', 
			'What is love, baby dont hurt me', 
			'I like talking about online bakeries'
			];
	currentString.innerHTML = '<p>' + strings[index] + '</p>';


  	// swipe up: clear Keyboard, shows next string in array;
  	var options = {
		preventDefault: true
	};
  	var exitKeyboard = new Hammer(textInput, options);
  	exitKeyboard.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
 	
  	exitKeyboard.on('swipeup', function(ev) {
		$('#inputText h1').empty();
		index++;
		if (index > strings.length - 1) { // reached end of string array
			alert('test is done!');
			index = 0;
		} 
		currentString.innerHTML = '<p>' + strings[index] + '</p>';
  	})

  // 	Hammer(textInput).on('swiperight', function() {
		// alert('hi');
  // 	});


	// hammertime.on('swipedown', function(ev) {
	// 	alert('you swiped down!');
	// })	

	var buttons = document.getElementsByClassName('button');

	// var testHammer = new Hammer(buttons, options);
	// testHammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL});

	// testHammer.on('swipedown', function(ev) {
	// 	alert('fjei;fjieafeja');
	// })

	// show that a mouse is hovering over a key
	$('#keyboard').on('mouseenter', '.button', function() {
		$(this).css('background-color', '#000000');
	})

	// shows that a mouse is not hovering the key
	$('#keyboard').on('mouseleave', '.button', function() {
		$(this).css('background-color', '#222223');

	})

	$('#testBox').mousemove(function(event) {
		$('#report').text('X Coordinate: ' + event.pageX + ', Y Coordinate: ' + event.pageY);
	})

	// when keys are pressed
	$('#keyboard').on('click', '.button', function() {
		var randNum = Math.floor(Math.random() * 5);
		if ($(this).attr('id') === 'nums') {
			$('#keyboard').empty();
			changeKeyBoard(punctuation, 'upCase');
		} else if ($(this).attr('id') === 'toUpCaps') {
	    	// change to Upper;;
	    	$('#keyboard').empty();
	    	changeKeyBoard(upperCase, 'upCase');
	    } else if ($(this).attr('id') === 'toLowCaps') {
	    	// change to lower
	    	$('#keyboard').empty();
	    	changeKeyBoard(lowerCase, 'lowCase');
	    } else {
			var textVal = $('#inputText h1').text();
			var appendVal = $(this).children('h3').text();
			if ($(this).text() === '__') {
				appendVal = " ";
			}
			$('#inputText h1').text(textVal += appendVal);
	    }
		
	});

	// change keyboard depending on the type of keyboard wanted
	function changeKeyBoard(letterCase, changeCaps) {
		for (var i = 0; i < BUTTON_NUM; i++) {
			var button = $('<div class="col col-sm-4 button">');
			button.append('<h3>' + letterCase[i] + '</h3>');

			if (letterCase[i] === 'CAPS' || letterCase[i] === 'abc') {
				if (changeCaps === 'upCase') {
					button.attr('id', 'toLowCaps');	
					button.css('background-color', 'black');
					button.css('color', 'white');
				} else {
					button.attr('id', 'toUpCaps');

				}
			}

			if (letterCase[i] === '123') {
				button.attr('id', 'nums');
			}

			$('#keyboard').append(button);			
		}
	}

	var test1 = document.getElementById('testStuff');
	// var test2 = $('#testStuff');
	// console.log(test1);

	// var options = {
	// 	preventDefault: true
	// };
 // 	var hammertime = new Hammer(test1, options);
 //  	hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

 //  	hammertime.on('swipeleft', function() {
 //   		$('#testStuff').text($('#inputText').text());

 //  	});

 //  	Hammer(test1).on('swipeleft', function() {
 //  		console.log('hi');
 //  	})
})
