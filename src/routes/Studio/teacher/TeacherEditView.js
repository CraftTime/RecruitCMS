import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';
import {addOrUpdateStudioTeacher} from '../../../services/AppApi';
import CommonStyle from '../../../css/common.less';

const FormItem = Form.Item;
const {TextArea} = Input;

const NAME = 0;
const DESC = NAME + 1;
const VISIBLE = NAME + 2;
const LOGO = NAME + 10;
const STUDY_FEE = NAME + 11;
const STUDENT_COUNT = NAME + 12;
const WEIGHT = NAME + 13;

@Form.create()
@connect(({studio}) => ({
	studio,
}))
class TeacherEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			teacher: this.getInfo(props.teacher)
		};
	}

	render() {
		const {teacher} = this.state;
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
					label="教师名字"
				>
					{getFieldDecorator('name', {
						initialValue: teacher.name,
						rules: [{
							required: true, message: '请输入教师名字',
						}],
					})(
						<Input value={teacher.name} placeholder=""
						       onChange={(event) => this.onChange(NAME, event.target.value)}/>
					)}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="描述"
					style={{}}
				>
					{getFieldDecorator('desc', {
						initialValue: teacher.desc,
						rules: [{
							required: true, message: '请输入教师描述，可多行',
						}],
					})(
						<TextArea
							rows="8"
							cols="30"
							value={teacher.desc} placeholder=""
							onChange={(event) => this.onChange(DESC, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="头像"
					hasFeedback
				>{getFieldDecorator('headImage', {
					initialValue: teacher.headImage,
					rules: [{
						required: true, message: '请选择教师头像图片',
					}],
				})(
					<div className={CommonStyle.flexRowVCenter} style={{width: 300}}>
						<Input
							style={{width: 200}}
							value={teacher.headImage} placeholder=""
							onChange={(event) => this.onChange(LOGO, event.target.value)}/>
						<text className={CommonStyle.imageSizeTip}>{Data.LOGO_SIZE_TIP_TRAIN_TEACHER}</text>
					</div>
				)}
					<ArticleImage
						title="画室教师头像图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={teacher.headImage}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="排序"
				>
					{getFieldDecorator('weight', {
						initialValue: teacher.weight,
						rules: [{
							required: true, message: '请输入排序',
						}],
					})(
						<InputNumber min={0} onChange={(value) => this.onChange(WEIGHT, value)}
						             value={teacher.weight}
						             placeholder=""/>
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

	getInfo(teacher) {

		if (teacher !== null) {
			return teacher;
		} else {
			return {
				id: -1,
				articleId: -1
			};
		}
	}

	onChange(type, value) {
		let {teacher} = this.state;
		let newInfo = {...teacher};

		switch (type) {

			case WEIGHT:
				newInfo.weight = value;
				break;

			case NAME:
				newInfo.name = value;
				break;

			case DESC:
				newInfo.desc = value;
				break;

			case LOGO:
				newInfo.headImage = value;
				break;
		}

		this.setState({
			teacher: newInfo
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
		let newInfo = {...this.state.teacher};
		newInfo.typeId = this.props.typeId;
		newInfo.institutionId = this.props.studioInfo.id;
		const param = {
			studioId: this.props.studioInfo.id,
			teacher: newInfo
		};
		const baseDialogTitle = (isEmpty(this.props.teacher) ? "新增" : "编辑") + "画室教师";

		let that = this;
		addOrUpdateStudioTeacher(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.props.onDialogDismiss();
				message.success(baseDialogTitle + "操作成功");
			} else {
				message.error(baseDialogTitle + "操作失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(baseDialogTitle + "操作失败: " + JSON.stringify(error));
		});
	}


}

export default TeacherEditView;
