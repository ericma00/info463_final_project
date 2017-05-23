'use strict'
$(function() {
	var BUTTON_NUM = 12;



	var lowerCase =   ['n', 'a', 'h', 's', 'e', 'i', 'r', 'o', 't', 'CAPS', '__', '123'];
	var upperCase =   ['N', 'A', 'H', 'S',' E', 'I', 'R', 'O', 'T', 'CAPS', '__', '123'];
	var punctuation = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '__', 'abc'];

	// bottom Letter Index = 0, 2, 4, 5, 8, 11


	var botLetter = ['v', 'p', 'd', 'u', 'c', 'x'];
	var topLetter = ['q', 'l', 'z']
	var rightLetter = ['w', 'k', 'f'];
	var leftLetter = ['m', 'b', 'y'];

	var centerKey = ['j', 'g'];

	$('#clear').click(function() {
		$('#inputText h1').empty();
	})

	// display initial keyboard
	for (var i = 0; i < BUTTON_NUM; i++) {
		var button = $('<div id="button' + (i + 1) + '" class="col col-sm-4 button" >');

		button = displaySideKeys(button, i, botLetter, topLetter, leftLetter, rightLetter, centerKey);

		if (lowerCase[i] === 'CAPS') {
			button.attr('id', 'toUpCaps');
		} 

		if (lowerCase[i] === '123') {
			button.attr('id', 'nums');
		}

		$('#keyboard').append(button);
		
	}



/********************* swipe events display *********************************/ 
	var textInput = document.getElementById('inputText');
    
	// Display string that user transcribes 
	var currentString = document.getElementById('displayText');
	var index = 0; //current index in the array of string
	var strings = [
                    'my watch fell in the water',
                    'prevailing wind from the east',
                    'never too rich and never too thin',
                    'breathing is difficult',
                    'I can see the rings on Saturn',
                    'physics and chemistry are hard',
                    'my bank account is overdrawn',
                    'elections bring out the best',
                    'we are having spaghetti',
                    'time to go shopping',
                    'a problem with the engine',
                    'elephants are afraid of mice',
                    'my favorite place to visit',
                    'three two one zero blast off',
                    'my favorite subject is psychology',
                    'circumstances are unacceptable',
                    'watch out for low flying objects',
                    'if at first you do not succeed',
                    'please provide your date of birth',
                    'we run the risk of failure',
                    'prayer in schools offends some',
                    'he is just like everyone else',
                    'great disturbance in the force',
                    'love means many things',
                    'you must be getting old',
                    'the world is a stage',
                    'can I skate with sister today',
                    'neither a borrower nor a lender be',
                    'one heck of a question',
                    'question that must be answered',
                    'beware the ides of March',
                    'double double toil and trouble',
                    'the power of denial',
                    'I agree with you',
                    'do not say anything',
                    'play it again Sam',
                    'the force is with you',
                    'you are not a jedi yet',
                    'an offer you cannot refuse',
                    'are you talking to me',
                    'yes you are very smart',
                    'all work and no play',
                    'hair gel is very greasy',
                    'Valium in the economy size',
                    'the facts get in the way'
			];
	currentString.innerHTML = '<p>' + strings[index] + '</p>';    

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

  	// swipe up: clear Keyboard, shows next string in array;
  	var options = {
		preventDefault: true
	};
    
  	var submitKeyboard = new Hammer(textInput, options);
  	submitKeyboard.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
 	
  	submitKeyboard.on('swipeup', function(ev) {
		$('#inputText h1').empty();
		index++;
		if (index > strings.length - 1) { // reached end of string array
			alert('test is done!');
			index = 0;
		} 
		currentString.innerHTML = '<p>' + strings[index] + '</p>';
  	})    
/********************* swipe events ****************************************/

	swipe('button1', 0);
	swipe('button2', 1);
	swipe('button3', 2);
	swipe('button4', 3);
	swipe('button5', 4);
	swipe('button6', 5);
	swipe('button7', 6);
	swipe('button8', 7);
	swipe('button9', 8);

	function swipe(id, index) {
	  	var button = document.getElementById(id);

	  	var options = {
			preventDefault: true
		}; 
		var vertSwipe = new Hammer(button, options);
		vertSwipe.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
		 	

	  	//swipe down
		if (index < 6) {
			vertSwipe.on('swipedown', function(ev) {
		  		var inputVal = $('#inputText h1').text();
  				console.log(inputVal);
  				$('#inputText h1').text(inputVal + botLetter[index]);
  			})

		}

		// swipe up
		if (index >= 6 && index <= 8) {
			vertSwipe.on('swipeup', function(ev) {
		  		var inputVal = $('#inputText h1').text();
  				$('#inputText h1').text(inputVal + topLetter[index - 6]);
  			})
		}


		// swipe right
		if (index === 0 || index === 4 || index === 3 || index === 6) {
			Hammer(button).on('swiperight', function(ev) {
		  		var inputVal = $('#inputText h1').text();
		  		if (index === 4) {
		  			$('#inputText h1').text(inputVal + centerKey[1]);
		  		} else {
			  		$('#inputText h1').text(inputVal + rightLetter[index / 3]);
		  		}
			});
		}

		// swipe left
		if (index === 2 || index === 4 || index === 5 || index === 8) {
			Hammer(button).on('swipeleft', function(ev) {
		  		var inputVal = $('#inputText h1').text();
		  		if (index === 4) {
			  		$('#inputText h1').text(inputVal + centerKey[0]);
		  		} else {
		  			$('#inputText h1').text(inputVal + leftLetter[Math.floor(index / 3)]);
				}
			});
		}
	}


/**********************************************************************************/

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


	function displaySideKeys(button, index, botLetter, topLetter, leftLetter, rightLetter, centerKey) {		
		button.append('<h3 class="letterAlign">' + lowerCase[i] + '</h3>');

		// display right Letters
		if (index === 0 || index === 4 || index === 3 || index === 6) {
			
			if (index === 4) {
				button.append('<h5 class="letterAlign">' + centerKey[1] + '</h5>');	
			} else {
				button.append('<h5 class="letterAlign">' + rightLetter[index / 3] + '</h5>');
			}
		}

		// display bottom Letter
		if (index < 6) {
			button.append('<h5>' + botLetter[index] + '</h5>');
		}

		// display left Letter
		if (index === 2 || index === 4 || index === 5 || index === 8) {
			if (index === 4) {
				button.prepend('<h5 class="letterAlign">' + centerKey[0] + '</h5>');	
			} else {
				button.prepend('<h5 class="letterAlign">' + leftLetter[Math.floor(index / 3)] + '</h5>');
			}
		}

		// display top Letter
		if (index >= 6 && index <= 8) {
			button.prepend('<h5>' + topLetter[index - 6] + '</h5>');			
		}
		return button;
	}


	// change keyboard depending on the type of keyboard wanted
	function changeKeyBoard(letterCase, changeCaps) {
		for (var i = 0; i < BUTTON_NUM; i++) {
			var button = $('<div id="button' + (i + 1) + '" class="col col-sm-4 button">');
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










})