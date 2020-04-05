import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';
import {addOrUpdateStudioVideo} from '../../../services/AppApi';
import AMap from '../../../components/AMap/AMap';

const FormItem = Form.Item;
const {TextArea} = Input;

const NAME = 0;
const DESC = NAME + 1;
const VISIBLE = NAME + 2;
const LOGO = NAME + 10;
const STUDY_FEE = NAME + 11;
const STUDENT_COUNT = NAME + 12;
const READ_COUNT = NAME + 13;
const NEED_PAY = NAME + 14;
const PRICE = NAME + 15;

@Form.create()
@connect(({studio}) => ({
	studio,
}))
class ImageTextEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			video: this.getInfo(props.video)
		};
	}

	render() {
		const {video} = this.state;
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
					label="视频标题"
				>
					{getFieldDecorator('name', {
						initialValue: video.name,
						rules: [{
							required: true, message: '请输入课程名称',
						}],
					})(
						<Input value={video.name} placeholder=""
						       onChange={(event) => this.onChange(NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="封面图片"
					hasFeedback
				>{getFieldDecorator('titleImageUrl', {
					initialValue: video.titleImageUrl,
					rules: [{
						required: true, message: '请选择画室视频封面图片',
					}],
				})(
					<Input
						value={video.titleImageUrl} placeholder=""
						onChange={(event) => this.onChange(LOGO, event.target.value)}/>
				)}
					<ArticleImage
						title="画室视频封面图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={video.titleImageUrl}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="是否付费"
					style={{}}
				>
					<Switch checked={video.needPay}
					        onChange={(value) => this.onChange(NEED_PAY, value)}/>

				</FormItem>

				{this.state.video.needPay !== undefined && this.state.video.needPay &&
					<FormItem
						{...Data.FORM_ITEM_LAYOUT}
						label="价格(元)"
					>
						{getFieldDecorator('price', {
							initialValue: video.price,
							rules: [{
								required: true, message: '请输入价格',
							}],
						})(
							<Input value={video.price} placeholder=""
							       onChange={(event) => this.onChange(PRICE, event.target.value)}/>
						)}
					</FormItem>
				}

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="阅读量"
				>
					{getFieldDecorator('readCount', {
						initialValue: video.readCount,
						rules: [{
							required: true, message: '请输入阅读量',
						}],
					})(
						<Input value={video.readCount} placeholder=""
						       onChange={(event) => this.onChange(READ_COUNT, event.target.value)}/>
					)}
				</FormItem>


				<AMap
					lng={''}
					lat={''}
					// address={getFieldValue('position')}
					getMapPoint={(point)=>{
						setFieldsValue({
							latitude: point.lat,
							longitude: point.lng
						});
					}}
					// getMapAddress={(address)=>{
					// 	setFieldsValue({
					// 		position: address
					// 	});
					// }}
				/>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	getInfo(video) {

		if (video !== null) {
			return video;
		} else {
			return {
				id: -1,
			};
		}
	}

	onChange(type, value) {
		let {video} = this.state;
		let newInfo = {...video};

		switch (type) {

			case NAME:
				newInfo.name = value;
				break;

			case LOGO:
				newInfo.titleImageUrl = value;
				break;

			case NEED_PAY:
				newInfo.needPay = value;
				break;

			case READ_COUNT:
				newInfo.needPay = value;
				break;

			case PRICE:
				newInfo.price = value;
				break;
		}

		this.setState({
			video: newInfo
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
		let newInfo = {...this.state.video};
		newInfo.typeId = this.props.typeId;
		const param = {
			studioId: this.props.studioInfo.id,
			info: newInfo
		};
		const baseDialogTitle = (isEmpty(this.props.lecture) ? "新增" : "编辑") + "画室视频";

		let that = this;
		addOrUpdateStudioVideo(param).then(function (response) {
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

export default ImageTextEditView;
