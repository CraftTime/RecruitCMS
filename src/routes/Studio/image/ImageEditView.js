import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';
import {addOrUpdateStudioImage} from '../../../services/AppApi';
import CommonStyle from '../../../css/common.less';

const FormItem = Form.Item;
const {TextArea} = Input;

const NAME = 0;
const DESC = NAME + 1;
const VISIBLE = NAME + 2;
const LOGO = NAME + 10;
const WEIGHT = NAME + 11;

@Form.create()
@connect(({studio}) => ({
	studio,
}))
class ImageEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			image: this.getInfo(props.image)
		};
	}

	render() {
		const {image} = this.state;
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
					label="图集名称"
				>
					{getFieldDecorator('name', {
						initialValue: image.name,
						rules: [{
							required: true, message: '请输入图集名称',
						}],
					})(
						<Input value={image.name} placeholder=""
						       onChange={(event) => this.onChange(NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="描述"
					style={{}}
				>
					{getFieldDecorator('desc', {
						initialValue: image.desc,
						rules: [{
							required: true, message: '请输入画室图集描述',
						}],
					})(
						<TextArea
							rows={8}
							style={{width: 1000}}
							value={image.desc} placeholder=""
							onChange={(event) => this.onChange(DESC, event.target.value)}/>
					)}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="封面图片"
					hasFeedback
				>{getFieldDecorator('url', {
					initialValue: image.url,
					rules: [{
						required: true, message: '请选择画室图集图片',
					}],
				})(
					<div className={CommonStyle.flexRowVCenter} style={{width: 300}}>
						<Input
							style={{width: 200}}
							value={image.url} placeholder=""
							onChange={(event) => this.onChange(LOGO, event.target.value)}/>
						<text className={CommonStyle.imageSizeTip}>{Data.LOGO_SIZE_TIP_TRAIN_COMMON}</text>
					</div>
				)}
					<ArticleImage
						title="画室图集封面图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={image.url}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="排序"
				>
					{getFieldDecorator('weight', {
						initialValue: image.weight,
						rules: [{
							required: true, message: '请输入排序',
						}],
					})(
						<InputNumber min={0} onChange={(value) => this.onChange(WEIGHT, value)}
						             value={image.weight}
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

	getInfo(image) {

		if (image !== null) {
			return image;
		} else {
			return {
				id: -1,
				articleId: -1
			};
		}
	}

	onChange(type, value) {
		let {image} = this.state;
		let newInfo = {...image};

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

			case VISIBLE:
				newInfo.visible = value;
				break;

			case LOGO:
				newInfo.url = value;
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
		let newImage = {...this.state.image};
		newImage.typeId = this.props.typeId;
		const param = {
			studioId: this.props.studioInfo.id,
			image: newImage
		};
		const baseDialogTitle = isEmpty(this.props.image) ? "新增画室图集" : "编辑画室图集";

		let that = this;
		addOrUpdateStudioImage(param).then(function (response) {
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

export default ImageEditView;
