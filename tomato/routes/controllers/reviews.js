/*
  Start of reviews Controller



*/

var reviewModel = require('../../models').reviews;
var models = require('../../models');

let util = require("../common/util");

//리뷰 가져오기
let getReviews = async function(req, res, next) {

  let result = await reviewModel.findAll()

  res.json(result);
};

//사용자 / 채팅 - 6)	리뷰 작성하기
let postReviews = async function(req, res, next) {

  try {
    await reviewModel.create({
      score: req.body.score,
      review: req.body.review,
      users_id: req.body.users_id,
      experts_id: req.body.experts_id
    })
    res.status(200).send({
      message: 'insert success'
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: 'check your code'
    })
  }

}

//채팅 -


//전문가 / 프로필 - 3)	리뷰 평점, 리뷰수, 고용수 가져오기
let getReviewsExpertAverage = async function(req,res,next) {

  try {
    let result = await reviewModel.findAll({
      attributes : [ [reviewModel.sequelize.fn('avg', reviewModel.sequelize.col('score')),'average' ],
    [reviewModel.sequelize.fn('count', reviewModel.sequelize.col('id')),'count' ],
     ]
      ,where : {
        experts_id : req.query.experts_id
      }
    });

    //let result = await userModel.sequelize.query("select * from `users`");

    //  res.status(200);
    res.status(200).json(util.successTrue(200, result));
    //res.status(200).send({message : 'success'});
  } catch (err) {
    console.log(err);
    res.status(500).json(util.successFalse(500, 'error occured'));
  }

}


module.exports = {
  getReviews,
  postReviews,
  getReviewsExpertAverage,

};
