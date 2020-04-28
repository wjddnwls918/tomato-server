/*
  Start of users Controller



*/

var userModel = require('../../models').users;
var saltModel = require('../../models').salt;
var models = require('../../models');

var bcrypt = require('bcryptjs');
//let crypto = require('crypto');

//const {User} = require('../models');

let jwt = require('jsonwebtoken');

let util = require("../common/util");

const Op = userModel.sequelize.Sequelize.Op;

let salt_value;

let setSalt = async function() {
  let result = await saltModel.findOne();
  //let result = await crypto.randomBytes(32);

  if (result === null) {
    try {

      //let salt = await crypto.randomBytes(32);
      let salt = await bcrypt.genSalt(10);

      await saltModel.create({
        salt_value: salt
      })

      console.log(salt);
      salt_value = salt;
      //return salt.salt_value;

    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("already exist : " + result.salt_value);
    //return result.salt_value;
    salt_value = result.salt_value;
  }

}


let salt = setSalt();
//let salt = 10;


//전체 사용자 조회
let getUsers = async function(req, res, next) {

  try {
    let result = await userModel.findAll();

    //let result = await userModel.sequelize.query("select * from `users`");

    //  res.status(200);
    res.status(200).json(util.successTrue(200, result));
    //res.status(200).send({message : 'success'});
  } catch (err) {
    console.log(err);
    res.status(500).json(util.successFalse(500, 'error occured'));
  }


};


//사용자 회원가입
let postUsers = async function(req, res, next) {

  console.log("hihi");

  console.log("check : " + salt_value);

  try {

    /*var hashPassword = await crypto.pbkdf2(req.body.password,salt,
    100,64,'sha512')*/
    var hashPassword = await bcrypt.hash(req.body.password, salt_value);

    try {
      await userModel.create({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hashPassword
      });

    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: 'insert error'
      });
      return;
    }

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

//사용자 로그인
let postUsersLogin = async function(req, res, next) {

  try {

    console.log("test");

    let result = await userModel.findOne({
      where: {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt_value)
      }
    });

    //console.log(result);
    //console.log(typeof(result));

    if (result === null) {
      res.status(400).json(util.successFalse(400, 'you can not login'));
    } else {
      res.status(200).json(util.successTrue(200, util.makeJWTToken(req.body.email)));
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: 'check your code'
    });
  }

};

//사용자 / 마이페이지 - 1)	프로필 정보 가져오기
let getUsersProfile = async function(req, res, next) {

  try {

    try {
      let result = await userModel.findOne({
        where: {
          id: req.query.id
        }
      })

      res.status(200).json(util.successTrue(200, result));

    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }

}

//사용자 / 마이페이지 - 3)	이름 수정
let putUsersName = async function(req, res, next) {

  try {

    try {

      let findUser = await userModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }


      await userModel.update({
        name: req.body.name
      }, {
        where: {
          id: req.body.id
        }
      });

      console.log(typeof(result));


      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }


}

//사용자 / 마이페이지 - 4)	이메일 수정
let putUsersEmail = async function(req, res, next) {

  try {

    try {

      let findUser = await userModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }


      await userModel.update({
        email: req.body.email
      }, {
        where: {
          id: req.body.id
        }
      });

      console.log(typeof(result));


      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      console.log(err);

      if(err.name == 'SequelizeUniqueConstraintError') {
        res.status(400).json(util.successFalse(400, 'email already exist'));
        return;
      }

      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }


}

//사용자 / 마이페이지 - 5)	전화번호 수정
let putUsersPhoneNumber = async function(req, res, next) {

  try {

    try {

      let findUser = await userModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }


      await userModel.update({
        phone_number: req.body.phone_number
      }, {
        where: {
          id: req.body.id
        }
      });

      //console.log(typeof(result));


      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      console.log(err);

      if(err.name == 'SequelizeUniqueConstraintError') {
        res.status(400).json(util.successFalse(400, 'phone_number already exist'));
        return;
      }

      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }


}

//사용자 / 마이페이지 - 6)	비밀번호 수정
let putUsersPassword = async function(req, res, next) {

  try {

    try {

      let findUser = await userModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      var hashPassword = await bcrypt.hash(req.body.password, salt_value);

      await userModel.update({
        password: hashPassword
      }, {
        where: {
          id: req.body.id
        }
      });

      console.log(typeof(result));


      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }


}

//사용자 / 마이페이지 - 2)	사진 수정
let putUsersProfilePhoto = async function(req, res, next) {

  try {

    try {

      let findUser = await userModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await userModel.update({
        profile_photo: req.body.profile_photo
      }, {
        where: {
          id: req.body.id
        }
      });

      console.log(typeof(result));


      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }


}


//테스트
let getUsersTest = async function(req, res ,next) {

    try {
      let result = await models.users.findAll({
        include: {
          model: models.reviews,
          where  : {users_id : req.query.users_id}
        }
      })

      res.status(200).json(util.successTrue(200, result));

    }catch(err) {

      console.log(err);
      res.status(500).json(util.successFalse(500, 'error occured'));
    }

}

//

module.exports = {
  getUsers,
  postUsers,
  postUsersLogin,
  getUsersProfile,
  putUsersName,
  putUsersEmail,
  putUsersPhoneNumber,
  putUsersPassword,
  putUsersProfilePhoto,
  getUsersTest
};
