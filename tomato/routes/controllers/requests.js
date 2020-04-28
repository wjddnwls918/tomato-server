/*
  Start of requests Controller



*/

var requestModel = require('../../models').requests;

let models = require('../../models');

let util = require("../common/util");

const Op = requestModel.sequelize.Sequelize.Op;

//요청서 가져오기
let getRequests = async function(req, res, next) {

  let result = await requestModel.findAll()

  res.json(result);

};

//요청서 삽입
let postRequests = async function(req, res, next) {

  try {
    await requestModel.create({
      answer: req.body.answer,
      section: req.body.section,
      users_id: req.body.users_id,
      is_receive: req.body.is_receive,
      date_time_request: req.body.date_time_request,
      questions_id: req.body.questions_id
    })

    res.status(200).json(util.successTrue(200,'insert success'));

  } catch (err) {

    console.log(err);
    res.status(400).json(util.successFalse(400, 'check your code'));

  }

}


//사용자 / 보낸 요청 - 3)	내가 보낸 요청서 가져오기,  전문가 / 받은 요청 - 2) 요청서 자세히 보여주기
let getRequestsMyRequest = async function(req,res,next) {

  try{

  try {
    let result = await requestModel.findOne({
      where : {
        id : req.query.id
      }
    })

    res.status(200).json(util.successTrue(200,result));

  }catch(err) {
    console.log(err);
    res.status(400).json(util.successTrue(400,'check your code'));
  }
}catch(err) {
  console.log(err);
  res.status(500).json(util.successFalse(500, 'Server error! check server code'));
}
}

//전문가 / 받은 요청 - 1)	요청서 목록 가져오기 (전문가 전체서비스 기준으로)
let getRequestsList = async function(req,res,next) {

  try {

  let array = util.tokenStringToArray(req.query.all_service);

  console.log(typeof(array));
  for(let i = 0; i<array.length; i++){
    console.log(array[i]);
  }

  let result = await requestModel.findAll({
    where : {
      section : {
        [Op.in] : array
      }
    }
  });

  res.status(200).json(util.successTrue(200,result));

}catch(err){
  console.log(err);
    res.status(400).json(util.successTrue(400,'check your code'));
}

}

//보낸 요청 - 1)	보낸 요청 리스트 가져오기(제목, 날짜, 견적서 보낸 고수 이미지, 마감 여부)
let getRequestsUser = async function(req,res,next) {
  try {
    let result = await models.requests.findAll({
      where : {
        users_id : req.query.users_id
      },
      include: [
        {
          model: models.estimates,
          include : [models.experts]
        }
      ]
    });

    console.log(result);

    res.status(200).json(util.successTrue(200,result));
  }catch(err) {
    console.log(err);
    res.status(400).json(util.successTrue(400,'check your code'));
  }
}

//전문가 / 채팅 - 5)	받은 요청서보여주기
let getRequestsChat = async function(req,res,next) {
  try {
    let result = await models.requests.findOne({
      where : {
        id : req.query.id
      }
    });

    console.log(result);

    res.status(200).json(util.successTrue(200,result));
  }catch(err) {
    console.log(err);
    res.status(400).json(util.successTrue(400,'check your code'));
  }
}



module.exports = {
  getRequests,
  postRequests,
  getRequestsMyRequest,
  getRequestsList,
  getRequestsUser,
  getRequestsChat
};
