import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Radio, Form, Input, message, Button, Modal, Select} from 'antd';
import * as Data from '../../data/data';
import Style from '../../css/common.less';
import ArticleImage from '../../components/ArticleImgage/ArticleImage';
import * as DateUtils from '../../utils/DateUtils';
import {isSuccess} from '../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ArticleEditView from '../Article/edit/ArticleEditView';
import {addOrUpdateBanner} from '../../services/AppApi';

moment.locale('zh-cn');

const FormItem = Form.Item;
const URL = 0;
const ACTION_TYPE = URL + 1;
const ACTION_VALUE = URL + 2;
const LOCATION = URL + 3;
const VISIBLE = URL + 4;
const ARTICLE = URL + 5;
const PATH = URL + 6;

const SIZE_TIP_MAP = new Map([
		[Data.BANNER_LOCATION_INDEX, Data.LOGO_SIZE_TIP_HOME_BANNER],
		[Data.BANNER_LOCATION_FLOAT, Data.LOGO_SIZE_TIP_HOME_BELOW_BANNER],
		[Data.BANNER_LOCATION_CULTURE, Data.LOGO_SIZE_TIP_CULTURE_BANNER],
		[Data.BANNER_LOCATION_WEB, Data.LOGO_SIZE_TIP_WEB_BANNER]
	]
);

@connect(({banner}) => ({
	banner,
}))
@Form.create()
class EditView extends Component {

	constructor(props) {
		super();
		let {srcBanner} = props;
		console.info(' article EditView : ' + JSON.stringify(srcBanner))
		this.state = {
			banner: {
				actionType: srcBanner.actionType,
				actionValue: srcBanner.actionValue,
				id: srcBanner.id,
				locationId: srcBanner.locationId,
				url: srcBanner.url,
				visible: srcBanner.visible
			},
			articleId: Data.BANNER_ACTION_TYPE_ARTICLE === srcBanner.actionType ? srcBanner.actionValue : -1,
			path: Data.BANNER_ACTION_TYPE_SCENE === srcBanner.actionType ? srcBanner.actionValue : Data.BANNER_ACTION_TYPE_SCENE_ADMISSION,
			isShowModel: false

		}
	}


	render() {
		const {getFieldDecorator} = this.props.form;
		const {banner} = this.state;
		return (
			<Form
				hideRequiredMark
				style={{marginTop: 8}}
			>
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title={"Banner文章编辑"}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_NOT_TITLE_ARTICLE}
						id={parseInt(this.state.articleId)}
						disableEditType={true}
						shouldShowHeadLineSet={false}
						mimiAppArticleType={
							{
								options: [
									{
										label: 'Banner',
										value: Data.ARTICLE_TYPE_BANNER,
									}
								],
								ids: [Data.ARTICLE_TYPE_BANNER]
							}
						}
						webArticleType={
							{
								options: [
									{
										label: 'Banner',
										value: Data.ARTICLE_TYPE_BANNER,
									}
								],
								ids: [Data.ARTICLE_TYPE_BANNER]
							}
						}
						miniAppArticleTypeCheckList={[Data.ARTICLE_TYPE_BANNER]}
						webAppArticleTypeCheckList={[Data.ARTICLE_TYPE_BANNER]}
						onFinish={(articleId) => {
							this.setState({
								articleId: articleId,
								isShowModel: false
							})
						}
						}
					/>
				</Modal>
				}
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="图片"
					width={Data.FORM_ITEM_WIDTH}
				>{getFieldDecorator('url', {
					initialValue: banner.url,
					rules: [{
						required: true, message: '请选择广告图片',
					}],
				})(
					<div className={Style.flexRowVCenter} style={{width: 300}}>
						<Input
							style={{width: 200}}
							value={banner.url} placeholder="图片地址"
							onChange={(event) => this.onChange(URL, event.target.value)}/>
						<text className={Style.imageSizeTip}>{SIZE_TIP_MAP.get(banner.locationId)}</text>
					</div>
				)}
					<ArticleImage
						title="网页端图片"
						onUrlChange={(url) => this.onChange(URL, url)}
						url={banner.url}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="位置"
					style={{}}
				>
					<Select
						value={banner.locationId}
						onChange={(value) => this.onChange(LOCATION, value)}
					>
						<Option
							value={Data.BANNER_LOCATION_INDEX}>{Data.BANNER_LOCATION_TITLE[Data.BANNER_LOCATION_INDEX]}</Option>
						<Option
							value={Data.BANNER_LOCATION_FLOAT}>{Data.BANNER_LOCATION_TITLE[Data.BANNER_LOCATION_FLOAT]}</Option>
						<Option
							value={Data.BANNER_LOCATION_CULTURE}>{Data.BANNER_LOCATION_TITLE[Data.BANNER_LOCATION_CULTURE]}</Option>
						<Option
							value={Data.BANNER_LOCATION_WEB}>{Data.BANNER_LOCATION_TITLE[Data.BANNER_LOCATION_WEB]}</Option>
					</Select>

				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="链接类型"
					style={{}}
				>
					<Select
						value={banner.actionType}
						onChange={(value) => this.onChange(ACTION_TYPE, value)}
					>
						<Option
							value={Data.BANNER_ACTION_TYPE_ARTICLE}>{Data.BANNER_ACTION_TYPE_TITLE[Data.BANNER_ACTION_TYPE_ARTICLE]}</Option>
						<Option
							value={Data.BANNER_ACTION_TYPE_SCENE}>{Data.BANNER_ACTION_TYPE_TITLE[Data.BANNER_ACTION_TYPE_SCENE]}</Option>
						<Option
							value={Data.BANNER_ACTION_TYPE_NOTHING}>{Data.BANNER_ACTION_TYPE_TITLE[Data.BANNER_ACTION_TYPE_NOTHING]}</Option>
					</Select>

