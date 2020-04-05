import React, {Component} from 'react';
import {Select, Radio, Form, Input, message, Button, DatePicker} from 'antd';
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
class EditView extends Component {

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
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="姓名"
					style={{}}
				>
					{getFieldDecorator('realName', {
						initialValue: user.realName,
						rules: [{
							required: true, message: '请输入用户姓名',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.realName} placeholder=""
							onChange={(event) => this.onChange(REAL_NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="用户类型"
					style={{}}
				>
					{getFieldDecorator('roleId', {
						initialValue: user.roleId,
						rules: [{
							required: true, message: '请选择用户类型',
						}],
					})(
						<Select
							value={user.roleId}
							onChange={(value) => this.onChange(USER_TYPE, value)}
						>
							<Option value={Data.USER_TYPE_STUDENT}>学生</Option>
							<Option value={Data.USER_TYPE_PARENT}>家长</Option>
							<Option value={Data.USER_TYPE_TEACHER}>教师</Option>
						</Select>
					)}

				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="账户名"
					style={{}}
				>
					{getFieldDecorator('username', {
						initialValue: user.username,
						rules: [{
							required: true, message: '请选择用户类型',
						}],
					})(
						<text>{user.username}</text>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="密码"
					style={{}}
				>
					{getFieldDecorator('password', {
						initialValue: user.password,
						rules: [{
							required: true, message: '请输入用户密码',
						}],
					})(
						<Input value={user.password}
						       onChange={(event) => this.onChange(PASSWORD, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="手机号码"
					style={{}}
				>
					{getFieldDecorator('telephone', {
						initialValue: user.telephone,
						rules: [{
							required: true, message: '请输入手机号码',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.telephone} placeholder=""
							onChange={(event) => this.onChange(TELEPHONE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="用户头像"
					hasFeedback
				>
					{getFieldDecorator('imageUrl', {
						initialValue: user.imageUrl,
						rules: [{
						}],
					})(
						<Input value={user.imageUrl} placeholder="用户头像"
						       onChange={(event) => this.onChange(LOGO_URL, event.target.value)}/>
					)}
					<ArticleImage
						title="小程序图片"
						onUrlChange={(url) => this.onChange(LOGO_URL, url)}
						url={user.imageUrl}
					/>
				</FormItem>

				{/*<FormItem*/}
					{/*{...Data.FORM_ITEM_LAYOUT}*/}
					{/*label="国家"*/}
					{/*style={{}}*/}
				{/*>*/}
					{/*{getFieldDecorator('country', {*/}
						{/*initialValue: user.country,*/}
						{/*rules: [{*/}
							{/*required: true, message: '请输入国家',*/}
						{/*}],*/}
					{/*})(*/}
						{/*<Input*/}
							{/*style={{width: Data.FORM_ITEM_WIDTH}}*/}
							{/*value={user.country} placeholder=""*/}
							{/*onChange={(event) => this.onChange(COUNTRY, event.target.value)}/>*/}
					{/*)}*/}
				{/*</FormItem>*/}

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="城市"
					style={{}}
				>
					{getFieldDecorator('province', {
						initialValue: user.province,
						rules: [{
							required: true, message: '请输入城市',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.province} placeholder=""
							onChange={(event) => this.onChange(PROVINCE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="学校"
					style={{}}
				>
					{getFieldDecorator('schoolName', {
						initialValue: user.schoolName,
						rules: [{
							required: true, message: '请输入学校',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.schoolName} placeholder=""
							onChange={(event) => this.onChange(SCHOOL_NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="年级"
					style={{}}
				>
					{getFieldDecorator('schoolLevel', {
						initialValue: user.schoolLevel,
						rules: [{
							required: true, message: '请输入年级',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.schoolLevel} placeholder=""
							onChange={(event) => this.onChange(SCHOOL_LEVEL, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="画室"
					style={{}}
				>
					{getFieldDecorator('beloneStudio', {
						initialValue: user.beloneStudio,
						rules: [{
							required: true, message: '请输入画室名称',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={user.beloneStudio} placeholder=""
							onChange={(event) => this.onChange(STUDIO, event.target.value)}/>
					)}
				</FormItem>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	onPickerOkClick() {
		message.success(' onPickerOkClick ');
	}

	onChange(type, value) {
		let {user} = this.state;
		let newUser = {...user};

		switch (type) {
			case REAL_NAME:
				newUser.realName = value;
				break;

			case USERNAME:
				newUser.username = value;
				break;
			case TELEPHONE:
				newUser.telephone = value;
				break;
			case USER_TYPE:
				newUser.roleId = value;
				break;
			case COUNTRY:
				newUser.country = value;
				break;
			case PROVINCE:
				newUser.province = value;
				break;
			case SCHOOL_NAME:
				newUser.schoolName = value;
				break;
			case SCHOOL_LEVEL:
				newUser.schoolLevel = value;
				break;
			case LOGO_URL:
				newUser.imageUrl = value;
				break;
			case STUDIO:
				newUser.beloneStudio = value;
				break;
			case PASSWORD:
				newUser.password = value;
				break;
		}

		this.setState({
			user: newUser
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		let roledi = getFieldValue('roleid');
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updateInfo();
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	updateInfo() {
		let that = this;
		let title = (this.state.user.id === -1 ? '新增' : '更新') + '用户';
		addOrUpdateUser(this.state.user).then(function (response) {
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

export default EditView;
