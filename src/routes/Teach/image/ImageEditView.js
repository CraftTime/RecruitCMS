import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {isEmpty} from '../../../utils/utils';
import {addOrUpdateTeachImage} from '../../../services/AppApi';
import Style from '../../../css/common.less';

const FormItem = Form.Item;
const {TextArea} = Input;

const NAME = 0;
const DESC = NAME + 1;
const VISIBLE = NAME + 2;
const LOGO = NAME + 10;
const STUDY_FEE = NAME + 11;
const STUDENT_COUNT = NAME + 12;

@Form.create()
@connect(({teach}) => ({
	teach,
}))
class imageEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			image: this.getInfo(props.image)
		};
	}

	render() {
		const {image} = this.state;
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="标题"
				>
					{getFieldDecorator('name', {
						initialValue: image.name,
						rules: [{
							required: true, message: '请输入美术图片标题',
						}],
					})(
						<Input value={image.name} placeholder=""
						       onChange={(event) => this.onChange(NAME, event.target.value)}/>
					)}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="描述"
				>
					{getFieldDecorator('desc', {
						initialValue: image.desc,
						rules: [{
							required: true, message: '请输入范湖描述',
						}],
					})(
						<Input value={image.desc} placeholder=""
						       onChange={(event) => this.onChange(DESC, event.target.value)}/>
					)}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="图片"
				>{getFieldDecorator('url', {
					initialValue: image.url,
					rules: [{
						required: true, message: '请选择图片',
					}],
				})(
					<div className={Style.flexRowVCenter} style={{width: 600}}>
					<Input
						style={{width: 335}}
						value={image.url} placeholder=""
						onChange={(event) => this.onChange(LOGO, event.target.value)}/>
						<text className={Style.imageSizeTip}>{Data.LOGO_SIZE_TIP_TEACH_GALLERY}</text>
					</div>
				)}
					<ArticleImage
						title="美术图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={image.url}
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

	getInfo(image) {

		if (image !== null) {
			return image;
		} else {
			return {
				id: -1,
			};
		}
	}

	onChange(type, value) {
		let {image} = this.state;
		let newInfo = {...image};

		switch (type) {

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
			image: newInfo
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
		let newInfo = {...this.state.image};
		newInfo.typeId = this.props.typeId;
		const baseDialogTitle = (isEmpty(this.props.image) ? "新增" : "编辑")  + "艺考教学图库图片";

		let that = this;
		addOrUpdateTeachImage(newInfo).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.props.onDialogDismiss();
				message.success(baseDialogTitle + "成功");
			} else {
				message.error(baseDialogTitle + "失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(baseDialogTitle + "失败: " + JSON.stringify(error));
		});
	}


}

export default imageEditView;
