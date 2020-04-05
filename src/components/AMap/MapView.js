import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message} from 'antd';
import AMap from './AMap';
import * as Data from '../../data/data';
import {isEmpty} from '../../utils/utils';

const FormItem = Form.Item;
const {TextArea} = Input;

const DEF_MAP = {
	position: '福州',
	longitude: 119.296494,
	latitude: 26.074507
};

@Form.create()
class MapView extends Component {

	constructor(props) {
		super();
		this.state = {
			def: {
				position: isEmpty(props.positionInfo) ? DEF_MAP.position : props.positionInfo.city,
				longitude: isEmpty(props.positionInfo) ? DEF_MAP.longitude : props.positionInfo.longitude,
				latitude: isEmpty(props.positionInfo) ? DEF_MAP.latitude : props.positionInfo.latitude,
			}
		}
	}

	render() {
		const {getFieldDecorator, getFieldProps, getFieldValue, setFieldsValue} = this.props.form;
		const {def} = this.state;
		let that = this;

		return (
			<Form>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="地址">
					{getFieldDecorator('position', {
						initialValue: def.position,
						rules: [{
							required: true, message: '请选择地址',
						}],
					})(
						<TextArea rows="3" placeholder={'请输入地址'}/>
					)}
				</FormItem>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="经度">
					{getFieldDecorator('longitude', {
						initialValue: def.longitude,
						rules: [{
							required: true, message: '请选择经度',
						}],
					})(
						<Input/>
					)}
				</FormItem>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label=" 维度"
				>
					{getFieldDecorator('latitude', {
						initialValue: def.latitude,
						rules: [{
							required: true, message: '请选择纬度',
						}],
					})(
						<Input/>
					)}
				</FormItem>

				<AMap
					lng={getFieldValue('longitude')}
					lat={getFieldValue('latitude')}
					address={getFieldValue('position')}
					getMapPoint={(point) => {
						setFieldsValue({
							latitude: point.lat,
							longitude: point.lng
						}, function () {
							that.onPositionInfoChange(getFieldValue('position'), getFieldValue('longitude'), getFieldValue('latitude'));
						});
					}}
					getMapAddress={(address) => {
						setFieldsValue({
							position: address
						}, function () {
							that.onPositionInfoChange(getFieldValue('position'), getFieldValue('longitude'), getFieldValue('latitude'));
						});
					}}
				/>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<center>
						<Button type="primary" onClick={()=> this.handleSubmit()}>
							保存
						</Button>
					</center>
				</FormItem>

			</Form>


		);
	}

	onPositionInfoChange(city, longitude, latitude) {
		if(this.props.onChange) {
			this.props.onChange(city, longitude, latitude);
		}
	}

	handleSubmit() {
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate(getFieldValue('position'),
					getFieldValue('longitude'),
					getFieldValue('latitude')
				);
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	addOrUpdate(city, longitude, latitude) {
		if(this.props.onSelect) {
			this.props.onSelect(city, longitude, latitude);
		}
	}


}

export default MapView;
