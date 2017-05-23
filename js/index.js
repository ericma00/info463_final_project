'use strict'
$(function() {
	var BUTTON_NUM = 12;



	var lowerCase =   ['n', 'a', 'h', 's', 'e', 'i', 'r', 'o', 't', 'CAPS', '__', '123'];
	var upperCase =   ['N', 'A', 'H', 'S',' E', 'I', 'R', 'O', 'T', 'CAPS', '__', '123'];
	var punctuation = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '__', 'abc'];

// lowercase
	var botLetter = ['v', 'p', 'd', 'u', 'c', 'x'];
	var topLetter = ['q', 'l', 'z']
	var rightLetter = ['w', 'k', 'f'];
	var leftLetter = ['m', 'b', 'y'];

	var centerKey = ['j', 'g'];


// uppercase
	var upbotLetter = ['V', 'P', 'D', 'U', 'C', 'X'];
	var uptopLetter = ['Q', 'L', 'Z']
	var uprightLetter = ['W', 'K', 'F'];
	var upleftLetter = ['M', 'B', 'Y'];

	var upcenterKey = ['J', 'G'];

// punctuation
	var puncbotLetter = ['!', '@', '#', '$', '%', '^'];
	var punctopLetter = ['&', '*', '(']
	var puncrightLetter = ['/', '-', ':'];
	var puncleftLetter = ['?', '+', ';'];

	var punccenterKey = ['=', '_'];

// bottom 
	var botButtonPunc = ['.', ','];
	var botButtonPunc2 = ['"', '?'];

	$('#clear').click(function() {
		$('#inputText h1').empty();
	})

	// display initial keyboard
	for (var i = 0; i < BUTTON_NUM; i++) {
		var button = $('<div id="button' + (i + 1) + '" class="col col-sm-4 button" >');
		button.append('<h3 class="letterAlign">' + lowerCase[i] + '</h3>');

		button = displaySideKeys(button, i, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);

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


/**********************************************************************************/

	// // show that a mouse is hovering over a key
	// $('#keyboard').on('mouseenter', '.button', function() {
	// 	$(this).css('background-color', '#DCDCDC');
	// })

	// // shows that a mouse is not hovering the key
	// $('#keyboard').on('mouseleave', '.button', function() {
	// 	$(this).css('background-color', 'white');

	// })



	$('#testBox').mousemove(function(event) {
		$('#report').text('X Coordinate: ' + event.pageX + ', Y Coordinate: ' + event.pageY);
	})



	// when keys are pressed
	$('#keyboard').on('click', '.button', function() {
		if ($(this).attr('id') === 'nums') {
			$('#keyboard').empty();
			changeKeyBoard(punctuation, 'punctuation');
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
			if ($(this).attr('id') === 'button11') {
				appendVal = " ";
			}
			$('#inputText h1').text(textVal += appendVal);
	    }
		
	});


	function displaySideKeys(button, index, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc) {		

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

		if (index === 10) {
			console.log('hi');
			button.prepend('<h5>' + botButtonPunc[0] + '</h5>');
			button.append('<h5 class="letterAlign">' + botButtonPunc[1] + '</h5>');
		}
		console.log(index);
		return button;
	}


	// change keyboard depending on the type of keyboard wanted
	function changeKeyBoard(letterCase, changeCaps) {
		for (var i = 0; i < BUTTON_NUM; i++) {
			var button = $('<div id="button' + (i + 1) + '" class="col col-sm-4 button">');
			button.append('<h3 class="letterAlign">' + letterCase[i] + '</h3>');

			if (changeCaps === 'upCase') {
				displaySideKeys(button, i, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc)

			} else if (changeCaps === 'lowCase') {
				displaySideKeys(button, i, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc)
			} else {
				displaySideKeys(button, i, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2)				
			}


			if (letterCase[i] === 'CAPS' || letterCase[i] === 'abc') {
				if (changeCaps === 'upCase') {
					button.attr('id', 'toLowCaps');	
					button.css('background-color', 'black');
					button.css('color', 'white');
				} else if (changeCaps === 'punctuation') {
					button.attr('id', 'toLowCaps');

				} else {
					button.attr('id', 'toUpCaps');
				}
			}

			if (letterCase[i] === '123') {
				button.attr('id', 'nums');
			}

			$('#keyboard').append(button);			
		}

		if (changeCaps === 'upCase') {
			swipe('button1', 0, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button2', 1, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button3', 2, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button4', 3, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button5', 4, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button6', 5, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button7', 6, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button8', 7, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button9', 8, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button11', 10, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);

		} else if (changeCaps === 'lowCase') {
			swipe('button1', 0, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button2', 1, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button3', 2, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button4', 3, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button5', 4, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button6', 5, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button7', 6, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button8', 7, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button9', 8, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button11', 10, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
		} else {
			swipe('button1', 0, punctopLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button2', 1, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button3', 2, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button4', 3, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button5', 4, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button6', 5, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button7', 6, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button8', 7, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button9', 8, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button11', 10, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);

		}
	}






/********************* swipe events ****************************************/

	swipe('button1', 0, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button2', 1, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button3', 2, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button4', 3, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button5', 4, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button6', 5, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button7', 6, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button8', 7, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button9', 8, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button11', 10, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);

	function swipe(id, index, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc) {
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
		if (index >= 6 && index <= 8 || index === 10) {

			vertSwipe.on('swipeup', function(ev) {
		  		var inputVal = $('#inputText h1').text();
		  		if (index === 10) {
  					$('#inputText h1').text(inputVal + botButtonPunc[0]);
		  		} else {
  					$('#inputText h1').text(inputVal + topLetter[index - 6]);
  				}
  			})
		}


		// swipe right
		if (index === 0 || index === 4 || index === 3 || index === 6 || index === 10) {
			Hammer(button).on('swiperight', function(ev) {
		  		var inputVal = $('#inputText h1').text();
		  		if (index === 4) {
		  			$('#inputText h1').text(inputVal + centerKey[1]);
		  		} else if (index === 10) {
		  			$('#inputText h1').text(inputVal + botButtonPunc[1]);
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

})