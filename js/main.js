// Quiz App

// quizLink = 'http://fvi-grad.com:4004/quiz';
// Asnwers Link: http://fvi-grad.com:4004/quiz-get-answer/66555

// Database Variables
// 		var id
// 		var questionTest
// 		var answers

// const id = document.querySelector('#mainContainer');
// const questions = document.querySelector('#mainContainer');
// const answers = document.querySelector('#mainContainer');

// Loading Data

var responses = {};

var questions = [];

var result = 0;

$.ajax({
	url: 'http://fvi-grad.com:4004/quiz',
	success: function (data) {
		questions = data;
		creaQuestionsList(data);
		return events();
	}
});

function creaQuestionsList(questions) {
	questions.forEach(q => {
		$('#list').append(`
			<div class="qdiv">${q.questionText} </div>
			<div class="qdiv">
				<form>
					${q.answers.map(
			(a, i) => `<input class='answer' type='radio' data-question='${q.id}' id=${i} name='answer${q.id}' value='${a}' />${a}`
					).join('<br/>')} 
				</form>
			</div>
		`);
	});
	$('#list').append(`
		<div class='btn-container'><button id='btn' class='btn'>Submit</button></div>
	`);
}

function events() {
	$('.answer').click(function (e) {
		// console.log('id ', $(this).data('question'), 'answer ', $(this).val(), this);

		var question = $(this).data('question');
		var answer = $(this).val();

		responses[question] = answer;

		console.log('responses', responses);
	});

	$('#btn').click(function (e) {
		e.preventDefault();

		if (questions.length === Object.keys(responses).length) {
			var c = 1;
			for (var q in responses) {
				getResult(q, c);
				c++
			}

		} else {
			return alert('Missing Answers');
		}
	});
}

function getResult(q, c) {
	$.ajax({
		url: 'http://fvi-grad.com:4004/quiz-get-answer/' + q,
		success: function (res) {
			var correct = res.replace(/"/g, '');

			console.log(q);

			console.log('response ', responses[q], 'correct ', correct);

			if (responses[q] === correct) result++;


			if (questions.length === c) return alert('You had ' + result + ' of ' + questions.length + 'correct!')
		}
	});
}