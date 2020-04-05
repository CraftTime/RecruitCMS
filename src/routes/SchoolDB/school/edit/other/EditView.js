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
import Style from './EditView.less';
import {addOrUpdateSchoolProfessional} from '../../../../../services/AppApi';
import ProfessionalListView from "../../professional/ProfessionalListView";

const FormItem = Form.Item;

@Form.create()
class EditView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowDialog: false,
			professional: this.getInfo()
		}

	}


	getInfo() {
		if(isEmpty(this.props.professional)) {
			return {};
		} else {
			return {...this.props.professional};
		}
	}



	render() {
		const {getFieldDecorator, getFieldValue} = this.props.form;
		const {school} = this.props;
		const {professional} = this.state;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				{this.state.isShowDialog &&
				<Modal
					style={{marginBottom: '30rem'}}
					destroyOnClose="true"
					title="专业选择"
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<ProfessionalListView
						mode={Data.PROFESSIONAL_DIALOG_MODE_RWS}
						onProfessionalSelect={(profession)=> this.onProfessionalSelect(profession)}
					/>

				</Modal>
				}

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="学校名称"
					style={{}}
				>
					<text>{school.name}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="专业名称"
					hasFeedback
				>
					<div className={Style.commonBtnLayout}>
						<text className={Style.commonBtn}> {professional.professionalName}</text>
						<Button onClick={()=> this.showProfessionalSelectDialog()}>{isEmpty(this.props.professional)  ? '选择专业' : '修改专业'}</Button>
					</div>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="学费"
					hasFeedback
				>
					{getFieldDecorator('tuitionFee', {
						initialValue: professional.tuitionFee,
						rules: [{
							required: true, message: '请输入专业费用',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文科文化分切线"
					hasFeedback
				>
					{getFieldDecorator('liberalCultureScoreBase', {
						initialValue: professional.liberalCultureScoreBase,
						rules: [{
							required: true, message: '请输入文科文化分切线',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="理科文化分切线"
					hasFeedback
				>
					{getFieldDecorator('scienceCultureScoreBase', {
						initialValue: professional.scienceCultureScoreBase,
						rules: [{
							required: true, message: '请输入理科文化分批次线',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="专业分切线"
					hasFeedback
				>
					{getFieldDecorator('professionalScoreBase', {
						initialValue: professional.professionalScoreBase,
						rules: [{
							required: true, message: '请输入专业分切线',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="外语切线"
					hasFeedback
				>
					{getFieldDecorator('foreignLanguageScoreBase', {
						initialValue: professional.foreignLanguageScoreBase,
						rules: [{
							required: true, message: '请输入外语切线',
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
		let param = {
			id: isEmpty(this.props.professional) ? -1 : this.props.professional.id,
			professionalId: this.state.professional.professionalId,
			professionalName: getFieldValue('professionalName'),
			tuitionFee: getFieldValue('tuitionFee'),
			liberalCultureScoreBase: getFieldValue('liberalCultureScoreBase'),
			scienceCultureScoreBase: getFieldValue('scienceCultureScoreBase'),
			professionalScoreBase: getFieldValue('professionalScoreBase'),
			foreignLanguageScoreBase: getFieldValue('foreignLanguageScoreBase'),
			schoolId: this.props.school.id
		};
		const baseDialogTitle = (isEmpty(this.props.professional) ? "新增" : "编辑") + `${this.state.professional.professionalName}专业信息`;
		let {onDialogDismiss} = this.props;
		let that = this;
		addOrUpdateSchoolProfessional(param).then(function (response) {
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
