import React, {Component} from 'react';
import {Switch, Divider,Radio,  Form, Input, message, Button, DatePicker} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {isSuccess}from '../../../utils/utils';
import ArticleImage from '../../../components/ArticleImgage/ArticleImage';
import {addOrUpdateUser} from '../../../services/AppApi';

moment.locale('zh-cn');
const FormItem = Form.Item;


const REAL_NAME = 0;
const USERNAME = REAL_NAME + 1;
const TELEPHONE = REAL_NAME + 2;
const USER_TYPE = REAL_NAME + 5;
const COUNTRY = REAL_NAME + 6;
const PROVINCE = REAL_NAME + 7;
const SCHOOL_NAME = REAL_NAME + 8;
const SCHOOL_LEVEL = REAL_NAME + 9;
const LOGO_URL = REAL_NAME + 10;
const SEX = REAL_NAME + 11;
const STUDIO = REAL_NAME + 12;
const PASSWORD = REAL_NAME + 13;

@Form.create()
class PurchaseView extends Component {

	constructor(props) {
		super();
		this.state = {
			user: props.user
		}
	}

	render() {
		const {user} = this.state;
		const {getFieldDecorator} = this.props.form;

		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				<Divider dashed>文化分测算</Divider>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="剩余次数"
					style={{}}
				>
					{getFieldDecorator('cultureCalculateCount', {
						initialValue: user.cultureCalculateCount,
						rules: [{
							required: true, message: '请输入文化分测算_剩余次数',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.cultureCalculateCount} placeholder=""/>
					)}
				</FormItem>

				<Divider dashed>录取测算剩余次数</Divider>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文理类别"
					style={{}}
				>
					{getFieldDecorator('admissionRateCourseCount', {
						initialValue: user.admissionRateCourseCount,
						rules: [{
							required: true, message: '请输入录取测算_文理类别_剩余次数',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.admissionRateCourseCount} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="统考成绩"
					style={{}}
				>
					{getFieldDecorator('admissionRateProfessionalCount', {
						initialValue: user.admissionRateProfessionalCount,
						rules: [{
							required: true, message: '请输入录取测算_统考成绩_剩余次数',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.admissionRateProfessionalCount} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文化成绩"
					style={{}}
				>
					{getFieldDecorator('admissionRateCultureCount', {
						initialValue: user.admissionRateCultureCount,
						rules: [{
							required: true, message: '请输入录取测算_文化成绩_剩余次数',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.admissionRateCultureCount} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="外语成绩"
					style={{}}
				>
					{getFieldDecorator('admissionRateForeignCount', {
						initialValue: user.admissionRateForeignCount,
						rules: [{
							required: true, message: '请输入录取测算_外语成绩_剩余次数',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.admissionRateForeignCount} placeholder=""/>
					)}
				</FormItem>

				<Divider dashed>报考指南</Divider>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="是否购买"
				>

					{getFieldDecorator('applyGuiderPayed', {
						valuePropName: 'checked',
						initialValue: user.applyGuiderPayed,
						rules: [{
							required: true, message: '请输入选择是否购买',
						}],
					})(
						<Switch
							checked={user.applyGuiderPayed}
						/>
					)}


				</FormItem>
				<Divider dashed/>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		let roledi = getFieldValue('roleid');
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let user = {
					...this.state.user
				};

				user.admissionRateCultureCount = getFieldValue('admissionRateCultureCount');
				user.admissionRateProfessionalCount = getFieldValue('admissionRateProfessionalCount');
				user.admissionRateForeignCount = getFieldValue('admissionRateForeignCount');
				user.admissionRateCourseCount = getFieldValue('admissionRateCourseCount');
				user.cultureCalculateCount = getFieldValue('cultureCalculateCount');
				user.applyGuiderPayed = getFieldValue('applyGuiderPayed');

				this.updateInfo(user);
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	updateInfo(user) {
		let that = this;
		let title = '更新用户购买信息';
		addOrUpdateUser(user).then(function (response) {
			if (isSuccess(response)) {
				message.success(title + "成功");
				that.props.onDialogDismiss();
			} else {
				message.error(title+ "失败 error: " + response);
			}

		}).catch(function (error) {
			message.error(title + "失败 error: " + JSON.stringify(error));
		});
	}
}

export default PurchaseView;
