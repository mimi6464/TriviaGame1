var countDown = 10;
var resetTimerValue = 30;
var timeout = null;
var correctAnswerCount = 0;
var wrongAnswerCount = 0;
var unanswerdCount = 0;
var done = false;
var _questions = [
	{
		id:'Q1',
		q: "WHO WAS THE FIRST US PRESIDENT TO DECLARE WAR?",
		options: { a: 'JAMES MADISON', b: 'GEORGE WASHINGTON', c: 'OBAMA', d: 'ABRAHAM LINCOLN' },
		a: 'a'
	},
	{
		id:'Q2',
		q: "WHO WAS THE FIRST HUMAN TO TRAVEL INTO SPACE?",
		options: { a: 'SCOTT KELLY', b: 'YURI GAGARIN', c: 'SUNITA WILLIAMS', d: 'David' },
		a: 'b'
	},
	{
		id:'Q3',
		q: "WHO WAS THE FIRST MAN TO SET FOOT ON THE MOON?",
		options: { a: 'YURI GAGARIN', b: 'NEIL ARMSTRONG', c: 'OBAMA', d: 'MICHAEL COLLINS' },
		a: 'b'
	},

	{
		id:'Q4',
		q: "WHICH IS THE MOST WIDELY SPOKEN LANGUAGE IN THE WORLD?",
		options: { a: 'CHINESE', b: 'FRENCH', c: 'ENGLISH', d: 'ITALIAN' },
		a: 'a'
	},

];






$(document).ready(function () {

	

	var startTimer = function () {
		if (countDown > 0 && !done) {
			countDown--;
			$('#gameCountDown').text(countDown);
			timeout = setTimeout(startTimer, 1000);
		}
		else {
			verifyAnswers();
		}
	};

	$('#btnDone').on('click', function () {

		verifyAnswers();
	});

	var verifyAnswers = function () {
		stopTimer();
		$.each(_questions, function (key, question) {
			console.log(question.id);
			var self = $('[name="' + question.id + '"]:checked');
			if (self.val() === undefined)
				unanswerdCount++;
			else if (self.val() === question.a) {
				correctAnswerCount++;
			} else {
				wrongAnswerCount++;
			}
		});
		if (_questions.length == correctAnswerCount) {
			$('.all-correct').show();
		}
		displayResult();
		
	};

	var getQuestions = function () {
		$('#questions').html('');
		$.each(_questions, function (key, question) {
			var div = $('<div class ="question">');
			div.text(question.q);
			var divOpt = $('<div class="q-frame">');
			for (var o in question.options) {
				var opt = $('<label class="radio-inline"><input type="radio" name="' + question.id + '"  value="' + o + '">'
						+ question.options[o] + '</label>');
				divOpt.append(opt);
			}

			div.append(divOpt);
			$('#questions').append(div);
		});

	};

	var stopTimer = function () {
		done = true;
		countDown = resetTimerValue;
		clearTimeout(timeout);
	};
	//
	var displayResult = function () {
		$('#correctAnswerCount').text(correctAnswerCount);
		$('#wrongAnswerCount').text(wrongAnswerCount);
		$('#unanswerdCount').text(unanswerdCount);
		resetResultCount();
		$('#question-container').slideUp();
		$('#answer-container').slideDown();
		
		
	};

	var resetResultCount = function () {
		correctAnswerCount = 0;
		wrongAnswerCount = 0;
		unanswerdCount = 0;
		getQuestions();
	};
	
	$('#btnStart,#btnTryAgain').on('click', function () {
		stopTimer();
		getQuestions();
		done = false;
		startTimer();
		$('.all-correct').hide();
		$('#start-container').hide();
		$('#answer-container').hide();
		$('#question-container').slideDown();
	});
	
});