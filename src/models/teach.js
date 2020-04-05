import {
	getTeachVideoTypeList, getTeachImageTypeList, getTeachImageTextTypeList,getTeachImageTextSecondTypeList,
	addOrUpdateTeachVideoType, addOrUpdateTeachImageType, addOrUpdateTeachImageTextType
} from '../services/AppApi';
import * as Data from '../data/data';
import {message} from 'antd';
import {getActionTip} from '../utils/utils';

export default {
	namespace: 'teach',

	state: {
		imageTypeList: [],
		videoTypeList: [],
		imageTextTypeList: [],
	},

	effects: {
		* getImageTypeList(_, {call, put}) {
			const response = yield call(getTeachImageTypeList);
			yield put({
				type: 'saveImageTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getVideoTypeList(_, {call, put}) {
			const response = yield call(getTeachVideoTypeList);
			yield put({
				type: 'saveVideoTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getImageTextTypeList(_, {call, put}) {
			const response = yield call(getTeachImageTextTypeList);
			yield put({
				type: 'saveImageTextTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* getImageTextSecondTypeList({payload}, {call, put}) {
			const response = yield call(getTeachImageTextSecondTypeList, payload.parentTypeId);
			yield put({
				type: 'saveImageTextSecondTypeList',
				payload: Array.isArray(response.response) ? response.response : [],
			});
		},
		* addOrUpdateImageType({payload}, {call, put}) {
			const response = yield call(addOrUpdateTeachImageType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				yield put({
					type: 'getImageTypeList',
				});
				message.success('艺考教学集图库类型' + getActionTip(payload.param.id) + '成功');
			} else {
				message.error('艺考教学集图库类型' + getActionTip(payload.param.id) + '失败');
			}
		},

		* addOrUpdateImageTextType({payload}, {call, put}) {
			const response = yield call(addOrUpdateTeachImageTextType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				yield put({
					type: 'getImageTextTypeList',
				});
				message.success('艺考教学图文类型' + getActionTip(payload.param.id) + '成功');
			} else {
				message.error('艺考教学图文类型' + getActionTip(payload.param.id) + '失败');
			}
		},

		* addOrUpdateVideoType({payload}, {call, put}) {
			const response = yield call(addOrUpdateTeachVideoType, payload.param);

			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				yield put({
					type: 'getVideoTypeList',
				});
				message.success('艺考教学视频类型' + getActionTip(payload.param.id) + '成功');
			} else {
				message.error('艺考教学视频类型' + getActionTip(payload.param.id) + '失败');
			}
		},


	},

	reducers: {
		saveImageTypeList(state, action) {
			return {
				...state,
				imageTypeList: action.payload,
			};
		},
		saveImageTextTypeList(state, action) {
			return {
				...state,
				imageTextTypeList: action.payload,
			};
		},
		saveImageTextSecondTypeList(state, action) {
			return {
				...state,
				imageTextTypeSecondList: action.payload,
			};
		},
		saveVideoTypeList(state, action) {
			return {
				...state,
				videoTypeList: action.payload,
			};
		},
	},

};
