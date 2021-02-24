
//正式服务器 Craft time
// const API_SERVER_URL = '//http://34.229.235.238/recruit/admin';
//一零跳动接口网址
// https://www.onezerobeat.com/recruit/admin/swagger-ui.html
//本地测试服务器
const API_SERVER_URL = 'http://34.229.235.238/recruit/admin/';
// const API_SERVER_URL =  'https://www.onezerobeat.com/recruit/admin';
// const API_SERVER_URL = 'http://192.168.0.109:8856/recruit/admin/';
//
const API_OVERSEASSTUDY_SERVER_URL = 'https://www.yk0591.com/overseasstudy';
const APP_NAME = 'JobPin';
const APP_WEB_TITLE = 'JobPin后台管理系统';
const APP_YEAR = '2020';

//=======================

const IMPORT_HISTORY_SCORE = API_SERVER_URL + '/data/excel/scoreFormula';
const IMPORT_CULTURE_SCORE_RANK = API_SERVER_URL + '/data/excel/scoreRank/culture';
const IMPORT_PROFESSIONAL_SCORE_RANK = API_SERVER_URL + '/data/excel/scoreRank/professional';
const IMPORT_CHINA_SCHOOL = API_SERVER_URL + '/data/excel/chinaSchool';
const IMPORT_SCHOOL_MAJOR = API_SERVER_URL + '/data/excel/professionalBaseScore';
const IMPORT_MAJOR = API_SERVER_URL + '/data/excel/professional';
const IMPORT_BIG_DATA = API_SERVER_URL + '/data/excel/admissionBigdata';
const IMPORT_ENROLMENT = API_SERVER_URL + '/data/excel/admissionPeopleNumber';

const SHOW_C_SCORE = API_SERVER_URL + '/comprehensiveScoreFormula/listAll';
const ADD_C_SCORE = API_SERVER_URL + '/comprehensiveScoreFormula/add';
const UPDATE_C_SCORE = API_SERVER_URL + '/comprehensiveScoreFormula/update';
const DELETE_C_SCORE = API_SERVER_URL + '/comprehensiveScoreFormula/delete';

const ADD_ARTICLE = API_SERVER_URL + '/article/addOrUpdate';
const SHOW_ARTICLE = API_SERVER_URL + '/article';
const GET_CMS_ARTICLE = API_SERVER_URL + '/article';
const DEL_ARTICLE = API_SERVER_URL + '/article/delete';
const GET_ARTICLE_LIST = API_SERVER_URL + '/article/list';
const PARSE_WEI_XIN_ARTICLE = API_SERVER_URL + '/article/parseWeixinArticle';
const IMAGE_UPLOAD = API_SERVER_URL + '/image/upload';
const TEACH_VIDEO_UPLOAD = API_SERVER_URL + '/teachVideo/upload';
const BANNER_LIST = API_SERVER_URL + '/banner/list';
const BANNER_DELETE = API_SERVER_URL + '/banner/delete';
const BANNER_ADD_UPDATE = API_SERVER_URL + '/banner/addOrUpdate';

const STUDIO_DRAW_TYPE_LIST = API_SERVER_URL + '/institutionDrawType/list';
const STUDIO_TEACHER_TYPE_LIST = API_SERVER_URL + '/institutionTeacherType/list';
const STUDIO_VIDEO_TYPE_LIST = API_SERVER_URL + '/institutionVideoType/list';
const STUDIO_LECTURE_TYPE_LIST = API_SERVER_URL + '/institutionLessonType/list';
const STUDIO_IMAGE_TYPE_LIST = API_SERVER_URL + '/institutionImageType/list';
const ADD_OR_UPDATE_STUDIO_LECTURE_TYPE_LIST = API_SERVER_URL + '/institutionLessonType/addOrUpdate';
const ADD_OR_UPDATE_STUDIO_IMAGE_TYPE_LIST = API_SERVER_URL + '/institutionImageType/addOrUpdate';
const ADD_OR_UPDATE_STUDIO_TEACHER_TYPE_LIST = API_SERVER_URL + '/institutionTeacherType/addOrUpdate';
const ADD_OR_UPDATE_STUDIO_VIDEO_TYPE_LIST = API_SERVER_URL + '/institutionVideoType/addOrUpdate';
const ADD_OR_UPDATE_STUDIO_DRAW_TYPE_LIST = API_SERVER_URL + '/institutionDrawType/addOrUpdate';

