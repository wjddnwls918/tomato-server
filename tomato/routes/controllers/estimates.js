/*
  Start of estimates Controller



*/
var estimateModel = require('../../models').estimates;

let models = require('../../models');
let util = require("../common/util");

const Op = models.sequelize.Sequelize.Op;

//견적서 가져오기
let getEstimates = async function(req, res, next) {

  let result = await estimateModel.findAll()
  res.json(result);

};

//견적서 삽입
let postEstimates = async function(req, res, next) {

  try {
    await estimateModel.create({
      title: req.body.title,
      content: req.body.content,
      cost_type: req.body.cost_type,
      experts_id: req.body.experts_id,
      users_id: req.body.users_id,
      cost: req.body.cost
    });

    res.status(200).send({
      message: 'insert succcess'
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: 'check your code'
    });
  }

};

//테스트
let getEstimatesTest = async function(req, res, next) {

  try {
    let result = await models.experts.findAll({
      include: {
        model: models.estimates,
        where  : {requests_id : req.query.requests_id}
      }
    })

    res.status(200).json(util.successTrue(200, result));

  }catch(err) {

    console.log(err);
    res.status(500).json(util.successFalse(500, 'error occured'));
  }

}

//사용자 / 채팅 - 1)	채팅 리스트 가져오기(이름, 소분류, 지역, 설명, 예상금액, 날짜)
//id 내림차순으로 정렬하는거 아직 못했음
let getEstimatesChatList = async function(req,res,next) {
  try {
    let result = await models.estimates.findAll({
      where : {
        users_id : req.query.users_id
      },
      include: [{
        model: models.experts,
        include : [{
          model : models.chats,
          attributes: ['id', 'input_time']
          ,order : [['id', 'DESC']]
        }]

      }]


    });

    res.status(200).json(util.successTrue(200, result));

  }catch(err) {

    console.log(err);
    res.status(500).json(util.successFalse(500, 'error occured'));
  }
}


//전문가 / 받은 요청 - 4)	자주쓰는 견적 메세지 목록 불러오기
let getEstimatesUser = async function(req,res,next) {
  try {
    let result = await models.estimates.findAll({
      where : {
        [Op.and] : [{experts_id : req.query.experts_id}, {frequent_request : '1'}]
      }
    });

    res.status(200).json(util.successTrue(200, result));

  }catch(err) {

    console.log(err);
    res.status(500).json(util.successFalse(500, 'error occured'));
  }
}

//전문가 / 채팅 - 1)	견적서 보낸 요청서 목록 가져오기
let getEstimatesExpert = async function(req,res,next) {

  try {
    let result = await models.estimates.findAll({
      where : {
        experts_id : req.query.experts_id
      },
      include: [{
        model: models.requests,
        include : [{
          model : models.users,
          attributes: ['id', 'name', 'profile_photo']
          ,order : [['id', 'DESC']]
        }]

      }]


    });

    res.status(200).json(util.successTrue(200, result));

  }catch(err) {

    console.log(err);
    res.status(500).json(util.successFalse(500, 'error occured'));
  }

}


module.exports = {
  getEstimates,
  postEstimates,
  getEstimatesTest,
  getEstimatesChatList,
  getEstimatesUser,
  getEstimatesExpert
};
