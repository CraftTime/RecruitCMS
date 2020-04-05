import request, {request2} from '../utils/request';
import * as AppUrl from '../utils/AppInfo';

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