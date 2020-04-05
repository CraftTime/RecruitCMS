import {getBannerList, addOrUpdateBanner, delBanner} from '../services/AppApi';
import {message} from 'antd';

export default {
	namespace: 'banner',

	state: {
		loading: true,
		list: []
	},

	effects: {
		* getList({payload}, {call, put}) {
			const response = yield call(getBannerList, payload.param);
			yield put({
				type: 'saveBannerList',
				payload: response.response,
			});
		},
		* delBanner({payload}, {call, put}) {
			const response = yield call(delBanner, payload.param);
			const param = {
				"pageIndex": 1,
				"pageSize": 10
			};
			yield put({
				type: 'getList',
				payload: {
					param: param
				}
			});
		},

		* addOrUpdate({payload}, {call, put}) {
			const response = yield call(addOrUpdateBanner, payload.param);
			if(response !== undefined && response.meta.code === 0) {
				message.success('广告操作成功');
				const param = {
					"pageIndex": 1,
					"pageSize": 10
				};
				yield put({
					type: 'getList',
					payload: {
						param: param
					}
				});
			} else {
				message.success('广告操作失败');
			}

		}

	},

	reducers: {

		saveBannerList(state, action) {
			return {
				...state,
				loading: false,
				list: action.payload,
			}
		},

		onAddOrUpdateFinish(state, action) {
			return {
				...state,
				loading: false,
			}
		}

	}
}
