const fs = require("fs");
const score = [];
let currentQuestionIndex = 0;
let correctAnswer = [];

const getQuizData = () => {
	const filePath = "./data/data.json";
	const data = fs.readFileSync(filePath, "utf-8");
	const jsonData = JSON.parse(data);

	return jsonData;
};

const getCurrentQuiz = (code) => {
	const quiz = getQuizData();

	const currentQuiz = quiz.quiz.filter((item) => {
		if (item.roomCode == code) {
			return item;
		} else {
			return null;
		}
	});
	return currentQuiz;
};

const homePage = (req, res, next) => {
	const data = getQuizData();
	res.render("index", {
		data: data.quiz,
	});
};

const joinRoom = (req, res, next) => {
	const reqCode = req.body.quiz_code;

	const getQuiz = getCurrentQuiz(reqCode);

	if (getQuiz.length === 0) {
		return res.send("invalid code");
	}
	currentQuestionIndex = 0;
	return res.redirect(`/room?code=${reqCode}`);
};

const enterRoom = (req, res, next) => {
	const reqParams = req.query.code;

	res.render("room", {
		code: reqParams,
	});
};

const quiz = (req, res, next) => {
	const code = req.query.code;
	const quiz = getCurrentQuiz(code);
	const { questions } = quiz[0];

	res.render("quiz", {
		question: questions[currentQuestionIndex],
		code: code,
	});
};

const submitAnswer = (req, res, next) => {
	const choice = req.body.choices;
	const code = req.params.code;
	const quiz = getCurrentQuiz(code);

	const { questions } = quiz[0];

	const isCorrect = questions[currentQuestionIndex].correctAnswer === choice;

	if (isCorrect) {
		correctAnswer.push(1);
	} else {
		correctAnswer.push(0);
	}

	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		res.redirect(`/quiz?code=${code}`);
	} else {
		res.redirect(`/results`);
	}
};

const results = (req, res, next) => {
	const totalcorrectAnswer = correctAnswer.reduce((acc, curr) => acc + curr, 0);
	let totalQuiz = correctAnswer.length;
	correctAnswer = [];
	res.render("results", {
		correctAnswer: totalcorrectAnswer,
		totalQuiz: totalQuiz,
	});
};


module.exports = {
	homePage,
	joinRoom,
	enterRoom,
	quiz,
	submitAnswer,
	results,
	// audio
};