				</FormItem>

				{Data.BANNER_ACTION_TYPE_ARTICLE === this.state.banner.actionType &&
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文章Id"
				>{getFieldDecorator('actionValue', {
					initialValue: this.state.articleId,
					rules: [{
						required: true, message: '请填写链接值',
					}],
				})(
					<div className={Style.flexRow} style={{width: 400}}>
						<Input
							style={{width: 200}}
							value={this.state.articleId} placeholder="请填写链接值"
							onChange={(event) => this.onChange2(ARTICLE, event.target.value)}/>
						<Button
							style={{marginLeft: '10px'}}
							onClick={() => this.onEditArticle()}
							type="normal"
							icon={this.getBtnAction(this.state.articleId)}>{this.getBtnTitle(this.state.articleId)}</Button>
					</div>
				)}
				</FormItem>
				}

				{Data.BANNER_ACTION_TYPE_SCENE === this.state.banner.actionType &&
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="跳转页面"
					style={{}}
				>
					<Select
						value={this.state.path}
						onChange={(value) => this.onChange2(PATH, value)}
					>
						<Option
							value={Data.BANNER_ACTION_TYPE_SCENE_ADMISSION}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_ADMISSION)}</Option>
						<Option
							value={Data.BANNER_ACTION_TYPE_SCENE_CULTURE}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_CULTURE)}</Option>
						<Option
							value={Data.BANNER_ACTION_TYPE_SCENE_COMPREHENSIVE_SCORE}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_COMPREHENSIVE_SCORE)}</Option>
						<Option
							value={Data.BANNER_ACTION_TYPE_SCENE_GUIDE}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_GUIDE)}</Option>
						<Option
							value={Data.BANNER_ACTION_TYPE_SCENE_TEACH}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_TEACH)}</Option>
						<Option
							value={Data.BANNER_ACTION_TYPE_SCENE_SCHOOL_COMPARE}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_SCHOOL_COMPARE)}</Option>
						<Option
							value={Data.BANNER_ACTION_TYPE_SCENE_STUDIO}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_STUDIO)}</Option>
						{/*<Option*/}
							{/*value={Data.BANNER_ACTION_TYPE_SCENE_QUESTIONS}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_QUESTIONS)}</Option>*/}
						{/*<Option*/}
							{/*value={Data.BANNER_ACTION_TYPE_SCENE_MINE}>{Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(Data.BANNER_ACTION_TYPE_SCENE_MINE)}</Option>*/}
					</Select>

				</FormItem>
				}


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="状态"
					hasFeedback
				>
					<Radio.Group
						onChange={(event) => this.onChange(VISIBLE, event.target.value)}
						value={banner.visible}>
						<Radio value={true}>启用</Radio>
						<Radio value={false}>禁用</Radio>
					</Radio.Group>
				</FormItem>


				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit" onClick={(e)=> this.handleSubmit(e)}>
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		});
	}

	
	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.saveBannerInfo();
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	getBtnTitle(id) {
		return id > 0 ? '修改文章' : '添加文章';
	}

	getBtnAction(id) {
		return id > 0 ? 'edit' : 'plus';
	}

	saveBannerInfo() {
		const param = {
			...this.state.banner
		};

		param.actionValue = (Data.BANNER_ACTION_TYPE_ARTICLE === param.actionType ?
			this.state.articleId : (Data.BANNER_ACTION_TYPE_SCENE === param.actionType ? this.state.path : ''));
		const {onDialogDismiss} = this.props;

		addOrUpdateBanner(param).then(function (response) {
			if(isSuccess(response)) {
				onDialogDismiss();
				message.success('Banner广告操作成功');
			} else {
				message.error('Banner广告操作失败 error: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error('Banner广告操作失败 error: ' + JSON.stringify(error));
		});

	}

	onChange2(type, value) {

		if (ARTICLE === type) {
			this.setState({
				articleId: value
			})
		} else if (PATH === type) {
			this.setState({
				path: value
			})
		}
	}

	onChange(type, value) {
		let {banner} = this.state;
		let newInfo = {...banner};
		switch (type) {
			case URL:
				newInfo.url = value;
				break;

			case ACTION_TYPE:
				newInfo.actionType = value;
				break;

			case ACTION_VALUE:
				newInfo.actionValue = value;
				break;

			case LOCATION:
				newInfo.locationId = value;
				break;

			case VISIBLE:
				newInfo.visible = value;
				break;
		}

		this.setState({
			banner: newInfo
		});
	}

	onEditArticle() {
		this.setState({
			isShowModel: true
		});
	}
}

export default EditView;
