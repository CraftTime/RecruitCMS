import request, {request2} from '../utils/request';
import * as AppUrl from '../utils/AppInfo';

//关于相关
export async function listAbout(s, f) {
	let url = AppUrl.API_SERVER_URL + '/about/list';
	return request2(url, {
		method: 'GET',
	}, s, f);
}

export async function deleteAbout(id, s, f) {
	let url = AppUrl.API_SERVER_URL + `/about/delete/${id}`;
	return request2(url, {
		method: 'DELETE',
	}, s, f);
}

export async function updateOrAddAbout(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/about/save';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

//====反馈
export async function listFeedback(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/feedBack/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function updateOrAddFeedback(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/feedBack/save';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}





//下面三个评论相关的都变成通用的
export async function listComment(modal, id, param, s, f) {
	let url = AppUrl.API_SERVER_URL + `/${modal}/comment/${id}/list`;
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	}, s, f);
}


export async function updateCommentStatus(modal, param, s, f) {
	let url = AppUrl.API_SERVER_URL + `/${modal}/comment/updateStatus`;
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(param),
		headers: {
			"Content-Type": "application/json"
		}
	}, s, f);
}

export async function deleteComment(modal, param, s, f) {
	let url = AppUrl.API_SERVER_URL + `/${modal}/comment/delete`;
	return request2(url, {
		method: 'DELETE',
		params: param,
	}, s, f);
}