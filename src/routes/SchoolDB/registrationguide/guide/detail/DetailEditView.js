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
	InputNumber,
	Radio,
	Modal,
	Tooltip,
} from 'antd';
import * as Data from '../../../../../data/data';
import {isSuccess} from '../../../../../utils/utils'
import Style from './DetailEditView.less';
import ArticleEditView from '../../../../Article/edit/ArticleEditView';
import ProfessionListView from '../profession/ProfessionListView';

import {
	getApplyGuiderIntroduce, getApplyGuiderStrength,
	updateApplyGuiderIntroduce, updateApplyGuiderStrength
} from '../../../../../services/AppApi';

const FormItem = Form.Item;

const STRENGTH = 1;
const INTRODUCTION = 2;
const PROFESSION_LIST = 3;


@Form.create()
class DetailEditView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowStrengthDialog: false,
			isShowIntroductionDialog: false,
			isShowProfessionList: false,
			strengthArticleId: -2,
			introductionArticleId: -2,

			currArticleId: -1,
			type: -1

		}
	}


	componentDidMount() {
		this.refreshArticleInfo();
	}

	refreshArticleInfo() {
		let that = this;
		getApplyGuiderIntroduce(this.props.schoolId).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					introductionArticleId: response.response.articleId
				});
				console.log(" 报考指南，学校介绍文章id获取成功 id: " + response.response.articleId);
			} else {
				console.error("报考指南，学校介绍文章id获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			console.error("报考指南，学校介绍文章id获取失败 error: " + JSON.stringify(error));
		});

		getApplyGuiderStrength(this.props.schoolId).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					strengthArticleId: response.response.articleId
				});
				console.log(" 报考指南，师资力量文章id获取成功 id: " + response.response.articleId);
			} else {
				console.error("报考指南，师资力量文章id获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			console.error("报考指南，师资力量文章id获取失败 error: " + JSON.stringify(error));
		});
	}

	getBtnTitle(id) {
		return id > 0 ? "修改文章" : -2 === id ? '' : '添加文章';
	}

	getBtnAction(id) {
		return id > 0 ? "edit" : -2 === id ? '' : 'plus';
	}

	onDetailDialogDismiss() {
		let that = this;
		this.setState({
			isShowStrengthDialog: false,
			isShowIntroductionDialog: false,
			isShowProfessionList: false,
		}, function () {
			that.refreshArticleInfo()
		});
	}


	render() {

		return (
			<div>

				{this.state.isShowIntroductionDialog &&
				<Modal
					destroyOnClose="true"
					title={this.props.schoolName +  "-" + "学校介绍-文章编辑"}
					onCancel={() => this.onDetailDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_NOT_TITLE_ARTICLE}
						showSuccessTip="false"
						id={this.state.currArticleId}
						disableEditType={true}
						shouldShowHeadLineSet={false}
						mimiAppArticleType={
							{
								options: [
									{
										label: '学校介绍',
										value: Data.ARTICLE_TYPE_REGISTRATION_GUIDE_PROFESSIONAL,
									}
								],
								ids: [Data.ARTICLE_TYPE_REGISTRATION_GUIDE_PROFESSIONAL]
							}
						}
						webArticleType={
							{
								options: [
									{
										label: '学校介绍',
										value: Data.ARTICLE_TYPE_REGISTRATION_GUIDE_PROFESSIONAL,
									}
								],
								ids: [Data.ARTICLE_TYPE_REGISTRATION_GUIDE_PROFESSIONAL]
							}
						}
						miniAppArticleTypeCheckList={[Data.ARTICLE_TYPE_REGISTRATION_GUIDE_PROFESSIONAL]}
						webAppArticleTypeCheckList={[Data.ARTICLE_TYPE_REGISTRATION_GUIDE_PROFESSIONAL]}
						onFinish={(articleId) => this.addOrUpdateArticleId(articleId)}
					/>
				</Modal>

				}
				{this.state.isShowStrengthDialog &&
				<Modal
					destroyOnClose="true"
					title={this.props.schoolName +  "-" + "师资力量-文章编辑"}
					onCancel={() => this.onDetailDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_NOT_TITLE_ARTICLE}
						showSuccessTip={false}
						id={this.state.currArticleId}
						disableEditType={true}
						shouldShowHeadLineSet={false}
						mimiAppArticleType={
							{
								options: [
									{
										label: '师资力量',
										value: Data.ARTICLE_TYPE_REGISTRATION_GUIDE_TEACHER,
									}
								],
								ids: [Data.ARTICLE_TYPE_REGISTRATION_GUIDE_TEACHER]
							}
						}
						webArticleType={
							{
								options: [
									{
										label: '师资力量',
										value: Data.ARTICLE_TYPE_REGISTRATION_GUIDE_TEACHER,
									}
								],
								ids: [Data.ARTICLE_TYPE_REGISTRATION_GUIDE_TEACHER]
							}
						}
						miniAppArticleTypeCheckList={[Data.ARTICLE_TYPE_REGISTRATION_GUIDE_TEACHER]}
						webAppArticleTypeCheckList={[Data.ARTICLE_TYPE_REGISTRATION_GUIDE_TEACHER]}
						onFinish={(articleId) => this.addOrUpdateArticleId(articleId)}
					/>
				</Modal>
				}

				{this.state.isShowProfessionList &&
					<Modal
						destroyOnClose="true"
						title={this.props.schoolName +  "-" + "专业介绍"}
						onCancel={() => this.onDetailDialogDismiss()}
						visible={true}
						width={Data.MODEL_WIDTH}
						footer={[]}
					>
						<ProfessionListView
							schoolId={this.props.schoolId}
						/>
					</Modal>
				}


				<Form
					onSubmit={e => this.handleSubmit(e)}
					hideRequiredMark
					style={{marginTop: 8}}
				>
					<FormItem
						{...Data.FORM_ITEM_LAYOUT}
						label="学校介绍"
						style={{}}
					>
						<Button className={Style.editButton}
						        onClick={() => this.onEdit(INTRODUCTION, this.state.introductionArticleId)}
						        type="normal"
						        icon={this.getBtnAction(this.state.introductionArticleId)}>{this.getBtnTitle(this.state.introductionArticleId)}</Button>
					</FormItem>

					<FormItem
						{...Data.FORM_ITEM_LAYOUT}
						label="师资力量"
						style={{}}
					>
						<Button
						        onClick={() => this.onEdit(STRENGTH, this.state.strengthArticleId)}
						        type="normal"
						        icon={this.getBtnAction(this.state.strengthArticleId)}>{this.getBtnTitle(this.state.strengthArticleId)}</Button>
					</FormItem>

					<FormItem
						{...Data.FORM_ITEM_LAYOUT}
						label="专业介绍"
						style={{}}
					>
						<Button className={Style.editButton}
						        onClick={() => this.onEdit(PROFESSION_LIST, -1)}
						        type="normal" icon="edit">操作</Button>
					</FormItem>

				</Form>
			</div>
		);
	}

	onEdit(type, id) {
		this.setState({
			isShowStrengthDialog: STRENGTH === type,
			isShowIntroductionDialog: INTRODUCTION === type,
			isShowProfessionList: PROFESSION_LIST === type,
			currArticleId: id,
			type: type
		});
	}

	addOrUpdateArticleId(articleId) {
		console.log('addOrUpdateArticleId articleId: ' + articleId);
		let that = this;
		switch (this.state.type) {
			case INTRODUCTION:
				console.log(" addOrUpdateArticleId INTRODUCTION ... ");
				if (-1 === this.state.introductionArticleId) {
					console.log(" addOrUpdateArticleId INTRODUCTION .Add. ");
					updateApplyGuiderIntroduce(this.props.schoolId, articleId)
						.then(function (response) {
							if (isSuccess(response)) {
								message.success("招生动态，学校介绍文章添加成功");
							} else {
								message.error("招生动态，学校介绍文章添加失败 errorMsg: " + JSON.stringify(response.meta));
							}
							that.onDetailDialogDismiss()
						}).catch(function (e) {
						message.error("招生动态，学校介绍文章添加失败 error: " + JSON.stringify(e));
						that.onDetailDialogDismiss()
					});
				} else {
					console.log(" addOrUpdateArticleId INTRODUCTION .Update. ");
					message.success("招生动态，学校介绍文章更新成功");
					that.onDetailDialogDismiss()
				}

				break;

			case STRENGTH:
				console.log(" addOrUpdateArticleId STRENGTH ... ");

				if (-1 === this.state.strengthArticleId) {
					console.log(" addOrUpdateArticleId STRENGTH .Add. ");
					updateApplyGuiderStrength(this.props.schoolId, articleId)
						.then(function (response) {
							if (isSuccess(response)) {
								message.success("招生动态，师资力量文章添加成功");
							} else {
								message.error("招生动态，师资力量文章添加失败 errorMsg: " + JSON.stringify(response.meta));
							}
							that.onDetailDialogDismiss()
						}).catch(function (e) {
						message.error("招生动态，师资力量文章添加失败 error: " + JSON.stringify(e));
						that.onDetailDialogDismiss()

					});
				} else {
					console.log(" addOrUpdateArticleId STRENGTH .Add. ");
					message.success("招生动态，师资力量文章更新成功");
					that.onDetailDialogDismiss()
				}
				break;

		}

	}


}

export default DetailEditView;
