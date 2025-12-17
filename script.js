let currentQuestion = 0;
let score = 0;
let questions = [];

const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll("#answers button");
const scoreEl = document.getElementById("score");

fetch("data/questions.json")
.then(response => response.json())
.then(data => {
	questions = data.questions;

	shuffleQuestions(questions);
	showQuestion();
});

function shuffleQuestions(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));

		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function showQuestion() {
	let q = questions[currentQuestion];
	if (!q) {
		endQuiz();
		return;
	}
	questionEl.textContent = q.question;

	for (let i = 0; i < 3; i++) {
		answerButtons[i].textContent = q.answers[i];
		answerButtons[i].disabled = false;
		answerButtons[i].className = "";
	}
}

for (let i = 0; i < 3; i++) {
	answerButtons[i].addEventListener("click", function () {
		checkAnswer(i);
	});
}

function checkAnswer(selectedIndex) {
	let q = questions[currentQuestion];

	for (let i = 0; i < answerButtons.length; i++) {
		answerButtons[i].disabled = true;
	}

	answerButtons[q.correct_index].classList.add("correct");

	if (selectedIndex !== q.correct_index) {
		answerButtons[selectedIndex].classList.add("wrong");
	}

	if (selectedIndex === q.correct_index) {
		score++;
		scoreEl.textContent = "Score: " + score;
	}

	setTimeout(function () {
		currentQuestion++;
		showQuestion();
	}, 600);
}

function endQuiz() {
	questionEl.textContent = "The end of the quiz!";
	document.getElementById("answers").innerHTML = "";
}