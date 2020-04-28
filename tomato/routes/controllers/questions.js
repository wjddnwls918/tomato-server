/*
  Start of questions Controller



*/

var questionModel = require('../../models').questions;


//요청서 질문 가져오기
let getQuestions = async function(req, res, next) {

  let result = await questionModel.findAll()

  res.json(result);

};

//요청서 질문 삽입
let postQuestions = async function(req, res, next) {


  try {
    await questionModel.create({
      categories_id: req.body.categories_id,
      question_number: req.body.question_number,
      question_contents: req.body.question_contents,
      choice_contents: req.body.choice_contents
    })

    res.status(200).send({
      message: 'insert success'
    })

  } catch (err) {

    res.status(500).send({
      error: 'check your code'
    });

  }

};

module.exports = {
  getQuestions,
  postQuestions
};
