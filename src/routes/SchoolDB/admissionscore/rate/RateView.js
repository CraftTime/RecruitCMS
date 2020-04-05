import React, {Component} from 'react';
import {connect} from 'dva';
import {Input, Card, message, Form, DatePicker, Button} from 'antd';
import {listAdmissionRateConfig, updateAdmissionRateConfig} from '../../../../services/AppApi';
import * as Data from '../../../../data/data';
import {isSuccess} from '../../../../utils/utils';
import Style from './RateView.less';

const FormItem = Form.Item;


@Form.create()
class RateView extends Component {
	constructor(props) {
		super();

		this.state = {
			info: {}
		}
	}

	componentDidMount() {
		let that = this;
		listAdmissionRateConfig().then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					info: response.response
				});
				console.log("录取测算配置信息获取成功 ");
			} else {
				console.error("录取测算配置信息获取失败  error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			console.error("录取测算配置信息获取失败  error: " + JSON.stringify(error));
		});
	}

	render() {
		let date = this.state.year + "-" + this.state.month + "-" + this.state.day;
		const {getFieldDecorator, getFieldValue} = this.props.form;
		const {info} = this.state;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="价格(元)"
				>
					{getFieldDecorator('price', {
						initialValue: info.price,
						rules: [{
							required: true, message: '请输入价格',
						}],
					})(
						<Input  className={Style.inputLayout} min={0} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="冲概率(%)"
				>
					{getFieldDecorator('hitRate', {
						initialValue: info.hitRate,
						rules: [{
							required: true, message: '请输入"冲"的基本概率',
						}],
					})(
						<Input  className={Style.inputLayout} min={0} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="保概率(%)"
				>
					{getFieldDecorator('keepRate', {
						initialValue: info.keepRate,
						rules: [{
							required: true, message: '请输入"保"的基本概率',
						}],
					})(
						<Input  className={Style.inputLayout} min={0} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文理科类别修改限制次数"
				>
					{getFieldDecorator('admissionRateCourseCount', {
						initialValue: info.admissionRateCourseCount,
						rules: [{
							required: true, message: '请输入文理科类别修改限制次数',
						}],
					})(
						<Input  className={Style.inputLayout} min={0} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文化成绩修改限制次数"
				>
					{getFieldDecorator('admissionRateCultureCount', {
						initialValue: info.admissionRateCultureCount,
						rules: [{
							required: true, message: '请输入文化成绩修改限制次数',
						}],
					})(
						<Input  className={Style.inputLayout} min={0} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="专业成绩修改限制次数"
				>
					{getFieldDecorator('admissionRateProfessionalCount', {
						initialValue: info.admissionRateProfessionalCount,
						rules: [{
							required: true, message: '请输入专业成绩修改限制次数',
						}],
					})(
						<Input  className={Style.inputLayout} min={0} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="外语成绩修改限制次数"
				>
					{getFieldDecorator('admissionRateForeignCount', {
						initialValue: info.admissionRateForeignCount,
						rules: [{
							required: true, message: '请输入外语成绩修改限制次数',
						}],
					})(
						<Input  className={Style.inputLayout} min={0} placeholder=""/>
					)}
				</FormItem>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						设置
					</Button>
				</FormItem>

			</Form>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate();
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	addOrUpdate() {
		const { getFieldValue} = this.props.form;

		let param = {
			id: this.state.info.id,
			hitRate: getFieldValue('hitRate'),
			keepRate: getFieldValue('keepRate'),
			price: getFieldValue('price'),
			admissionRateCultureCount: getFieldValue('admissionRateCultureCount'),
			admissionRateProfessionalCount: getFieldValue('admissionRateProfessionalCount'),
			admissionRateForeignCount: getFieldValue('admissionRateForeignCount'),
			admissionRateCourseCount: getFieldValue('admissionRateCourseCount'),
		};
		updateAdmissionRateConfig(param).then(function (response) {
			if (isSuccess(response)) {
				message.success("录取测算配置设置成功");
			} else {
				console.error("录取测算配置设置失败  error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			console.error("录取测算配置设置失败  error: " + JSON.stringify(error));
		});
	}
}

export default RateView;
