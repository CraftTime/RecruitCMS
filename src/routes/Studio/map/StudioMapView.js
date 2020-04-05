import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message} from 'antd';
import MapView from '../../../components/AMap/MapView';
import * as Data from '../../../data/data';
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';

const FormItem = Form.Item;
const {TextArea} = Input;

const DEF_MAP = {
	position: '福州',
	longitude: 119.296494,
	latitude: 26.074507
};

@connect(({studio}) => ({
	studio,
}))
class StudioMapView extends Component {

	constructor(props) {
		super();
		this.state = {
			studioInfo: {...props.studioInfo}
		}
	}

	render() {

		return (
			<MapView
				positionInfo={this.state.studioInfo.positionInfo}
				onChange={(city, longitude, latitude) => this.onPositionInfoChange(city, longitude, latitude)}
				onSelect={(city, longitude, latitude) => this.addOrUpdate(city, longitude, latitude)}
			/>
		);
	}

	onPositionInfoChange(city, longitude, latitude) {
	}

	addOrUpdate(city, longitude, latitude) {
		let studioInfo = {...this.state.studioInfo};
		studioInfo.positionInfo.city = city;
		studioInfo.positionInfo.longitude = longitude;
		studioInfo.positionInfo.latitude = latitude;

		addOrUpdateStudio(studioInfo).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success("画室位置编辑成功");
			} else {
				message.error("编辑画室位置操作失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("编辑画室位置操作失败: " + JSON.stringify(error));
		});
	}


}

export default StudioMapView;
