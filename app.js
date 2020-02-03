console.log("It's working")


    (function ($) {
        $(function () {

            const myForm = {
                // elements
                _btn: $('#btn'),
                _output: $('#output'),
                _selAnswer: $('#selAnswers'),
                _score: $('#score'),

                // static
                URL: 'https://opentdb.com/api.php?amount=',

                // attrs
                answers: {
                    'correct': 0,
                    'wrong': 0
                },

                init: function () {

                    ths = this;
                    ths._btn.on('click', ths.getNextItem);
                    ths._selAnswer.on('click', ".ans", ths.checkAnswer);
                },

                getNextItem: function () {
                    ths = myForm;
                    ths.getItem(function (data) {
                        ths._btn.css("display", "none");
                        const obj = data.results[0];

                        ths._output.html('<div>\
                                            <div class="cat">' +
                            obj.category +
                            '</div>\
                                            <div class="que">' +
                            obj.question +
                            '</div>\
                                        </div>');

                        ths.questionBuilder(
                            obj.correct_answer,
                            obj.incorrect_answers
                        );

                    }, 1);
                },

            }