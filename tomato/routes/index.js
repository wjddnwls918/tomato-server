var express = require('express');
var router = express.Router();


let commonController = require('./controllers/common');
let categoriesController = require('./controllers/categories');
let chatsController = require('./controllers/chats');
let dealsController = require('./controllers/deals');
let estimatesController = require('./controllers/estimates');
let expertsController = require('./controllers/experts');
let questionsControler = require('./controllers/questions');
let requestsController = require('./controllers/requests');
let reviewsController = require('./controllers/reviews');
let usersController = require('./controllers/users')

let jwt = require('jsonwebtoken');

let util = require("./common/util");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/*common 라우팅 로직*/


/*categories 라우팅 로직*/

//카테고리 조회
router.get('/categories', util.isLoggedin, categoriesController.getCategories);

//카테고리 넣기
router.post('/categories', util.isLoggedin, categoriesController.postCategories);

//사용자 / 홈 - 7) 검색창에서 인기서비스(소분류) 10개 가져오기
router.get('/categories/topten', util.isLoggedin, categoriesController.getCategoriesTopten);

//사용자 / 홈 - 2) 해당 대분류에 해당하는 인기 소분류 리스트 불러오기(9개)
router.get('/categories/popular-section', util.isLoggedin, categoriesController.getCategoriesPopularSection);

//사용자 / 홈 - 3) 소분류 클릭시 별점, 활동 고수, 누적 요청서, 리뷰수, 한줄 소개 가져오기
router.get('/categories/section-info', util.isLoggedin, categoriesController.getCategoriesSectionInfo);

//사용자 / 홈 - 1) 해당 대분류에 해당하는 중분류, 소분류 불러오기
router.get('/categories/division/section', util.isLoggedin, categoriesController.getDivisionAndSection);


/*chats 라우팅 로직*/

//채팅 기능
router.get('/chat', util.isLoggedin, chatsController.getChats);

//채팅 조회
router.get('/chats', util.isLoggedin, chatsController.getChats);

//채팅 넣기
router.post('/chats', util.isLoggedin, chatsController.postChats);

/*deals 라우팅 로직*/

//거래 조회
router.get('/deals', util.isLoggedin, dealsController.getDeals);

//거래 넣기
router.post('/deals', util.isLoggedin, dealsController.postDeals);

/*estimates 라우팅 로직*/

//견적서 조회
router.get('/estimates', util.isLoggedin, estimatesController.getEstimates);

//견적서 넣기
router.post('/estimates', util.isLoggedin, estimatesController.postEstimates);

//테스트
router.get('/estimates/test', util.isLoggedin, estimatesController.getEstimatesTest)

//사용자 / 채팅 - 1)	채팅 리스트 가져오기(이름, 소분류, 지역, 설명, 예상금액, 날짜)
router.get('/estimates/chat-list', util.isLoggedin, estimatesController.getEstimatesChatList)

//전문가 / 받은 요청 - 4)	자주쓰는 견적 메세지 목록 불러오기
router.get('/estimates/user', util.isLoggedin, estimatesController.getEstimatesUser)

//전문가 / 채팅 - 1)	견적서 보낸 요청서 목록 가져오기
router.get('/estimates/expert', util.isLoggedin, estimatesController.getEstimatesExpert)

/*experts 라우팅 로직*/

//전문가 조회
router.get('/experts', util.isLoggedin, expertsController.getExperts);

//전문가 넣기
router.post('/experts', expertsController.postExperts);

//전문가 회원가입
router.post('/experts/register', expertsController.postExpertsRegister);

//전문가 로그인
router.post('/experts/login', expertsController.postExpertsLogin);

//사용자 / 고수찾기 - 1)	고수찾기에서 고수 리스트 불러오기(10개씩 페이징), 최근 활동순으로
router.get('/experts/list', util.isLoggedin, expertsController.getExpertsList);

//사용자 / 고수찾기 - 3)	고수 프로필 가져오기
router.get('/experts/profile', util.isLoggedin, expertsController.getExpertsProfile);

//사용자 / 고수찾기 - 2)	필터 선택시 (지역, 서비스) 적용하여 리스트 가져오기
router.get('/experts/area/service', util.isLoggedin, expertsController.getExpertsAreaService, expertsController.getExpertsList);

//전문가-마이페이지-알람시간변경하기
router.put('/experts/mypage/alarm', util.isLoggedin, expertsController.putExpertsAlarmTimeEdit);

//전문가-마이페이지-알람시간가져오기
router.get('/experts/mypage/alarm', expertsController.getExpertsAlarmTime);

//전문가-정보공개 노출 on
router.put('/experts/is-exposed', util.isLoggedin, expertsController.putExpertsIsExposed);

//전문가 / 프로필 - 1)	프로필 가져오기
router.get('/experts/mypage', expertsController.getExpertsMypage);

//전문가- 마이페이지 - 이름 수정
router.put('/experts/name', expertsController.putExpertsName);

//전문가 / 마이페이지 - 3)	이메일 등록
router.put('/experts/email', expertsController.putExpertsEmail);