const STUDIO_TYPE_LIST = API_SERVER_URL + '/institutionType/list';
const STUDIO_IMAGE = API_SERVER_URL + '/institutionImage';  //POST /institutionImage/{institutionId}/list
const UPDATE_STUDIO_APPLY = API_SERVER_URL + '/institutionApply/update';  //POST /institutionImage/{institutionId}/list
const STUDIO_BANNER = API_SERVER_URL + '/institutionBanner';  //POST /institutionBanner/{institutionId}/list
const STUDIO_LECTURE = API_SERVER_URL + '/institutionLesson';  //POST /institutionBanner/{institutionId}/list
const STUDIO_VIDEO = API_SERVER_URL + '/institutionVideo';  //POST /institutionBanner/{institutionId}/list
const STUDIO_DRAW = API_SERVER_URL + '/institutionDraw';  //POST /institutionBanner/{institutionId}/list
const STUDIO_TEACHER = API_SERVER_URL + '/institutionTeacher';  // DELETE /institutionTeacher/delete
const STUDIO_BANNER_DELETE = API_SERVER_URL + '/institutionBanner/delete';
const STUDIO_IMAGE_DELETE = API_SERVER_URL + '/institutionImage/delete';
const STUDIO_LECTURE_DELETE = API_SERVER_URL + '/institutionLesson/delete';
const STUDIO_VIDEO_DELETE = API_SERVER_URL + '/institutionVideo/delete';
const STUDIO_DRAW_DELETE = API_SERVER_URL + '/institutionDraw/delete';
const STUDIO_TEACHER_DELETE = API_SERVER_URL + '/institutionTeacher/delete';
const ADD_OR_UPDATE_STUDIO_TYPE_LIST = API_SERVER_URL + '/institutionType/addOrUpdate';

const STUDIO_LIST = API_SERVER_URL + '/institution/list';
const INSTITUTION_APPLY_LIST = API_SERVER_URL + '/institutionApply/list';
const INSTITUTION_APPLY_DELETE = API_SERVER_URL + '/institutionApply/delete';
const ADD_OR_UPDATE_STUDIO = API_SERVER_URL + '/institution/addOrUpdate';
const GET_APPLY_GUIDER_PRICE = API_SERVER_URL + '/applyGuider/getPrice';
const SET_APPLY_GUIDER_PRICE = API_SERVER_URL + '/applyGuider/setPrice';

const APPLY_GUIDER = API_SERVER_URL + '/applyGuider';
const GET_APPLY_GUIDER_ORDER = API_SERVER_URL + '/applyGuider/listOrder';
const UPDATE_APPLY_GUIDER_ORDER = API_SERVER_URL + '/applyGuider/updateOrder';

const GET_SCHOOL_LIST = API_SERVER_URL + '/chinaSchool/list';
const GET_SCHOOL_PROFESSIONAL = API_SERVER_URL + '/chinaSchool/listProfessional';
const ADMIN_LOGIN = API_SERVER_URL + '/login/username';

export {
	ADMIN_LOGIN,
	GET_SCHOOL_PROFESSIONAL,
	APPLY_GUIDER,
	API_SERVER_URL,
	APP_NAME,
	APP_YEAR,
	IMPORT_HISTORY_SCORE,
	SHOW_C_SCORE,
	IMPORT_CULTURE_SCORE_RANK,
	IMPORT_CHINA_SCHOOL
	,
	IMPORT_SCHOOL_MAJOR,
	IMPORT_MAJOR,
	ADD_C_SCORE,
	DELETE_C_SCORE,
	ADD_ARTICLE,
	SHOW_ARTICLE,
	UPDATE_C_SCORE,
	IMPORT_PROFESSIONAL_SCORE_RANK
	,
	GET_ARTICLE_LIST,
	IMAGE_UPLOAD,
	DEL_ARTICLE,
	GET_CMS_ARTICLE,
	BANNER_LIST,
	BANNER_DELETE,
	BANNER_ADD_UPDATE,
	PARSE_WEI_XIN_ARTICLE,

	STUDIO_TYPE_LIST,
	ADD_OR_UPDATE_STUDIO_TYPE_LIST,
	STUDIO_LIST,
	ADD_OR_UPDATE_STUDIO,
	STUDIO_IMAGE_TYPE_LIST,
	STUDIO_LECTURE_TYPE_LIST,
	STUDIO_TEACHER_TYPE_LIST,
	STUDIO_VIDEO_TYPE_LIST,
	ADD_OR_UPDATE_STUDIO_LECTURE_TYPE_LIST,
	ADD_OR_UPDATE_STUDIO_IMAGE_TYPE_LIST,
	ADD_OR_UPDATE_STUDIO_VIDEO_TYPE_LIST,
	STUDIO_BANNER,
	STUDIO_BANNER_DELETE,
	STUDIO_IMAGE,
	STUDIO_IMAGE_DELETE,
	STUDIO_LECTURE,
	STUDIO_LECTURE_DELETE,
	STUDIO_TEACHER,
	STUDIO_TEACHER_DELETE,
	ADD_OR_UPDATE_STUDIO_TEACHER_TYPE_LIST,
	STUDIO_DRAW_TYPE_LIST,
	STUDIO_DRAW,
	STUDIO_DRAW_DELETE,
	ADD_OR_UPDATE_STUDIO_DRAW_TYPE_LIST,
	STUDIO_VIDEO,
	STUDIO_VIDEO_DELETE,
	INSTITUTION_APPLY_LIST,
	INSTITUTION_APPLY_DELETE,
	UPDATE_STUDIO_APPLY,
	GET_APPLY_GUIDER_PRICE,
	SET_APPLY_GUIDER_PRICE,
	GET_APPLY_GUIDER_ORDER,
	UPDATE_APPLY_GUIDER_ORDER,
	GET_SCHOOL_LIST,
	TEACH_VIDEO_UPLOAD,
	IMPORT_BIG_DATA,
	IMPORT_ENROLMENT,
	API_OVERSEASSTUDY_SERVER_URL
}

