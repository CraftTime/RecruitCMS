import request from '../utils/request';
import * as AppUrl from '../utils/AppInfo';
import {message} from 'antd';


export async function addHistoryScore(params) {
	return request(AppUrl.IMPORT_HISTORY_SCORE, {
		method: 'POST',
		body: params,
		headers: {
			"Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryt7oI2MklgBSjWoUP"
		}
	});
}

export async function importExcelFile(url, params) {
	return request(url, {
		method: 'POST',
		body: params,
	});
}


//下面是 综合分相关

export async function getCScoreFormula() {
	return request(AppUrl.SHOW_C_SCORE, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addCScoreFormula(param) {
	return request(AppUrl.ADD_C_SCORE, {
		method: 'POST',
		body: param,
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function updateCScoreFormula(param) {
	return request(AppUrl.UPDATE_C_SCORE, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function deleteCScoreFormula(param) {
	return request(AppUrl.DELETE_C_SCORE, {
		method: 'DELETE',
		params: param,
	});
}

//资讯文章相关
export async function getCMSArticle(param) {
	let url = AppUrl.GET_CMS_ARTICLE + "/" + param;
	return request(url, {
		method: 'GET',
	});
}

export async function changeArticlePublishStatus(articleId, param) {
	let url = AppUrl.SHOW_ARTICLE + "/" + articleId + "/changeStatus?status=" + param;
	return request(url, {
		method: 'POST',
	});
}


export async function addArticle(param) {
	return request(AppUrl.ADD_ARTICLE, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function delArticle(param) {
	return request(AppUrl.DEL_ARTICLE, {
		method: 'DELETE',
		params: param,
	});
}

export async function deleteSchool(param) {
	return request(AppUrl.API_SERVER_URL + '/chinaSchool/delete', {
		method: 'DELETE',
		params: param,
	});
}

export async function deleteChinaSchoolProfessional(param) {
	return request(AppUrl.API_SERVER_URL + '/chinaSchool/deleteProfessional', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function delInstitute(param) {
	return request(AppUrl.API_SERVER_URL + '/institution/delete', {
		method: 'DELETE',
		params: param,
	});
}


export async function showArticle(param) {
	let url = AppUrl.SHOW_ARTICLE + "/" + param;
	return request(url, {
		method: 'GET',
	});
}

export async function getArticleList(param) {
	return request(AppUrl.GET_ARTICLE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getCommentList(param) {
	return request(AppUrl.API_SERVER_URL + '/article/comment/list', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getArticleTypeList() {
	return request(AppUrl.API_SERVER_URL + '/articleType/list', {
		method: 'POST',
	});
}

export async function parseWeiXinArticle(param) {
	let url = AppUrl.PARSE_WEI_XIN_ARTICLE;
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function updateCommentStatus(param) {
	let url = AppUrl.API_SERVER_URL + '/article/comment/updateStatus';
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateArticle(param) {
	return request(AppUrl.GET_ARTICLE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateSchoolProfessional(param) {
	return request(AppUrl.API_SERVER_URL + '/chinaSchool/addProfessional', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateArticleType(param) {
	return request(AppUrl.API_SERVER_URL + '/articleType/addOrUpdate', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getBannerList(param) {
	return request(AppUrl.BANNER_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function delBanner(param) {
	return request(AppUrl.BANNER_DELETE, {
		method: 'DELETE',
		params: param,
	});
}

export async function delArticleComment(param) {
	return request(AppUrl.API_SERVER_URL + '/article/comment/delete', {
		method: 'DELETE',
		params: param,
	});
}

export async function addOrUpdateBanner(param) {
	return request(AppUrl.BANNER_ADD_UPDATE, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}


export async function updateArticleComment(param) {
	return request(AppUrl.API_SERVER_URL + '/article/comment/update', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioBannerList(param) {
	let url = AppUrl.STUDIO_BANNER + "/" + param.studioId + "/list";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.pagination),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioImageList(param) {
	let url = AppUrl.STUDIO_IMAGE + "/" + param.studioId + "/list";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.pagination),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getH5Product(itemType) {
	let url = AppUrl.API_SERVER_URL + `/otherConf/${itemType}/getItemInfo`;
	return request(url, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function setH5Product(itemType, param) {
	let url = AppUrl.API_SERVER_URL + `/otherConf/${itemType}/setItemInfo`;
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateSchoolBaseInfo(param) {
	let url = AppUrl.API_SERVER_URL + '/chinaSchool/addOrUpdate';
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioLectureList(param) {
	let url = AppUrl.STUDIO_LECTURE + "/" + param.studioId + "/list";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.pagination),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioVideoList(param) {
	let url = AppUrl.STUDIO_VIDEO + "/" + param.studioId + "/list";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.pagination),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioDrawList(param) {
	let url = AppUrl.STUDIO_DRAW + "/" + param.studioId + "/list";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.pagination),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioTeacherList(param) {
	let url = AppUrl.STUDIO_TEACHER + "/" + param.studioId + "/list";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.pagination),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioBanner(param) {
	let url = AppUrl.STUDIO_BANNER + "/" + param.studioId + "/addOrUpdate";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.banner),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioImage(param) {
	let url = AppUrl.STUDIO_IMAGE + "/" + param.studioId + "/addOrUpdate";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.image),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function updateStudioApply(param) {
	return request(AppUrl.UPDATE_STUDIO_APPLY, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioLecture(param) {
	let url = AppUrl.STUDIO_LECTURE + "/" + param.studioId + "/addOrUpdate";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.lecture),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioVideo(param) {
	let url = AppUrl.STUDIO_VIDEO + "/" + param.studioId + "/addOrUpdate";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.info),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioDraw(param) {
	let url = AppUrl.STUDIO_DRAW + "/" + param.studioId + "/addOrUpdate";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.info),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioTeacher(param) {
	let url = AppUrl.STUDIO_TEACHER + "/addOrUpdate";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param.teacher),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function deleteStudioBanner(param) {
	return request(AppUrl.STUDIO_BANNER_DELETE, {
		method: 'DELETE',
		params: param,
	});
}

export async function deleteStudioLecture(param) {
	return request(AppUrl.STUDIO_LECTURE_DELETE, {
		method: 'DELETE',
		params: param,
	});
}

export async function deleteStudioVideo(param) {
	return request(AppUrl.STUDIO_VIDEO_DELETE, {
		method: 'DELETE',
		params: param,
	});
}

export async function deleteStudioDraw(param) {
	return request(AppUrl.STUDIO_DRAW_DELETE, {
		method: 'DELETE',
		params: param,
	});
}

export async function deleteStudioTeacher(param) {
	return request(AppUrl.STUDIO_TEACHER_DELETE, {
		method: 'DELETE',
		params: param,
	});
}

export async function deleteStudioImage(param) {
	return request(AppUrl.STUDIO_IMAGE_DELETE, {
		method: 'DELETE',
		params: param,
	});
}


export async function getStudioTypeList() {
	return request(AppUrl.STUDIO_TYPE_LIST, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioImageTypeList(param) {
	return request(AppUrl.STUDIO_IMAGE_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioLectureTypeList(param) {
	return request(AppUrl.STUDIO_LECTURE_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioVideoTypeList(param) {
	return request(AppUrl.STUDIO_VIDEO_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioTeacherTypeList(param) {
	return request(AppUrl.STUDIO_TEACHER_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getStudioDrawTypeList(param) {
	return request(AppUrl.STUDIO_DRAW_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioImageType(param) {
	return request(AppUrl.ADD_OR_UPDATE_STUDIO_IMAGE_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}


export async function addOrUpdateStudioLectureType(param) {
	return request(AppUrl.ADD_OR_UPDATE_STUDIO_LECTURE_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioTeacherType(param) {
	return request(AppUrl.ADD_OR_UPDATE_STUDIO_TEACHER_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioDrawType(param) {
	return request(AppUrl.ADD_OR_UPDATE_STUDIO_DRAW_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudioVideoType(param) {
	return request(AppUrl.ADD_OR_UPDATE_STUDIO_VIDEO_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function deleteCommonType(url, param) {
	let newUrl = AppUrl.API_SERVER_URL + url;
	return request(newUrl, {
		method: 'DELETE',
		params: param,
	});
}

export async function getStudioList(param) {
	return request(AppUrl.STUDIO_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getInstitutionApplyList(param) {
	return request(AppUrl.INSTITUTION_APPLY_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function deleteInstitutionApply(param) {
	return request(AppUrl.INSTITUTION_APPLY_DELETE, {
		method: 'DELETE',
		params: param,
	});
}

export async function addOrUpdateStudioType(param) {
	return request(AppUrl.ADD_OR_UPDATE_STUDIO_TYPE_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateStudio(param) {
	return request(AppUrl.ADD_OR_UPDATE_STUDIO, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

//报考指南

export async function setApplyGuiderPrice(price) {
	return request(AppUrl.SET_APPLY_GUIDER_PRICE + "?price=" + price, {
		method: 'POST',
	});
}

export async function getApplyGuiderPrice() {
	return request(AppUrl.GET_APPLY_GUIDER_PRICE, {
		method: 'GET',
	});
}

export async function getApplyGuiderOrderList(param) {
	return request(AppUrl.GET_APPLY_GUIDER_ORDER, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function setApplyGuiderOrder(param) {
	return request(AppUrl.UPDATE_APPLY_GUIDER_ORDER, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getApplyGuiderEnrollmentList(schoolId, param) {
	return request(AppUrl.APPLY_GUIDER + "/" + schoolId + "/list", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addApplyGuiderEnrollment(schoolId, articleId) {
	return request(AppUrl.APPLY_GUIDER + "/" + schoolId + "/addSchoolArticle" + "?articleId=" + articleId, {
		method: 'POST',
	});
}

export async function deleteApplyGuiderEnrollment(schoolId, articleId) {
	return request(AppUrl.APPLY_GUIDER + "/" + schoolId + "/delSchoolArticle" + "?articleId=" + articleId, {
		method: 'POST',
	});
}

export async function getApplyGuiderStrength(schoolId) {
	return request(AppUrl.APPLY_GUIDER + "/" + schoolId + "/getTeacherArticleId", {
		method: 'POST',
	});
}

export async function getApplyGuiderIntroduce(schoolId) {
	return request(AppUrl.APPLY_GUIDER + "/" + schoolId + "/getSchooldArticleId", {
		method: 'POST',
	});
}

export async function updateApplyGuiderIntroduce(schoolId, articleId) {
	return request(AppUrl.APPLY_GUIDER + "/" + schoolId + "/updateSchooldArticleId" + "?articleId=" + articleId, {
		method: 'POST',
	});
}

export async function updateApplyGuiderStrength(schoolId, articleId) {
	return request(AppUrl.APPLY_GUIDER + "/" + schoolId + "/updateTeacherArticleId" + "?articleId=" + articleId, {
		method: 'POST',
	});
}

export async function getApplyGuiderProfessionArticle(schoolId) {
	return request(AppUrl.APPLY_GUIDER + "/" + schoolId + "/listProfessionalArticle", {
		method: 'POST',
	});
}

export async function addApplyGuiderProfessionArticle(param) {
	return request(AppUrl.APPLY_GUIDER + "/addProfessionalArticle", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

//学校相关
export async function getSchoolList(param) {
	return request(AppUrl.GET_SCHOOL_LIST, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getSchoolProfessionalList(schoolId) {
	return request(AppUrl.GET_SCHOOL_PROFESSIONAL + "?id=" + schoolId, {
		method: 'GET',
	});
}

//基础配置
export async function getExamYear() {
	return request(AppUrl.API_SERVER_URL + "/otherConf/getExamYear", {
		method: 'GET',
	});
}

export async function getCustomerInfo() {
	return request(AppUrl.API_SERVER_URL + "/otherConf/getServicePhone", {
		method: 'GET',
	});
}

export async function setExamYear(year, mount, day) {
	return request(AppUrl.API_SERVER_URL + "/otherConf/setExamYear" + "?year=" + year + "&month=" + mount + "&day=" + day,
		{
			method: 'GET',
		});
}

export async function setCustomerInfo(phone) {
	return request(AppUrl.API_SERVER_URL + "/otherConf/setServicePhone" + `?telephone=${phone}`, {
		method: 'GET',
	});
}

export async function getRemainingDays() {
	return request(AppUrl.API_SERVER_URL + "/otherConf/remainingDays", {
		method: 'GET',
	});
}

//文化分测算

export async function setCultureScorePrice(price, number) {
	return request(AppUrl.API_SERVER_URL + "/cultureScore/setConf" + "?price=" + price + "&number=" + number,
		{
			method: 'POST',
		});
}

export async function getCultureScorePrice(price, number) {
	return request(AppUrl.API_SERVER_URL + "/cultureScore/getConf",
		{
			method: 'GET',
		});
}

export async function getCultureScoreOrderList(param) {
	return request(AppUrl.API_SERVER_URL + "/cultureScore/listOrder", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getCultureScoreCalculationList(param) {
	return request(AppUrl.API_SERVER_URL + "/cultureScore/listRecord", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function updateCultureScoreOrder(param) {
	return request(AppUrl.API_SERVER_URL + "/cultureScore/updateOrder", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

//艺考教学

//GET TYPE
export async function getTeachVideoTypeList() {
	return request(AppUrl.API_SERVER_URL + "/teachVideoType/list", {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getTeachImageTypeList() {
	return request(AppUrl.API_SERVER_URL + "/teachDrawType/list", {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getTeachImageTextTypeList() {
	return request(AppUrl.API_SERVER_URL + "/teachArticleTypeOne/list", {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getTeachImageTextSecondTypeList(parentId) {
	return request(AppUrl.API_SERVER_URL + `/teachArticleTypeTwo/${parentId}/list`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

//addOrUpdate TYPE


export async function addOrUpdateTeachVideoType(param) {
	return request(AppUrl.API_SERVER_URL + "/teachVideoType/addOrUpdate", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateTeachVideo(param) {
	return request(AppUrl.API_SERVER_URL + "/teachVideo/addOrUpdate", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateTeachImageType(param) {
	return request(AppUrl.API_SERVER_URL + "/teachDrawType/addOrUpdate", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateTeachImageTextSecondType(param) {
	return request(AppUrl.API_SERVER_URL + "/teachArticleTypeTwo/addOrUpdate", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateTeachImageTextType(param) {
	return request(AppUrl.API_SERVER_URL + "/teachArticleTypeOne/addOrUpdate", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getTeachVideoList(param) {
	let url = AppUrl.API_SERVER_URL + "/teachVideo/list";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getTeachImageList(param) {
	let url = AppUrl.API_SERVER_URL + "/teachDraw/list";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getTeachImageTextList(param, typeId) {
	let url = AppUrl.API_SERVER_URL + `/teachArticle/${typeId}/list`;
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateTeachImage(param) {
	let url = AppUrl.API_SERVER_URL + "/teachDraw/addOrUpdate";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateTeachImageText(typeId, articleId) {
	let url = AppUrl.API_SERVER_URL + `/teachArticle/${typeId}/addSchoolArticle?articleId=${articleId}`;
	return request(url, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function deleteTeachImageText(typeId, articleId) {
	let url = AppUrl.API_SERVER_URL + `/teachArticle/${typeId}/delSchoolArticle?articleId=${articleId}`;
	return request(url, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function deleteTeachVideo(param) {
	return request(AppUrl.API_SERVER_URL + "/teachVideo/delete", {
		method: 'DELETE',
		params: param,
	});
}


export async function deleteTeachImage(param) {
	return request(AppUrl.API_SERVER_URL + "/teachDraw/delete", {
		method: 'DELETE',
		params: param,
	});
}

export async function deleteTeachImageTextSecondType(param) {
	return request(AppUrl.API_SERVER_URL + "/teachArticleTypeTwo/delete", {
		method: 'DELETE',
		params: param,
	});
}

//用户信息

export async function getUserList(param) {
	return request(AppUrl.API_SERVER_URL + "/users/list", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateUser(param) {
	return request(AppUrl.API_SERVER_URL + "/users/addOrUpdate", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function deleteUser(param) {
	return request(AppUrl.API_SERVER_URL + "/users/delete", {
		method: 'DELETE',
		params: param,
	});
}

//录取测算
export async function getAdmissionOrderList(param) {
	return request(AppUrl.API_SERVER_URL + "/admissionRate/listOrder", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function updateAdmissionOrder(param) {
	return request(AppUrl.API_SERVER_URL + "/admissionRate/updateOrder", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function listAdmissionRateConfig() {
	return request(AppUrl.API_SERVER_URL + "/admissionRate/listConf", {
		method: 'GET',
	});
}

export async function updateAdmissionRateConfig(param) {
	return request(AppUrl.API_SERVER_URL + "/admissionRate/updateConf", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function updateOrAddAdmissionFormula(param) {
	return request(AppUrl.API_SERVER_URL + "/admissionRate/addOrUpdateFormula", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getAdmissionFormulaList(param) {
	return request(AppUrl.API_SERVER_URL + "/admissionRate/formulaList", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}


export async function deleteAdmissionFormula(param) {
	return request(AppUrl.API_SERVER_URL + "/admissionRate/deleteFormula", {
		method: 'DELETE',
		params: param,
	});
}

//学校相关

export async function getChinaSchoolList(param) {
	return request(AppUrl.API_SERVER_URL + "/chinaSchool/list", {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getProfessionalInfo(schoolId, professionalId) {
	return request(AppUrl.API_SERVER_URL + `/admissionRate/professionalInfo?schoolId=${schoolId}&professionalId=${professionalId}`, {
		method: 'POST',
	});
}

export async function getProfessionalFormulaInfo(schoolId, professionalId) {
	return request(AppUrl.API_SERVER_URL + `/admissionRate/professionalFormulaInfo?schoolId=${schoolId}&professionalId=${professionalId}`, {
		method: 'POST',
	});
}

export async function getProfessionalFormulaDetailInfo(formulaId) {
	return request(AppUrl.API_SERVER_URL + `/admissionRate/${formulaId}/formulaDetail`, {
		method: 'POST',
	});
}

export async function updateProfessionalFormula(newFormulaId, srcFormulaId) {
	return request(AppUrl.API_SERVER_URL + `/admissionRate/updateProfessionalFormula?scoreFormulaId=${srcFormulaId}&formulaListId=${newFormulaId}`, {
		method: 'POST',
	});
}

//导入导出

export async function exportBigDataExcel() {
	let url = AppUrl.API_SERVER_URL + '/data/excel/exportAdmissionBigdataExcel';
	return request(url, {
		method: 'GET',
	});
}

export async function exportAdmissionPeopleNumberExcel() {
	let url = AppUrl.API_SERVER_URL + '/data/excel/exportAdmissionPeopleNumberExcel';
	return request(url, {
		method: 'GET',
	});
}


export async function exportProfessionalExcel() {
	let url = AppUrl.API_SERVER_URL + '/data/excel/exportProfessionalExcel';
	return request(url, {
		method: 'GET',
	});
}

export async function exportSchoolExcel() {
	let url = AppUrl.API_SERVER_URL + '/data/excel/exportSchoolExcel';
	return request(url, {
		method: 'GET',
	});
}

export async function exportSchoolProfessionExcel() {
	let url = AppUrl.API_SERVER_URL + '/data/excel/exportSchoolProfessionExcel';
	return request(url, {
		method: 'GET',
	});
}

export async function exportAllScoreExcel() {
	let url = AppUrl.API_SERVER_URL + '/data/excel/exportScoreFormulaExcel';
	return request(url, {
		method: 'GET',
	});
}

//文化分一分一段表
export async function exportCultureScoreExcel() {
	let url = AppUrl.API_SERVER_URL + '/data/excel/culture/exportScoreExcel';
	return request(url, {
		method: 'GET',
	});
}

//专业分一分一段表
export async function exportProfessionalScoreExcel() {
	let url = AppUrl.API_SERVER_URL + '/data/excel/professional/exportScoreExcel';
	return request(url, {
		method: 'GET',
	});
}

export async function exportUserListExcel() {
	let url = AppUrl.API_SERVER_URL + '/users/exportExcel';
	return request(url, {
		method: 'GET',
	});
}

export async function exportAdmissionRateRecordsExcel() {
	let url = AppUrl.API_SERVER_URL + '/admissionRate/exportExcel';
	return request(url, {
		method: 'GET',
	});
}

export async function exportCultureScoreRecordsExcel() {
	let url = AppUrl.API_SERVER_URL + '/cultureScore/exportExcel';
	return request(url, {
		method: 'GET',
	});
}

//专业列表选项

export async function getProfessionalList(param) {
	return request(AppUrl.API_SERVER_URL + '/professional/list', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdateProfessional(param) {
	return request(AppUrl.API_SERVER_URL + '/professional/addOrUpdate', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function deleteProfessional(param) {
	return request(AppUrl.API_SERVER_URL + '/professional/delete', {
		method: 'DELETE',
		params: param,
	});
}

//院校的成绩管理
export async function getSchoolAllScore(schoolId) {
	return request(AppUrl.API_SERVER_URL + `/chinaSchool/listAllScore?id=${schoolId}`, {
		method: 'GET',
	});
}


export async function deleteSchoolScore(param) {
	return request(AppUrl.API_SERVER_URL + '/chinaSchool/deleteScore', {
		method: 'DELETE',
		params: param,
	});
}

export async function addOrUpdateSchoolScore(param) {
	return request(AppUrl.API_SERVER_URL + '/chinaSchool/addOrUpdateScore', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}


//促销
export async function getPromotionList(param) {
	return request(AppUrl.API_SERVER_URL + '/saleConf/list', {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function updatePromotionStatus(param) {
	return request(AppUrl.API_SERVER_URL + `/saleConf/changeStatus?id=${param.id}&status=${param.status}`, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function addOrUpdatePromotion(param) {
	return request(AppUrl.API_SERVER_URL + `/saleConf/addOrUpdate`, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}


export async function deletePromotion(param) {
	return request(AppUrl.API_SERVER_URL + '/saleConf/delete', {
		method: 'DELETE',
		params: param,
	});
}


//

export async function getSignList(param) {
	let url = AppUrl.API_OVERSEASSTUDY_SERVER_URL + "/sign/orders/pagination";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function getSignPrice() {
	let url = AppUrl.API_OVERSEASSTUDY_SERVER_URL + "/sign/price";
	return request(url, {
		method: 'GET'
	});
}

export async function updateSignPrice(param) {
	let url = AppUrl.API_OVERSEASSTUDY_SERVER_URL + "/sign/price";
	return request(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export async function login(username, password) {
	const url = `${AppUrl.ADMIN_LOGIN}?username=${username}&password=${password}`;
	return request(url, {
		method: 'POST',
	});
}