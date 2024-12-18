const express = require('express');

const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

const controller = require('./../controllers/quiz-controller');

router.get('/', controller.homePage);

router.post('/join-room', controller.joinRoom);

router.get('/room', controller.enterRoom);

router.get('/quiz', controller.quiz);

router.get('/results', controller.results);

router.post('/submit-answer/:code/:quizId', controller.submitAnswer);

module.exports = router;