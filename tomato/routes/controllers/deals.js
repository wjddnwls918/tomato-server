/*
  Start of deals Controller



*/

var dealModel = require('../../models').deals;


//거래 가져오기
let getDeals = async function(req, res, next) {

  try {
    let result = await dealModel.findAll();
    res.json(result);
  } catch (err) {

  }


};

//거래 삽입
let postDeals = async function(req, res, next) {

  //res.send("hihi this is post method");

  try {

    await dealModel.create({
      account_number: req.body.account_number,
      account_bank: req.body.account_bank,
      account_name: req.body.account_name,
      estimates_id: req.body.estimates_id,
      safe_deals: req.body.safe_deals,
      deal_dates: req.body.deal_dates
    });

    res.status(200).send({
      message: 'insert success'
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: 'check your code'
    });
  }


}

module.exports = {
  getDeals,
  postDeals
};
