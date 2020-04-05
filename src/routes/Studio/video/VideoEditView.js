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
import VideoUpload from '../../../components/VideoUpload/VideoUpload';
import * as AppInfo from '../../../utils/AppInfo';
import CommonStyle from '../../../css/common.less';

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
const VIDEO_URL = NAME + 16;
const WEIGHT = NAME + 17;

@Form.create()
@connect(({studio}) => ({
	studio,
}))
class VideoEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			video: this.getInfo(props.video)
		};
	}

	render() {
		let videoUploadUrl = AppInfo.API_SERVER_URL + `/institutionVideo/${this.props.studioInfo.id}/upload`
		const {video} = this.state;
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
						initialValue: video.name,
						rules: [{
							required: true, message: '请输入标题',
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
					<div className={CommonStyle.flexRowVCenter} style={{width: 300}}>
					<Input
						style={{width: 200}}
						value={video.titleImageUrl} placeholder=""
						onChange={(event) => this.onChange(LOGO, event.target.value)}/>
						<text className={CommonStyle.imageSizeTip}>{Data.LOGO_SIZE_TIP_TRAIN_COMMON}</text>
					</div>
				)}
					<ArticleImage
						title="艺考教学视频封面图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={video.titleImageUrl}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="排序"
				>
					{getFieldDecorator('weight', {
						initialValue: video.weight,
						rules: [{
							required: true, message: '请输入排序',
						}],
					})(
						<InputNumber min={0} onChange={(value) => this.onChange(WEIGHT, value)}
						             value={video.weight}
						             placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="视频"
				>
					{getFieldDecorator('video', {
						initialValue: video.url,
						rules: [{
							required: true, message: '请输入视频URL',
						}],
					})(
						<div>
							<Input value={video.url} placeholder=""
							       onChange={(event) => this.onChange(VIDEO_URL, event.target.value)}/>
							<VideoUpload
								uploadUrl={videoUploadUrl}
								url={video.url}
								onUrlChange={(url) => {
									this.onChange(VIDEO_URL, url)
								}}
							/>
						</div>
					)}
				</FormItem>

				{/*<FormItem*/}
					{/*{...Data.FORM_ITEM_LAYOUT}*/}
					{/*label="是否付费"*/}
					{/*style={{}}*/}
				{/*>*/}
					{/*<Switch checked={video.needPay}*/}
					        {/*onChange={(value) => this.onChange(NEED_PAY, value)}/>*/}

				{/*</FormItem>*/}

				{/*{this.state.video.needPay !== undefined && this.state.video.needPay &&*/}
				{/*<FormItem*/}
					{/*{...Data.FORM_ITEM_LAYOUT}*/}
					{/*label="价格(元)"*/}
				{/*>*/}
					{/*{getFieldDecorator('price', {*/}
						{/*initialValue: video.price,*/}
						{/*rules: [{*/}
							{/*required: true, message: '请输入价格',*/}
						{/*}],*/}
					{/*})(*/}
						{/*<Input value={video.price} placeholder=""*/}
						       {/*onChange={(event) => this.onChange(PRICE, event.target.value)}/>*/}
					{/*)}*/}
				{/*</FormItem>*/}
				{/*}*/}

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
						<InputNumber value={video.readCount} placeholder=""
						             onChange={(value) => this.onChange(READ_COUNT, value)}/>
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

	getInfo(video) {

		if (video !== null) {
			return video;
		} else {
			return {
				id: -1,
				readCount:0
			};
		}
	}

	onChange(type, value) {
		let {video} = this.state;
		let newInfo = {...video};

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

			// case NEED_PAY:
			// 	newInfo.needPay = value;
				break;

			case READ_COUNT:
				newInfo.readCount = value;
				break;

			case VIDEO_URL:
				newInfo.url = value;
				break;

			// case PRICE:
			// 	newInfo.price = value;
			// 	break;
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
		const baseDialogTitle = (isEmpty(this.props.video) ? "新增" : "编辑") + "培训机构视频";

		const param = {
			studioId: this.props.studioInfo.id,
			info: newInfo
		};
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

export default VideoEditView;
