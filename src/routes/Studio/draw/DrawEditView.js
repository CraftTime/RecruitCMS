import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';
import {addOrUpdateStudioDraw} from '../../../services/AppApi';
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
class DrawEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			draw: this.getInfo(props.draw)
		};
	}

	render() {
		const {draw} = this.state;
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
					label="范画名称"
				>
					{getFieldDecorator('name', {
						initialValue: draw.name,
						rules: [{
							required: true, message: '请输入范画名称',
						}],
					})(
						<Input value={draw.name} placeholder=""
						       onChange={(event) => this.onChange(NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="图片"
					hasFeedback
				>{getFieldDecorator('url', {
					initialValue: draw.url,
					rules: [{
						required: true, message: '请选择画室课程封面图片',
					}],
				})(
					<div className={CommonStyle.flexRowVCenter} style={{width: 300}}>
					<Input
						style={{width: 200}}
						value={draw.url} placeholder=""
						onChange={(event) => this.onChange(LOGO, event.target.value)}/>
						<text className={CommonStyle.imageSizeTip}>{Data.LOGO_SIZE_TIP_TRAIN_COMMON}</text>
					</div>
				)}
					<ArticleImage
						title="画室优秀范画图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={draw.url}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="排序"
				>
					{getFieldDecorator('weight', {
						initialValue: draw.weight,
						rules: [{
							required: true, message: '请输入排序',
						}],
					})(
						<InputNumber min={0} onChange={(value) => this.onChange(WEIGHT, value)}
						             value={draw.weight}
						             placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="描述"
				>
					{getFieldDecorator('desc', {
						initialValue: draw.desc,
						rules: [{
							required: true, message: '请输入范湖描述',
						}],
					})(
						<Input value={draw.desc} placeholder=""
						       onChange={(event) => this.onChange(DESC, event.target.value)}/>
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

	getInfo(draw) {

		if (draw !== null) {
			return draw;
		} else {
			return {
				id: -1,
			};
		}
	}

	onChange(type, value) {
		let {draw} = this.state;
		let newInfo = {...draw};

		switch (type) {

			case WEIGHT:
				newInfo.weight = value;
				break;

			case NAME:
				newInfo.name = value;
				break;

			case LOGO:
				newInfo.url = value;
				break;

			case DESC:
				newInfo.desc = value;
				break;
		}

		this.setState({
			draw: newInfo
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
		let newInfo = {...this.state.draw};
		newInfo.typeId = this.props.typeId;
		const param = {
			studioId: this.props.studioInfo.id,
			info: newInfo
		};
		const baseDialogTitle = (isEmpty(this.props.draw) ? "新增" : "编辑")  + "画室优秀范画";

		let that = this;
		addOrUpdateStudioDraw(param).then(function (response) {
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

export default DrawEditView;
