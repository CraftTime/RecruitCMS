import {
	getStudioTypeList, getStudioBannerList,
	getStudioImageTypeList, getStudioLectureTypeList, getStudioVideoTypeList, getStudioTeacherTypeList, getStudioDrawTypeList,
	addOrUpdateStudioType, addOrUpdateStudioImageType, addOrUpdateStudioLectureType, addOrUpdateStudioVideoType, addOrUpdateStudioTeacherType,
	addOrUpdateStudioDrawType
} from '../services/AppApi';
import * as Data from '../data/data';
import {message} from 'antd';
import {getActionTip} from '../utils/utils';

export default {
	namespace: 'studio',

	state: {
		typeList: [],
		imageTypeList: [],
		lectureTypeList: [],
		videoTypeList: [],
		teacherTypeList: [],
		drawTypeList: [],
		bannerList: [],

	},

	effects: {
		* getBannerList({payload}, {call, put}) {
			const response = yield call(getStudioBannerList, payload.param);
			yield put({
				type: 'saveBannerList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getTypeList(_, {call, put}) {
			const response = yield call(getStudioTypeList);
			yield put({
				type: 'saveTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getImageTypeList({param}, {call, put}) {
			const response = yield call(getStudioImageTypeList, param);
			yield put({
				type: 'saveImageTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getVideoTypeList({param}, {call, put}) {
			const response = yield call(getStudioVideoTypeList, param);
			yield put({
				type: 'saveVideoTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getLectureTypeList({param}, {call, put}) {
			const response = yield call(getStudioLectureTypeList, param);
			yield put({
				type: 'saveLectureTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getTeacherTypeList({param}, {call, put}) {
			const response = yield call(getStudioTeacherTypeList, param);
			yield put({
				type: 'saveTeacherTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getDrawTypeList({param}, {call, put}) {
			const response = yield call(getStudioDrawTypeList, param);
			yield put({
				type: 'saveDrawTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* addOrUpdateTypeList({payload}, {call, put}) {
			const response = yield call(addOrUpdateStudioType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {

			} else {

			}
			yield put({
				type: 'saveTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* addOrUpdateImageTypeList({payload}, {call, put}) {
			const response = yield call(addOrUpdateStudioImageType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				yield put({
					type: 'getImageTypeList',
					param: {
						institutionId: payload.param.institutionId
					}

				});
				message.success('画室图集类型' + getActionTip(payload.param.id) + '成功');
			} else {
				message.error('画室图集类型' + getActionTip(payload.param.id) + '失败');
			}
		},

		* addOrUpdateLectureTypeList({payload}, {call, put}) {
			const response = yield call(addOrUpdateStudioLectureType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				yield put({
					type: 'getLectureTypeList',
					param: {
						institutionId: payload.param.institutionId
					}
				});
				message.success('画室课程类型' + getActionTip(payload.param.id) + '成功');
			} else {
				message.error('画室课程类型' + getActionTip(payload.param.id) + '失败');
			}
		},

		* addOrUpdateTeacherTypeList({payload}, {call, put}) {
			const response = yield call(addOrUpdateStudioTeacherType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				yield put({
					type: 'getTeacherTypeList',
					param: {
						institutionId: payload.param.institutionId
					}
				});
				message.success('教师类型类型' + getActionTip(payload.param.id) + '成功');
			} else {
				message.error('教师类型类型' + getActionTip(payload.param.id) + '失败');
			}
		},
		* addOrUpdateDrawTypeList({payload}, {call, put}) {
			const response = yield call(addOrUpdateStudioDrawType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				yield put({
					type: 'getDrawTypeList',
					param: {
						institutionId: payload.param.institutionId
					}
				});
				message.success('优秀范画类型' + getActionTip(payload.param.id) + '成功');
			} else {
				message.error('优秀范画类型' + getActionTip(payload.param.id) + '失败');
			}
		},

		* addOrUpdateVideoTypeList({payload}, {call, put}) {
			const response = yield call(addOrUpdateStudioVideoType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				yield put({
					type: 'getVideoTypeList',
					param: {
						institutionId: payload.param.institutionId
					}
				});
				message.success('画室视频类型' + getActionTip(payload.param.id) + '成功');
			} else {
				message.error('画室视频类型' + getActionTip(payload.param.id) + '失败');
			}
		},


	},

	reducers: {
		saveBannerList(state, action) {
			return {
				...state,
				typeList: action.payload,
			};
		},
		saveTypeList(state, action) {
			return {
				...state,
				typeList: action.payload,
			};
		},
		saveImageTypeList(state, action) {
			return {
				...state,
				imageTypeList: action.payload,
			};
		},
		saveLectureTypeList(state, action) {
			return {
				...state,
				lectureTypeList: action.payload,
			};
		},
		saveVideoTypeList(state, action) {
			return {
				...state,
				videoTypeList: action.payload,
			};
		},
		saveTeacherTypeList(state, action) {
			return {
				...state,
				teacherTypeList: action.payload,
			};
		},
		saveDrawTypeList(state, action) {
			return {
				...state,
				drawTypeList: action.payload,
			};
		},
		saveBannerList(state, action) {
			return {
				...state,
				bannerList: action.payload,
			};
		},
	},

};