//전문가 / 마이페이지 -	4)	전화번호 등록/수정
router.put('/experts/phone-number', expertsController.putExpertsPhoneNumber);

//전문가 마이페이지 - 비밀번호 수정
router.put('/experts/password', expertsController.putExpertsPassword);

//전문가 / 프로필 - 1)	사진 등록/수정 , 전문가 / 마이페이지 - 1)	사진 등록/수정
router.put('/experts/profile-photo', expertsController.putExpertsProfilePhoto);

//전문가  마이페이지 - 계좌정보 가져오기
router.get('/experts/account', expertsController.getExpertsAccount);

//전문가 / 프로필 - 6)	대표서비스 등록/수정
router.put('/experts/service', expertsController.putExpertsService);

//전문가 / 프로필 - 7)	한줄소개 등록/수정
router.put('/experts/one-line-description',util.isLoggedin, expertsController.putExpertsServiceDescription )

//전문가 / 프로필 - 9)	활동지역 등록/수정
router.put('/experts/area',util.isLoggedin, expertsController.putExpertsArea )

//전문가 / 프로필 - 10)	이동가능거리 등록/수정
router.put('/experts/movable-distance', util.isLoggedin, expertsController.putExpertsMovableDistance )

//전문가 / 프로필 - 11)	연락가능시간 등록/수정
router.put('/experts/contact-time', util.isLoggedin, expertsController.putExpertsContactTime )

//전문가 / 프로필 - 13)	경력 등록/수정
router.put('/experts/career', util.isLoggedin, expertsController.putExpertsCareer )

//전문가 / 프로필 - 14)	직원수 등록/수정
router.put('/experts/number-of-employees', util.isLoggedin, expertsController.putExpertsNumberOfEmployees )

//전문가 / 프로필 - 18)	서비스 상세 설명 등록/수정
router.put('/experts/service-description', util.isLoggedin, expertsController.putExpertsServiceDescription )

//전문가 / 프로필 - 19)	사진 및 동영상 등록/수정
router.put('/experts/video-and-picture', util.isLoggedin, expertsController.putExpertsVideoAndPicture )


/*questions 라우팅 로직*/

//요청서 질문 조회
router.get('/questions', util.isLoggedin, questionsControler.getQuestions);

//요청서 질문 넣기
router.post('/questions', util.isLoggedin, questionsControler.postQuestions);

/*requests 라우팅 로직*/

//요청서 조회
router.get('/requests', util.isLoggedin, requestsController.getRequests);

//요청서 넣기
router.post('/requests', util.isLoggedin, requestsController.postRequests);

//사용자 / 보낸 요청 - 3)	내가 보낸 요청서 가져오기
router.get('/requests/my-request', util.isLoggedin, requestsController.getRequestsMyRequest);

//전문가 / 받은 요청 - 1)	요청서 목록 가져오기 (전문가 전체서비스 기준으로)
router.get('/requests/list', util.isLoggedin, requestsController.getRequestsList);

//사용자 / 보낸 요청 - 1)	보낸 요청 리스트 가져오기(제목, 날짜, 견적서 보낸 고수 이미지, 마감 여부)
router.get('/requests/user', util.isLoggedin, requestsController.getRequestsUser);

//전문가 / 채팅 - 5)	받은 요청서보여주기
router.get('/requests/chat', util.isLoggedin, requestsController.getRequestsChat);

/*reviews 라우팅 로직*/

//리뷰 조회
router.get('/reviews', util.isLoggedin, reviewsController.getReviews);

//사용자 / 채팅 - 6)	리뷰 작성하기
router.post('/reviews', util.isLoggedin, reviewsController.postReviews);

//전문가 / 프로필 - 3)	리뷰 평점, 리뷰수, 고용수 가져오기
router.get('/reviews/expert-average', util.isLoggedin, reviewsController.getReviewsExpertAverage);


/*users 라우팅 로직*/

//사용자 조회
router.get('/users', util.isLoggedin, usersController.getUsers);

//회원 가입
router.post('/users', usersController.postUsers);

//사용자 로그인
router.post('/users/login', usersController.postUsersLogin);

//사용자 / 마이페이지 - 1)	프로필 정보 가져오기
router.get('/users/profile', util.isLoggedin, usersController.getUsersProfile);

//사용자 / 마이페이지 - 3)	이름 수정
router.put('/users/name', util.isLoggedin, usersController.putUsersName);

//사용자 / 마이페이지 - 4)	이메일 수정
router.put('/users/email', util.isLoggedin, usersController.putUsersEmail);

//사용자 / 마이페이지 - 5)	전화번호 수정
router.put('/users/phone-number', util.isLoggedin, usersController.putUsersPhoneNumber);

//사용자 / 마이페이지 - 6)	비밀번호 수정
router.put('/users/password', util.isLoggedin, usersController.putUsersPassword);

//사용자 / 마이페이지 - 2)	사진 수정
router.put('/users/profile-photo', util.isLoggedin, usersController.putUsersProfilePhoto);

//테스트
router.get('/users/test', util.isLoggedin, usersController.getUsersTest);



module.exports = router;
