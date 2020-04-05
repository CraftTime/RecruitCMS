import React, {Component, Fragment} from 'react';
import {connect} from 'dva';

import {
	Row,
	Col,
	Checkbox,
	Form,
	Input,
	DatePicker,
	message,
	Upload,
	Select,
	Button,
	Card,
	Tooltip,
	Radio,
	Modal,
	Collapse,
	Spin
} from 'antd';
import * as Data from '../../../../../data/data';
import {isSuccess, isEmpty} from '../../../../../utils/utils';
import Style from '../../../../../css/common.less';
import {addOrUpdateSchoolScore} from '../../../../../services/AppApi';
import ProfessionalListView from "../../professional/ProfessionalListView";

const FormItem = Form.Item;

@Form.create()
class EditView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			score: this.getInfo()
		}

	}

	getInfo() {
		if(isEmpty(this.props.score)) {
			return {};
		} else {
			return {...this.props.score};
		}
	}


	render() {
		const {getFieldDecorator, getFieldValue} = this.props.form;
		const {school} = this.props;
		const {score} = this.state;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="学校名称"
					style={{}}
				>
					<text>{score.schoolName}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="专业名称"
					hasFeedback
				>
					<text>{score.professionalName}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="公式"
					hasFeedback
				>
					<text>{score.formula}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="招收计划数"
					hasFeedback
				>
					{getFieldDecorator('admissionPeopleNumber', {
						initialValue: score.admissionPeopleNumber,
						rules: [{
							required: true, message: '请输入招收计划数',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder="请输入招收计划数"/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文化分"
					hasFeedback
				>
					{getFieldDecorator('cultureScore', {
						initialValue: score.cultureScore,
						rules: [{
							required: true, message: '请输入文化分',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder="请输入文化分"/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="专业分"
					hasFeedback
				>
					{getFieldDecorator('professionalScore', {
						initialValue: score.professionalScore,
						rules: [{
							required: true, message: '请输入专业分',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder="请输入专业分"/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="综合分"
					hasFeedback
				>
					{getFieldDecorator('comprehensiveScore', {
						initialValue: score.comprehensiveScore,
						rules: [{
							required: true, message: '请输入综合分',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder=""/>
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

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate();
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	addOrUpdate() {
		const {getFieldProps, getFieldValue} = this.props.form;
		let param = {...this.props.score};
		param.admissionPeopleNumber = getFieldValue('admissionPeopleNumber');
		param.cultureScore = getFieldValue('cultureScore');
		param.professionalScore = getFieldValue('professionalScore');
		param.comprehensiveScore = getFieldValue('comprehensiveScore');

		const baseDialogTitle = (isEmpty(this.props.score) ? "新增" : "编辑") + `分数`;
		let {onDialogDismiss} = this.props;
		let that = this;
		addOrUpdateSchoolScore(param).then(function (response) {
			if (isSuccess(response)) {
				if(onDialogDismiss) {
					onDialogDismiss();
				}
				message.success(baseDialogTitle + "操作成功");
			} else {
				message.error(baseDialogTitle + "操作失败 failed:  " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(baseDialogTitle + "操作失败 error: " + JSON.stringify(error));
		});
	}

	showProfessionalSelectDialog() {
		this.setState({
			isShowDialog: true,
		})
	}

	onDialogDismiss() {
		this.setState({
			isShowDialog: false,
		})
	}

	onProfessionalSelect(profession) {

		let newProfessional = {...this.state.professional};
		newProfessional.professionalId = profession.id;
		newProfessional.professionalName = profession.name;

		this.setState({
			isShowDialog: false,
			professional: newProfessional
		})
	}

}

export default EditView;
