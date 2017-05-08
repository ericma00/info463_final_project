$(function() {
	console.log('hi');

	var inputText = $('#inputText h1').text();
	console.log(inputText);
	var color = ['red', 'blue', 'yellow', 'green', 'orange'];
	$('.button').click(function() {
		var randNum = Math.floor(Math.random() * 5);

		console.log('you clicked the button!');
		$(this).css('background-color', color[randNum]);
		var textVal = $('#inputText h1').text();
		$('#inputText h1').text(textVal += $(this).text());
	})












})