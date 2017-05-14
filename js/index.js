$(function() {
	var BUTTON_NUM = 12;



	var lowerCase =   ['n', 'a', 'h', 's', 'e', 'i', 'r', 'o', 't', 'CAPS', '__', '123'];
	var upperCase =   ['N', 'A', 'H', 'S',' E', 'I', 'R', 'O', 'T', 'CAPS', '__', '123'];
	var punctuation = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '__', 'abc'];

	$('#clear').click(function() {
		$('#inputText h1').empty();
	})
	for (var i = 0; i < BUTTON_NUM; i++) {
		var button = $('<div class="col col-sm-4 button">');
		button.append('<h3>' + lowerCase[i] + '</h3>');

		if (lowerCase[i] === 'CAPS') {
			button.attr('id', 'toUpCaps');
		} 
		if (lowerCase[i] === '123') {
			button.attr('id', 'nums');
		}

		$('#keyboard').append(button);
	}

	$('#keyboard').on('mouseenter', '.button', function() {
		$(this).css('background-color', '#99ccff');
	})

	$('#keyboard').on('mouseleave', '.button', function() {
		$(this).css('background-color', '#cce5ff');
	})

	$('#keyboard').on('click', '.button', function() {
		var randNum = Math.floor(Math.random() * 5);

		console.log($(this).text() === '123');

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
			var appendVal = $(this).text();
			if ($(this).text() === '__') {
				appendVal = " ";
			}
			$('#inputText h1').text(textVal += appendVal);
	    }
		
	});

	function changeKeyBoard(letterCase, changeCaps) {
		for (var i = 0; i < BUTTON_NUM; i++) {
			var button = $('<div class="col col-sm-4 button">');
			button.append('<h3>' + letterCase[i] + '</h3>');

			if (letterCase[i] === 'CAPS' || letterCase[i] === 'abc') {
				if (changeCaps === 'upCase') {
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
	}












})