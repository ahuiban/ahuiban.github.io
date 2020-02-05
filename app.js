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
            getItem: function (handler, amount = 1, ) {
                const ths = this;
                $.ajax({
                    url: ths.URL + amount,
                    method: "POST",
                })
                    .done(handler)
                    .fail(function () {

                        ths.html('<p> invalid responce from server </p>');
                    })

            },
            questionBuilder: function (cor, incor) {
                ths = this;


                ths._selAnswer
                $.each(incor.concat([cor]), function (k, item) {

                    const _cor = (item == cor) ? true : false;
                    ths._selAnswer.append('<div class="ans" data-cor=' + _cor + '>' +
                        item +
                        '</div>');
                });

            },
            checkAnswer: function (e) {
                ths = myForm;
                const res = $(this).attr("data-cor");

                const corectAnswerValue = $(this).parent().find('[data-cor=true]').text();


                if (res == 'true') {

                    ths._selAnswer.html('Correct!!! ' + corectAnswerValue)
                    ths.answers.correct++;

                } else {

                    ths.answers.wrong++;

                    ths._selAnswer.html('Wrong! It was: ' + corectAnswerValue)

                }
                ths._score.html(
                    'Correct ' + ths.answers.correct +
                    ' Wrong ' + ths.answers.wrong
                );

                ths._btn.css("display", 'block');
            }
        }
        myForm.init();



    })
})(jQuery)


