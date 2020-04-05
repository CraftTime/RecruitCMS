import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';
import {addOrUpdateStudioLecture} from '../../../services/AppApi';
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
class LectureEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			lecture: this.getInfo(props.lecture)
		};
	}

	render() {
		const {lecture} = this.state;
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
					label="课程名称"
				>
					{getFieldDecorator('name', {
						initialValue: lecture.name,
						rules: [{
							required: true, message: '请输入课程名称',
						}],
					})(
						<Input value={lecture.name} placeholder=""
						       onChange={(event) => this.onChange(NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="封面图片"
					hasFeedback
				>{getFieldDecorator('titleImageUrl', {
					initialValue: lecture.titleImageUrl,
					rules: [{
						required: true, message: '请选择画室课程封面图片',
					}],
				})(
					<div className={CommonStyle.flexRowVCenter} style={{width: 300}}>
					<Input
						style={{width: 200}}
						value={lecture.titleImageUrl} placeholder=""
						onChange={(event) => this.onChange(LOGO, event.target.value)}/>
						<text className={CommonStyle.imageSizeTip}>{Data.LOGO_SIZE_TIP_TRAIN_COMMON}</text>
					</div>
				)}
					<ArticleImage
						title="画室课程封面图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={lecture.titleImageUrl}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="排序"
				>
					{getFieldDecorator('weight', {
						initialValue: lecture.weight,
						rules: [{
							required: true, message: '请输入排序',
						}],
					})(
						<InputNumber min={0} onChange={(value) => this.onChange(WEIGHT, value)}
						             value={lecture.weight}
						             placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="班型人数"
				>
					{getFieldDecorator('studentCount', {
						initialValue: lecture.studentCount,
						rules: [{
							required: true, message: '请输入班型人数',
						}],
					})(
						<Input value={lecture.studentCount} placeholder=""
						       onChange={(event) => this.onChange(STUDENT_COUNT, event.target.value)}/>
					)}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="班型费用"
				>
					{getFieldDecorator('studyFee', {
						initialValue: lecture.studyFee,
						rules: [{
							required: true, message: '请输入班型费用',
						}],
					})(
						<Input value={lecture.studyFee} placeholder=""
						       onChange={(event) => this.onChange(STUDY_FEE, event.target.value)}/>
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

	getInfo(lecture) {

		if (lecture !== null) {
			return lecture;
		} else {
			return {
				id: -1,
				articleId: -1
			};
		}
	}

	onChange(type, value) {
		let {lecture} = this.state;
		let newInfo = {...lecture};

		switch (type) {

			case WEIGHT:
				newInfo.weight = value;
				break;

			case NAME:
				newInfo.name = value;
				break;

			case LOGO:
				newInfo.titleImageUrl = value;
				break;

			case STUDY_FEE:
				newInfo.studyFee = value;
				break;

			case STUDENT_COUNT:
				newInfo.studentCount = value;
				break;
		}

		this.setState({
			lecture: newInfo
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
		let newLecture = {...this.state.lecture};
		newLecture.typeId = this.props.typeId;
		const param = {
			studioId: this.props.studioInfo.id,
			lecture: newLecture
		};
		const baseDialogTitle = (isEmpty(this.props.lecture) ? "新增" : "编辑")  + "画室课程";

		let that = this;
		addOrUpdateStudioLecture(param).then(function (response) {
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

export default LectureEditView;
