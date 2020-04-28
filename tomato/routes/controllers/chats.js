/*
  Start of chats Controller



*/
var chatModel = require('../../models').chats;

let moment = require('moment-timezone');

//채팅 기능

var getCurrentTime = function() {

  var date = new Date();

  return moment(date.getTime()).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
  //return today.getHours() +":" + today.getMinutes() +":"+ today.getSeconds();
}

let chatServer = function(io) {
  let chat = io.of('/chat').on('connection', function(socket) {

    socket.on('enter room', function(data) {
      console.log('user id : ', data.name);
      console.log('user enter room number : ', data.roomId);

      let name = socket.name = data.name;
      let roomId = socket.roomId = data.roomId;


      socket.join(roomId);
      chat.to(roomId).emit('enter room', `${name}님께서 입장하셨습니다.`);
    });

    socket.on('chat message', function(data) {
      console.log('message from client: ', data);

      var name = socket.name = data.name;
      var roomId = socket.roomId = data.roomId;

      data.inputTime = getCurrentTime();

      console.log(data.inputTime);
      // room에 join한다
      //socket.join(room);
      // room에 join되어 있는 클라이언트에게 메시지를 전송한다
      chat.to(roomId).emit('chat message', data);
    });
  });
}


//채팅 가져오기
let getChats = async function(req, res, next) {

  try {
    let result = await chatModel.findAll();
    res.json(result);
  } catch (err) {

  }

};

//채팅 삽입
let postChats = async function(req, res, next) {

  //res.send("hihi this is post method");

  try {

    await chatModel.create({
      user_name: req.body.user_name,
      messages: req.body.messages,
      input_time: req.body.input_time,
      users_id: req.body.users_id,
      experts_id: req.body.experts_id
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
  chatServer,
  getChats,
  postChats
}
