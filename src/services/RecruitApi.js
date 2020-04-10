import request, {request2} from '../utils/request';
import * as AppUrl from '../utils/AppInfo';

//关于相关
export async function listAbout(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/about/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
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

//=== Option 选项相关

export async function listCity(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/city/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function listAge(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/age/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function updateOrAddAge(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/age/save';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function deleteAge(id, s, f) {
	let url = AppUrl.API_SERVER_URL + `/age/delete/${id}`;
	return request2(url, {
		method: 'DELETE',
	}, s, f);
}


export async function listPosition(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/position/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function listIndustry(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/industry/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function listEducation(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/education/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function listTreatment(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/treatment/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function listWorkDate(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/workDate/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function listCompanyScale(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/scale/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

export async function listSalary(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/salary/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

//通知
export async function listNotification(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/notice/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

//Banner
export async function listBanner(info, success, failed) {
	let url = AppUrl.API_SERVER_URL + '/banner/list';
	return request2(url, {
		method: 'POST',
		body: JSON.stringify(info),
		headers: {
			"Content-Type": "application/json"
		}
	}, success, failed);
}

//================================================================================================================================================================

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