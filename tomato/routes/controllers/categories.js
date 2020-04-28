/*
  Start of categories Controller



*/
var categoryModel = require('../../models').categories;

let util = require("../common/util");


//카테고리 조회
let getCategories = async function(req, res, next) {

  try {

    let result = await categoryModel.findAll()

    res.status(200).json(util.successTrue(200,result));

  } catch (err) {
    res.status(500).json(util.successFalse(500,'Server error! check server code'));
  }
};

//카테고리 삽입
let postCategories = async function(req, res, next) {

  try {
    await categoryModel.create({
      category: req.body.category,
      division: req.body.division,
      section: req.body.section,
      comment: req.body.comment
    })

    res.status(200).json(util.successTrue(200,'insert success'));

  } catch (err) {

    res.status(500).json(util.successFalse(500,'Server error! check server code'));

  };

}

//홈 - 7)	검색창에서 인기서비스(소분류) 10개 가져오기
let getCategoriesTopten = async function(req, res, next) {
  try {
    try {
      let result = await categoryModel.findAll({
        order: [
          ['request_count', 'DESC']
        ],
        limit: 10
      })
      res.status(200).json(util.successTrue(200,result));
    } catch (err) {
      console.log(err);

      res.status(400).json(util.successFalse(400,'check your code'));

      return;
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500,'Server error! check server code'));
  }
}

//홈 - 2) 해당 대분류에 해당하는 인기 소분류 리스트 불러오기(9개)
let getCategoriesPopularSection = async function(req, res, next) {

  try {
    try {
      let result = await categoryModel.findAll({
        where: {
          category: req.query.category
        },
        order: [
          ['request_count', 'DESC']
        ],
        limit: 9
      })
      res.status(200).json(util.successTrue(200,result));
    } catch (err) {
      console.log(err);
      res.status(400).json(util.successFalse(400,'check your code'));
      return;
    }
  } catch (err) {
    res.status(500).json(util.successFalse(500,'Server error! check server code'));
  }

}

//홈 - 3) 소분류 클릭시 별점, 활동 고수, 누적 요청서, 리뷰수, 한줄 소개 가져오기
let getCategoriesSectionInfo = async function(req, res, next) {

  try {
    try {
      let result = await categoryModel.findOne({
        where: {
          section: req.query.section
        }
      })
      res.status(200).json(util.successTrue(200,result));
    } catch (err) {
      console.log(err);
      res.status(400).json(util.successFalse(400,'check your code'));
      return;
    }
  } catch (err) {
    res.status(500).json(util.successFalse(500,'Server error! check server code'));
  }

}

//홈 - 1) 해당 대분류에 해당하는 중분류, 소분류 불러오기
let getDivisionAndSection = async function(req, res, next) {

  let category = req.query.category;

  try {

    try {
      let result = await categoryModel.findAll({
        attributes: ['division', 'section'],
        where: {
          category: category
        }
      })

      res.status(200).json(util.successTrue(200,result));

    } catch (err) {
      res.status(400).json(util.successFalse(400,'check your code'));
      return;
    }
  } catch (err) {
    res.status(500).json(util.successFalse(500,'Server error! check server code'));
  }

}



module.exports = {
  getCategories,
  postCategories,
  getCategoriesTopten,
  getCategoriesPopularSection,
  getCategoriesSectionInfo,
  getDivisionAndSection
};
