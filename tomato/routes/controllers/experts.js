/*
  Start of experts Controller



*/

var expertModel = require('../../models').experts;
var saltModel = require('../../models').salt;

const Op = expertModel.sequelize.Sequelize.Op;

var bcrypt = require('bcryptjs');

let util = require("../common/util");

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


//전문가 가져오기
let getExperts = async function(req, res, next) {


  try {
    let result = await expertModel.findAll()
    //res.json(result);

    res.status(200).json(util.successTrue(200, result));
    //res.status(200).send({message : 'success'});
  } catch (err) {
    console.log(err);
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }

};


//전문가 넣기
let postExperts = async function(req, res, next) {

  //expertModel.create({
  try {

    await expertModel.create({
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: req.body.password,
      service: req.body.service,
      area: req.body.area,
      movable_distance: req.body.movable_distance,
      gender: req.body.gender,
      authentication: req.body.authentication
    })

    res.status(200).json(200, 'insert success');

  } catch (err) {
    console.log(err);
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }

};

//전문가로 회원가입
let postExpertsRegister = async function(req, res, next) {

  try {
    var hashPassword = await bcrypt.hash(req.body.password, salt_value);

    try {
      await expertModel.create({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hashPassword,
        service: req.body.service,
        area: req.body.area,
        movable_distance: req.body.movable_distance,
        gender: req.body.gender,
        authentication: req.body.authentication
      });

    } catch (err) {
      console.log(err);
      res.status(400).json(util.successFalse(400, 'insert error'));
      return;
    }

    res.status(200).json(util.successTrue(200, 'insert success'));

  } catch (err) {
    console.log(err);
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }

};


