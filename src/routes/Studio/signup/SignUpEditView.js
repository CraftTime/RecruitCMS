import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';
import {updateStudioApply} from '../../../services/AppApi';

const FormItem = Form.Item;
const {TextArea} = Input;

const NAME = 0;
const DESC = NAME + 1;
const VISIBLE = NAME + 2;
const LOGO = NAME + 10;
const TELEPHONE = NAME + 11;
const SCHOOL_NAME = NAME + 12;
const SCHOOL_LEVEL = NAME + 13;

@Form.create()
@connect(({studio}) => ({
	studio,
}))
class SignUpEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			info: this.getInfo(props.info)
		};
	}

	render() {
		const {info} = this.state;
		const {studioInfo} = this.props;
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="画室名称"
					style={{}}
				>
					<text>{studioInfo.name}</text>
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="姓名"
					style={{}}
				>
					{getFieldDecorator('name', {
						initialValue: info.realName,
						rules: [{
							required: true, message: '请输入报名姓名',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={info.realName} placeholder=""
							onChange={(event) => this.onChange(NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="手机"
					style={{}}
				>
					{getFieldDecorator('telephone', {
						initialValue: info.telephone,
						rules: [{
							required: true, message: '请输入手机号码',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={info.telephone} placeholder=""
							onChange={(event) => this.onChange(TELEPHONE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="学校"
					style={{}}
				>
					{getFieldDecorator('school', {
						initialValue: info.schoolName,
						rules: [{
							required: true, message: '请输入学校名称',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={info.schoolName} placeholder=""
							onChange={(event) => this.onChange(SCHOOL_NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="年级"
					style={{}}
				>
					{getFieldDecorator('schoolLevel', {
						initialValue: info.schoolLevel,
						rules: [{
							required: true, message: '请输入年级',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={info.schoolLevel} placeholder=""
							onChange={(event) => this.onChange(SCHOOL_LEVEL, event.target.value)}/>
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

	getInfo(info) {

		if (info !== null) {
			return info;
		} else {
			return {
				id: -1,
			};
		}
	}

	onChange(type, value) {
		let {info} = this.state;
		let newInfo = {...info};

		switch (type) {

			case NAME:
				newInfo.realName = value;
				break;

			case TELEPHONE:
				newInfo.telephone = value;
				break;

			case SCHOOL_NAME:
				newInfo.schoolName = value;
				break;

			case SCHOOL_LEVEL:
				newInfo.schoolLevel = value;
				break;
		}

		this.setState({
			info: newInfo
		});

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
		let newInfo = {...this.state.info};

		let that = this;
		updateStudioApply(newInfo).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success("报名信息操作成功");
				that.props.onDialogDismiss();
			} else {
				message.error("报名信息操作失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("报名信息操作失败: " + JSON.stringify(error));
		});
	}


}

export default SignUpEditView;
