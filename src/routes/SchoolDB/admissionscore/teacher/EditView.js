import React, {Component} from 'react';
import {Tabs, Radio, Form, Input, message, Button, DatePicker} from 'antd';
import * as Data from '../../../../data/data';
import * as DateUtils from '../../../../utils/DateUtils';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ArticleImage from '../../../../components/ArticleImgage/ArticleImage';

moment.locale('zh-cn');
const FormItem = Form.Item;


const USERNAME = 0;
const TOTAL_NUMBER_OF_INVITATION = USERNAME + 1;
const BALANCE = USERNAME + 2;
const QR_CODE_URL = USERNAME + 3;

@Form.create()
class EditView extends Component {

	constructor(props) {
		super();
		this.state = {
			teacherInfo: props.teacherInfo
		}
	}

	render() {
		const {teacherInfo} = this.state;
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
					<text>{teacherInfo.username}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="总邀请人数"
					style={{}}
				>
					{getFieldDecorator('totalNumberOfInvitation', {
						initialValue: teacherInfo.totalNumberOfInvitation,
						rules: [{
							required: true, message: '请输入总邀请人数',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={teacherInfo.totalNumberOfInvitation} placeholder=""
							onChange={(event) => this.onChange(TOTAL_NUMBER_OF_INVITATION, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="余额"
					style={{}}
				>
					{getFieldDecorator('balance', {
						initialValue: teacherInfo.balance,
						rules: [{
							required: true, message: '请输入余额',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={teacherInfo.balance} placeholder=""
							onChange={(event) => this.onChange(BALANCE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="邀请二维码"
				>{getFieldDecorator('qrCodeUrl', {
					initialValue: teacherInfo.qrCodeUrl,
					rules: [{
						required: true, message: '请选择邀请二维码',
					}],
				})(
					<Input hidden={true} value={teacherInfo.qrCodeUrl} placeholder="请选择邀请二维码"
					       onChange={(event) => this.onChange(QR_CODE_URL, event.target.value)}/>
				)}
					<ArticleImage
						title="邀请二维码"
						onUrlChange={(url) => this.onChange(QR_CODE_URL, url)}
						url={teacherInfo.qrCodeUrl}
					/>
				</FormItem>


				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));
		let {info} = this.state;
		let newInfo = {...info};

		switch (type) {
			case USERNAME:
				break;

			case TOTAL_NUMBER_OF_INVITATION:
				newInfo.totalNumberOfInvitation = value;
				break;

			case BALANCE:
				newInfo.balance = value;
				break;

			case QR_CODE_URL:
				newInfo.qrCodeUrl = value;
				break;
		}

		this.setState({
			teacherInfo: newInfo
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updatePriceInfo();
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	updatePriceInfo() {
		message.info(" updatePriceInfo ")
	}
}

export default EditView;