//전문가 로그인
let postExpertsLogin = async function(req, res, next) {

  try {

    console.log("test");

    let result = await expertModel.findOne({
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
      updateExpertsLoginTime(result.email);
      res.status(200).json(util.successTrue(200, util.makeJWTToken(req.body.email)));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }

};


//전문가 로그인 시간 업데이트
let updateExpertsLoginTime = async function(email) {
  try {
    await expertModel.update({
      login_time: getCurrentDatetime()
    }, {
      where: {
        email: email
      }
    })
  } catch (err) {
    console.log(err);
  }
}

//고수찾기 - 1)	고수찾기에서 고수 리스트 불러오기(10개씩 페이징), 최근 활동순으로
let getExpertsList = async function(req, res, next) {
  try {

    try {

      let result = await expertModel.findAll({
        order: [
          ['login_time', 'DESC'],
          ['id', 'DESC']
        ],
        offset: Number(req.query.offset),
        limit: Number(req.query.limit || 10)
      });

      res.status(200).json(util.successTrue(200, result));
    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}


//고수찾기 - 3)	고수 프로필 가져오기
let getExpertsProfile = async function(req, res, next) {
  try {
    try {
      let result = await expertModel.findOne({
        where: {
          id: req.query.id
        }
      });

      res.status(200).json(util.successTrue(200, result));
    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//고수찾기 - 2)	필터 선택시 (지역, 서비스) 적용하여 리스트 가져오기
let getExpertsAreaService = async function(req, res, next) {

  let result;

  //두개 모두 없을때
  if (req.query.area === undefined && req.query.service === undefined) {
    next();
  } else if (req.query.area === undefined) {
    console.log("position is undefined");

    try {
      result = await expertModel.findAll({
        where: {
          all_service: {
            [Op.like]: '%' + req.query.service + '%'
          }
        },
        offset: Number(req.query.offset),
        limit: Number(req.query.limit)
      });

      res.status(200).json(util.successTrue(200, result));
    } catch (err) {
      console.log(err);
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } else if (req.query.service === undefined) {
    console.log("service is undefined");

    try {
      result = await expertModel.findAll({
        where: {
          area: {
            [Op.like]: '%' + req.query.area + '%'
          }
        },
        offset: Number(req.query.offset),
        limit: Number(req.query.limit)
      });

      res.status(200).json(util.successTrue(200, result));
    } catch (err) {
      console.log(err);
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } else {
    console.log("all have");
    //두개 있을 때
    try {
      result = await expertModel.findAll({
        where: {
          area: {
            [Op.like]: '%' + req.query.area + '%'
          },
          all_service: {
            [Op.like]: '%' + req.query.service + '%'
          }
        },
        offset: Number(req.query.offset),
        limit: Number(req.query.limit)
      });

      res.status(200).json(util.successTrue(200, result));
    } catch (err) {
      console.log(err);
      res.status(400).json(util.successFalse(400, 'check your code'));
    }
  }

}


let getCurrentDatetime = function() {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;

  return dateTime;
}

//전문가-마이페이지-알람시간 수정하기
let putExpertsAlarmTimeEdit = async function(req, res, next) {
  try {
    try {
      let findExpert = await expertModel.findOne({
        where: {
          id: req.body.id
        }
      })

      if (findExpert == null) {
        res.status(400).json(util.successFalse(400, 'Error, Bad Request'));
        return
      }

      await expertModel.update({
        start_alarm_time: req.body.start_alarm_time,
        end_alarm_time: req.body.end_alarm_time
      }, {
        where: {
          id: req.body.id
        }
      });

      console.log(typeof(result));
      res.status(200).json(util.successTrue(200, 'Success'));

    } catch (err) {
      res.status(400).json(util.successFalse(400, 'Bad Request'));
    }

  } catch (err) {
    res.status(500).json(util.seccessFalse(500, 'Internal Server Error'));
  }
};
//전문가-마이페이지-알람시간가져오기
let getExpertsAlarmTime = async function(req, res, next) {
  try {
    let result = await expertModel.findAll({
        attributes: ['start_alarm_time', 'end_alarm_time']
      ,
      where: {
        id: req.query.id
      }}
    );
    res.status(200).json(util.successTrue(200, result));
  } catch (err) {
    console.log(err);
    res.status(500).json(util.seccessFalse(500, 'Internal Server Error'));
  }
};

//전문가-마이페이지-정보공개노출하기
let putExpertsIsExposed = async function(req, res, next) {
  try {
    try {
      let findExpert = await expertModel.findOne({
        where: {
          id: req.body.id
        }
      })

      if (findExpert == null) {
        res.status(400).json(util.successFalse(400, 'Error, Bad Request'));
        return
      }

      await expertModel.update({
        is_exposed: req.body.is_exposed
      }, {
        where: {
          id: req.body.id
        }
      });

      console.log(typeof(result));
      res.status(200).json(util.successTrue(200, 'Success'));

    } catch (err) {
      res.status(400).json(util.successFalse(400, 'Bad Request'));
    }

  } catch (err) {
    res.status(500).json(util.seccessFalse(500, 'Internal Server Error'));
  }
};

//전문가 / 프로필 - 1)	프로필 가져오기
let getExpertsMypage = async function(req, res, next) {
  try {
    let result = await expertModel.findAll({
        attributes: ['name','email','phone_number','password','profile_photo']
      ,
      where: {
        id: req.query.id
      }}
    );
    res.status(200).json(util.successTrue(200, result));
  } catch (err) {
    console.log(err);
    res.status(500).json(util.seccessFalse(500, 'Internal Server Error'));
  }
};

//전문가 / 프로필 - 1)	사진 등록/수정 , 전문가 / 마이페이지 - 1)	사진 등록/수정
let putExpertsProfilePhoto = async function(req, res, next) {

  try {

    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }


      await expertModel.update({
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



//전문가 / 마이페이지 - 이름 수정 , 전문가 / 프로필 - 5)	이름 등록/수정
let putExpertsName = async function(req, res, next) {

  try {

    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }


      await expertModel.update({
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


//전문가 / 마이페이지 - 3)	이메일 등록
let putExpertsEmail = async function(req, res, next) {

  try {

    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }


      await expertModel.update({
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

//전문가 / 마이페이지 -	4)	전화번호 등록/수정
let putExpertsPhoneNumber = async function(req, res, next) {

  try {

    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }


      await expertModel.update({
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

//전문가 / 마이페이지 - 5)	비밀번호 수정 
let putExpertsPassword = async function(req, res, next) {

  try {

    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      var hashPassword = await bcrypt.hash(req.body.password, salt_value);

      await expertModel.update({
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

//전문가 - 계좌정보 가져오기   ???????
let getExpertsAccount = async function(req, res, next) {
  try {
    try{
      let result =  await expertModel.findAll({
        attributes: ['account_bank', 'account_number', 'account_name'],
        where: { id : req.query.id }
      });

      res.status(200).json(util.successTrue(200, result));
    } catch (err) {
      res.status(400).json(util.successFalse(400, 'Bad Request'));
    }
  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Internal Server Error'));
  }
};

//전문가 / 프로필 - 6)	대표서비스 등록/수정
let putExpertsService = async function(req, res, next) {

  try {

    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        service: req.body.service
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

//전문가 / 프로필 - 7)	한줄소개 등록/수정
let putExpertsOneLineDescription = async function(req, res, next) {

  try {
    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        one_line_description: req.body.one_line_description
      }, {
        where: {
          id: req.body.id
        }
      });

      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//전문가 / 프로필 - 9)	활동지역 등록/수정
let putExpertsArea = async function(req, res, next) {

  try {
    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        area: req.body.area
      }, {
        where: {
          id: req.body.id
        }
      });

      //console.log(typeof(result));


      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//전문가 / 프로필 - 10)	이동가능거리 등록/수정
let putExpertsMovableDistance = async function(req, res, next) {

  try {
    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        movable_distance: req.body.movable_distance
      }, {
        where: {
          id: req.body.id
        }
      });

      //console.log(typeof(result));
      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//전문가 / 프로필 - 11)	연락가능시간 등록/수정
let putExpertsContactTime = async function(req, res, next) {

  try {
    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        contact_start_time: req.body.contact_start_time,
        contact_end_time: req.body.contact_end_time
      }, {
        where: {
          id: req.body.id
        }
      });

      //console.log(typeof(result));
      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//전문가 / 프로필 - 13)	경력 등록/수정
let putExpertsCareer = async function(req, res, next) {

  try {
    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        career: req.body.career
      }, {
        where: {
          id: req.body.id
        }
      });

      //console.log(typeof(result));
      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//전문가 / 프로필 - 14)	직원수 등록/수정
let putExpertsNumberOfEmployees = async function(req, res, next) {

  try {
    try {

      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        number_of_employees: req.body.number_of_employees
      }, {
        where: {
          id: req.body.id
        }
      });

      //console.log(typeof(result));
      res.status(200).json(util.successTrue(200, 'update success'));


    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//전문가 / 프로필 - 18)	서비스 상세 설명 등록/수정
let putExpertsServiceDescription = async function(req, res, next) {
  try {
    try {
      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        service_description: req.body.service_description
      }, {
        where: {
          id: req.body.id
        }
      });

      //console.log(typeof(result));
      res.status(200).json(util.successTrue(200, 'update success'));

    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//전문가 / 프로필 - 19)	사진 및 동영상 등록/수정
let putExpertsVideoAndPicture = async function(req, res, next) {
  try {
    try {
      let findUser = await expertModel.findOne({
        where : {
          id : req.body.id
        }
      })

      if(findUser === null) {
        res.status(400).json(util.successFalse(400, 'can not find user'));
        return
      }

      await expertModel.update({
        video_and_picture: req.body.video_and_picture
      }, {
        where: {
          id: req.body.id
        }
      });

      //console.log(typeof(result));
      res.status(200).json(util.successTrue(200, 'update success'));

    } catch (err) {
      res.status(400).json(util.successFalse(400, 'check your code'));
    }

  } catch (err) {
    res.status(500).json(util.successFalse(500, 'Server error! check server code'));
  }
}

//전문가 / 프로필 - 15)	사업자등록증 등록/수정


module.exports = {
  getExperts,
  postExperts,
  postExpertsRegister,
  postExpertsLogin,
  getExpertsList,
  getExpertsProfile,
  getExpertsAreaService,
  getExpertsAlarmTime,
  putExpertsAlarmTimeEdit,
  putExpertsIsExposed,
  getExpertsMypage,
  putExpertsName,
  putExpertsEmail,
  putExpertsPhoneNumber,
  putExpertsPassword,
  putExpertsProfilePhoto,
  getExpertsAccount,
  putExpertsService,
  putExpertsOneLineDescription,
  putExpertsArea,
  putExpertsMovableDistance,
  putExpertsContactTime,
  putExpertsCareer,
  putExpertsNumberOfEmployees,
  putExpertsServiceDescription,
  putExpertsVideoAndPicture
};
