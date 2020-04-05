import React, {PureComponent} from 'react';
import {connect} from 'dva';
import classNames from 'classnames';
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
	Switch,
	Icon,
	Tooltip,
	Spin
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import ArticleImage from '../../../components/ArticleImgage/ArticleImage';
import Style from './ArticleEditView.less';
import * as AppApi from '../../../services/AppApi';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import utils from "../../../../mock/utils";
import * as Data from '../../../data/data';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const LOCATION_MINI = 1;
const LOCATION_WEB = 2;

const HEADLINE_MINI = 0;
const HEADLINE_WEB = 1;


@connect(({article}) => ({
	article,
}))
@Form.create()
export default class ArticleEditView extends PureComponent {
	constructor(props) {
		super(props);
		const {id} = props;
		this.state = {
			isLocationFirst: true,
			isArticleTypeFirst: true,
			isImport: false,
			weiXinArticleUrl: '',
			locationCheckList: [],
			headlineCheckList: [],

			miniAppArticleTypeCheckList: [],
			webAppArticleTypeCheckList: [],

			colorOptions: [],
			codePrice: 0,
			kgPrice: 0,
			image: [],
			articleInfo: {
				id: id,
				title: "",
				articleDesc: "",
				content: "",
				defaultEditorState: BraftEditor.createEditorState('<p>初始化内容</p>'),
				readCount: 0,
				status: 1
			},
			miniAppLocation: {
				articleLocationId: LOCATION_MINI,
				enable: false,
				headlineArticle: false,
				titleImageUrl: "",
				topArticle: false
			}
			,
			webLocation: {
				articleLocationId: LOCATION_WEB,
				enable: false,
				headlineArticle: false,
				titleImageUrl: "",
				topArticle: false
			},
			locationList: [],
			headLineList: [],
			typeList: [],
			actionTitle: id === -1 ? "新增文章" : "更新文章"

		};

		this.selectedLocationCount = 0;

		this.locationData = {
			options: [
				{
					label: '小程序',
					value: LOCATION_MINI,
				},
				{
					label: '网页端',
					value: LOCATION_WEB,
				}
			],
			ids: [LOCATION_MINI, LOCATION_WEB]
		};

		this.headlineData = {
			options: [
				{
					label: '是否头条',
					value: HEADLINE_MINI,
				},
				{
					label: '是否头条',
					value: HEADLINE_WEB,
				}
			],
			ids: [HEADLINE_MINI, HEADLINE_WEB]
		};

		this.mimiAppArticleType = this.props.mimiAppArticleType;

		this.webArticleType = this.props.webArticleType
	}

	componentDidMount() {
		let that = this;
		//进行刷新获取文章
		if (-1 !== this.props.id) {
			this.getArticleById(this.props.id);
		} else {
			this.setState({
				miniAppArticleTypeCheckList: that.props.miniAppArticleTypeCheckList !== undefined ? that.props.miniAppArticleTypeCheckList : [],
				webAppArticleTypeCheckList: that.props.webAppArticleTypeCheckList !== undefined ? that.props.webAppArticleTypeCheckList : [],
			});
		}
	}

	getArticleById(id) {
		const that = this;
		AppApi.getCMSArticle(id)
			.then(function (response) {
				if (response.meta.code === 0) {
					console.log("获取先前文章成功 data: " + JSON.stringify(response.response));
					that.refreshEditArticleInfo(response.response);
				} else {
					message.error("获取先前文章失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("获取先前文章失败 error: " + JSON.stringify(e));
		});
	}

	refreshEditArticleInfo(srcArticle) {
		//1、Article
		let articleInfo = {
			id: srcArticle.id,
			title: srcArticle.title,
			articleDesc: srcArticle.articleDesc,
			content: srcArticle.content,
			readCount: srcArticle.readCount,
			status: srcArticle.status,
			author: srcArticle.author
		};

		//2、 typeList
		let typeList = [...srcArticle.typeIdList];
		let miniAppArticleTypeCheckList = [];
		let webAppArticleTypeCheckList = [];

		for (let index in typeList) {
			let type = typeList[index];

			if (this.mimiAppArticleType.ids.includes(type) && !miniAppArticleTypeCheckList.includes(type)) {
				miniAppArticleTypeCheckList.push(type);
			}

			if (this.webArticleType.ids.includes(type) && !webAppArticleTypeCheckList.includes(type)) {
				webAppArticleTypeCheckList.push(type);
			}

		}
		//3、LocationList
		let miniAppLocation = {
			articleLocationId: LOCATION_MINI,
			enable: false,
			headlineArticle: false,
			titleImageUrl: "",
			topArticle: false
		};
		let webLocation = {
			articleLocationId: LOCATION_WEB,
			enable: false,
			headlineArticle: false,
			titleImageUrl: "",
			topArticle: false
		};

		let locationList = [], headLineList = [];

		for (let index in srcArticle.locationRelationParamList) {
			let item = srcArticle.locationRelationParamList[index];
			if (LOCATION_WEB === item.articleLocationId) {
				webLocation = item;
				if (item.enable) {
					locationList.push(LOCATION_WEB);
				}

				if (item.headlineArticle) {
					headLineList.push(HEADLINE_WEB)
				}
			} else if (LOCATION_MINI === item.articleLocationId) {
				miniAppLocation = item;
				if (item.enable) {
					locationList.push(LOCATION_MINI);
				}

				if (item.headlineArticle) {
					headLineList.push(HEADLINE_MINI);
				}
			}
		}
		this.selectedLocationCount = locationList.length;
		console.log(' refresh headLineList: ' + JSON.stringify(headLineList));
		console.log(' refresh locationList: ' + JSON.stringify(locationList));
		console.log(' refresh typeList: ' + JSON.stringify(typeList));
		console.log(' refresh miniAppArticleTypeCheckList: ' + JSON.stringify(miniAppArticleTypeCheckList));
		console.log(' refresh webAppArticleTypeCheckList: ' + JSON.stringify(webAppArticleTypeCheckList));
		this.setState({
			articleInfo, typeList, webLocation, miniAppLocation, headLineList,
			locationList, miniAppArticleTypeCheckList, webAppArticleTypeCheckList
		});

	}


	getSetArticle() {
		const {
			articleInfo, miniAppArticleTypeCheckList, webAppArticleTypeCheckList,
			locationList, headLineList, miniAppLocation, webLocation
		} = this.state;

		//1.文章类型
		let typeList = [...miniAppArticleTypeCheckList, ...webAppArticleTypeCheckList];


		//2、文章位置信息 小程序，是否头条
		if (headLineList.includes(HEADLINE_MINI)) {
			console.log(' getArticle headLineList mini is headline ... ');
			miniAppLocation.headlineArticle = true;
		}

		//3、文章位置信息 网页端，是否头条
		if (headLineList.includes(HEADLINE_WEB)) {
			console.log(' getArticle headLineList web is headline ... ');
			webLocation.headlineArticle = true;
		}

		console.log(' getArticle articleInfo: ' + JSON.stringify(articleInfo));
		console.log(' getArticle typeList: ' + JSON.stringify(typeList));
		console.log(' getArticle headLineList: ' + JSON.stringify(headLineList));

		//返回的最终的内容
		let article = {...articleInfo};
		article.typeIdList = typeList;

		//4、 位置信息数据表
		let locationRelationParamList = [];
		miniAppLocation.enable = locationList.includes(LOCATION_MINI);
		webLocation.enable = locationList.includes(LOCATION_WEB);
		locationRelationParamList.push(miniAppLocation);
		locationRelationParamList.push(webLocation);

		article.locationRelationParamList = locationRelationParamList;

		console.log(' end article: ' + JSON.stringify(article));
		return article;
	}


	onLocationCheckChange(locationCheckList) {
		this.setState({
			locationList: locationCheckList,
			isLocationFirst: false
		});
	}

	onHeadlineCheckListCheckChange(headlineCheckList) {
		this.setState({
			headLineList: headlineCheckList,
		});
	}

	onMiniAppArticleTypeCheckListChange(miniAppArticleTypeCheckList) {
		this.setState({
			miniAppArticleTypeCheckList,
			isArticleTypeFirst: false
		});
	}

	onWebAppArticleTypeCheckListChange(webAppArticleTypeCheckList) {
		this.setState({
			webAppArticleTypeCheckList,
			isArticleTypeFirst: false
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err && this.state.locationList.length > 0 &&
				(this.state.miniAppArticleTypeCheckList.length + this.state.webAppArticleTypeCheckList.length) > 0) {
				this.addOrUpdateArticle();
			} else {
				console.error(' user input data is invalied , error msg: ' + JSON.stringify(err));
				this.setState({
					isLocationFirst: false,
					isArticleTypeFirst: false
				});
			}
		});
	}

	changeArticleStatus(id, status) {
		const {onFinish} = this.props;
		const {actionTitle} = this.state;
		let that = this;
		let action = status === 1 ? '文章发布' : '文章下架';
		AppApi.changeArticlePublishStatus(id, status)
			.then(function (response) {
				if (response.meta.code === 0) {
					if (that.props.showSuccessTip) {
						message.success(`${actionTitle}成功`);
					}
					if (onFinish !== undefined) {
						onFinish(id);
					}
				} else {
					message.error(`${action}失败 errorMsg: ` + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error(`${action}失败 error: ` + JSON.stringify(e));
		});
	}

	addOrUpdateArticle() {
		const {onFinish, onFailed} = this.props;
		const {actionTitle} = this.state;
		let that = this;
		let info = this.getSetArticle();
		let status = info.status;
		AppApi.addArticle(info)
			.then(function (response) {
				if (response.meta.code === 0) {
					// if(that.props.showSuccessTip) {
					// 	message.success(`${actionTitle}成功`);
					// }

					let articleId = response.response.id;
					that.changeArticleStatus(articleId, status);

				} else {
					if (onFailed !== undefined) {
						onFailed();
					}
					message.error(`${actionTitle}失败 errorMsg: ` + JSON.stringify(response.meta));
				}
			}).catch(function (error) {
			message.error(`${actionTitle}失败 error: ` + JSON.stringify(error));
			if (onFailed !== undefined) {
				onFailed();
			}
		});
	}


	render() {
		const {
			miniUrl, webUrl, miniAppLocation, webLocation, locationList,
			headLineList, typeList, articleInfo, webAppArticleTypeCheckList, miniAppArticleTypeCheckList
		} = this.state;

		const {submitting, title} = this.props;
		const {getFieldDecorator, getFieldValue} = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 7},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 12},
				md: {span: 10},
			},
		};

		const submitFormLayout = {
			wrapperCol: {
				xs: {span: 24, offset: 0},
				sm: {span: 10, offset: 7},
			},
		};

		const that = this;

		//发布位置
		const locationData = [];
		for (const index in that.locationData.options) {
			const option = (that.locationData.options)[index];
			const view = (
				<Col span={5}>
					<Checkbox value={option.value}>{option.label}</Checkbox>
				</Col>
			);
			locationData.push(view);
		}

		//是否头条
		const headlineData = [];
		for (const index in that.headlineData.options) {
			const option = (that.headlineData.options)[index];
			const view = (
				<Col span={5}>
					<Checkbox value={option.value}>{option.label}</Checkbox>
				</Col>
			);
			headlineData.push(view);
		}


		//小程序位置的文章类型(根据外部 props 来传递)
		const miniAppOption = [];
		for (const index in that.mimiAppArticleType.options) {
			const option = (that.mimiAppArticleType.options)[index];
			const view = (
				<Col span={5}>
					<Checkbox value={option.value}>{option.label}</Checkbox>
				</Col>
			);
			miniAppOption.push(view);
		}

		//网页端位置的文章类型(根据外部 props 来传递)
		const webOption = [];
		for (const index in that.webArticleType.options) {
			const option = (that.webArticleType.options)[index];
			const view = (
				<Col span={5}>
					<Checkbox value={option.value}>{option.label}</Checkbox>
				</Col>
			);
			webOption.push(view);
		}

		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				<FormItem
					{...formItemLayout}
					label="文章发布"
				>
					<div className={Style.articleLocationLayout}>
						<div className={Style.articleLocationItem}>
							<CheckboxGroup
								defaultValue={locationList}
								value={locationList}
								style={{width: '85%'}}
								onChange={locationCheckList => this.onLocationCheckChange(locationCheckList)}
							>
								<Row>{locationData}</Row>
							</CheckboxGroup>
						</div>

						{this.props.shouldShowHeadLineSet &&
						<div className={Style.articleLocationItem}>
							<CheckboxGroup
								defaultValue={headLineList}
								value={headLineList}
								style={{width: '85%'}}
								onChange={headlineCheckList => this.onHeadlineCheckListCheckChange(headlineCheckList)}
							>
								<Row>{headlineData}</Row>
							</CheckboxGroup>
						</div>
						}
						{
							!this.state.isLocationFirst && this.state.locationList.length === 0 &&
							<text style={{color: '#f00'}}>请选择文章位置</text>
						}

					</div>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="文章类型"
				>
					{getFieldDecorator('articleType')(
						<div className={Style.articleLocationLayout}>
							<div className={Style.articleLocationItem}>
								<text className={Style.title}>小程序：</text>
								<CheckboxGroup
									disabled={this.props.disableEditType}
									defaultValue={miniAppArticleTypeCheckList}
									value={miniAppArticleTypeCheckList}
									style={{width: '85%'}}
									onChange={miniAppArticleTypeCheckList => this.onMiniAppArticleTypeCheckListChange(miniAppArticleTypeCheckList)}
								>
									<Row>{miniAppOption}</Row>
								</CheckboxGroup>
							</div>

							<div className={Style.articleLocationItem}>
								<text className={Style.title}>网页端：</text>
								<CheckboxGroup
									disabled={this.props.disableEditType}
									defaultValue={webAppArticleTypeCheckList}
									value={webAppArticleTypeCheckList}
									style={{width: '85%'}}
									onChange={webAppArticleTypeCheckList => this.onWebAppArticleTypeCheckListChange(webAppArticleTypeCheckList)}
								>
									<Row>{webOption}</Row>
								</CheckboxGroup>
							</div>

							{
								!this.state.isArticleTypeFirst && (miniAppArticleTypeCheckList.length + webAppArticleTypeCheckList.length) === 0 &&
								<text style={{color: '#f00'}}>请选择文章类型</text>
							}
						</div>
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="标题"
					hasFeedback
				>
					{getFieldDecorator('title', {
						initialValue: articleInfo.title,
						rules: [{
							required: true, message: '请输入标题信息',
						}],
					})(
						<Input value={articleInfo.title} placeholder="" onChange={this.onTitleChange.bind(this)}/>
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="作者"
					hasFeedback
				>
					{getFieldDecorator('author', {
						initialValue: articleInfo.author,
					})(
						<Input value={articleInfo.author} placeholder="选填" onChange={this.onAuthorChange.bind(this)}/>
					)}
				</FormItem>

				{this.state.locationList.includes(LOCATION_MINI) &&
				<FormItem
					{...formItemLayout}
					label="小程序图片"
					hasFeedback
				>
					{getFieldDecorator('miniAppImageUrl', {
						initialValue: miniAppLocation.titleImageUrl,
						rules: [{
							required: this.state.locationList.includes(LOCATION_MINI), message: '请输入小程序文章的封面图片的URL',
						}],
					})(
						<div className={Style.flexRowVCenter} style={{width: 500}}>
							<Input style={{width: 320}} value={miniAppLocation.titleImageUrl} placeholder="图片地址"
							       onChange={(event) => this.onMiniUrlChange(event.target.value)}/>
							<text className={Style.imageSizeTip}>
								{this.state.headLineList.includes(HEADLINE_MINI) ? this.props.miniAppTitleImageSizeTip : this.props.miniAppImageSizeTip}
							</text>
						</div>
					)}
					<ArticleImage
						title="小程序图片"
						onUrlChange={(url) => this.onMiniUrlChange(url)}
						url={miniAppLocation.titleImageUrl}
					/>

				</FormItem>
				}

				{this.state.locationList.includes(LOCATION_WEB) &&
				<FormItem
					{...formItemLayout}
					label="网页端图片"
					hasFeedback
				>{getFieldDecorator('webImageUrl', {
					initialValue: webLocation.titleImageUrl,
					rules: [{
						required: this.state.locationList.includes(LOCATION_WEB), message: '请输入网页端文章的封面图片的URL',
					}],
				})(
					<div className={Style.flexRowVCenter} style={{width: 500}}>
						<Input style={{width: 320}}  value={webLocation.titleImageUrl} placeholder="图片地址"
						       onChange={(event) => this.onWebUrlChange(event.target.value)}/>
						<text className={Style.imageSizeTip}>{this.props.webAppImageSizeTip}
						</text>
					</div>
				)}
					<ArticleImage
						title="网页端图片"
						onUrlChange={(url) => this.onWebUrlChange(url)}
						url={webLocation.titleImageUrl}
					/>
				</FormItem>
				}
				<FormItem
					{...formItemLayout}
					label="点击量"
				>
					{getFieldDecorator('readSum', {
						initialValue: articleInfo.readCount,
						rules: [{
							required: true, message: '请输入点击量',
						}],
					})(
						<InputNumber min={0} onChange={this.onFocusChange.bind(this)} value={articleInfo.readCount}
						             placeholder=""/>
					)}
				</FormItem>


				<FormItem
					{...formItemLayout}
					label="导入文章"
				>
					{getFieldDecorator('inputArticle', {
						initialValue: that.state.weiXinArticleUrl,
					})(
						<div>
							<div className={classNames(Style.importLayout)}>
								<Input value={that.state.weiXinArticleUrl} placeholder="请输入微信公众号文章地址"
								       onChange={(event) => this.onWeiXinArticleUrlChange(event.target.value)}/>
								<Spin spinning={this.state.isImport} style={{marginLeft: '1rem'}}/>
							</div>
							<Button onClick={() => this.importArticle()} loading={this.state.isImport}>导入</Button>
						</div>
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="文章内容"
				>
					{getFieldDecorator('content', {
						initialValue: articleInfo.content,
						rules: [{
							required: true, message: '请输入文章内容',
						}],
					})(
						<TextArea onChange={(event) => this.onContentChange(event.target.value)}
						          value={articleInfo.content}
						          style={{minHeight: 32}}
						          placeholder="" rows={4}/>
					)}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="是否发布"
					style={{}}
				>
					<Switch checked={articleInfo.status === 1}
					        onChange={(value) => this.onEnableChange(value)}/>
				</FormItem>


				<FormItem {...submitFormLayout} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit" loading={submitting}>
						提交
					</Button>
					{/*{articleInfo.id !== -1 ? (articleInfo.status === 1 ?*/}
					{/*<Button type="primary" onClick={() => this.changeArticleStatus(this.state.articleInfo.id, 0)}*/}
					{/*className={Style.undercarriageBtn}>下架</Button> :*/}
					{/*<Button type="primary" onClick={() => this.changeArticleStatus(this.state.articleInfo.id, 1)} className={Style.publishBtn}>发布</Button> )*/}
					{/*: null}*/}
				</FormItem>

			</Form>
		);
	}

	onMiniUrlChange(url) {
		let {miniAppLocation} = this.state;
		let obj = {...miniAppLocation};
		obj.titleImageUrl = url;
		this.setState({
			miniAppLocation: obj
		})
	}

	onWeiXinArticleUrlChange(value) {
		this.setState({
			weiXinArticleUrl: value
		})
	}

	onWebUrlChange(url) {
		let {webLocation} = this.state;
		let obj = {...webLocation};
		obj.titleImageUrl = url;
		this.setState({
			webLocation: obj
		})
	}

	onTitleChange(event) {
		let {articleInfo} = this.state;
		articleInfo.title = event.target.value;
		this.setState({
			articleInfo
		});
	}

	onAuthorChange(event) {
		let {articleInfo} = this.state;
		articleInfo.author = event.target.value;
		this.setState({
			articleInfo
		});
	}

	onContentChange(value) {
		console.log(" 微信文章导入成功，现在保存变量中...value: " + value);
		let {articleInfo} = this.state;
		let newInfo = {...articleInfo};
		let filter = value.replace(/id="js_content" style="visibility: hidden;"/g, 'id="js_content"');
		console.log(" 微信文章导入成功，现在保存变量中...filter: " + filter);
		newInfo.content = filter;
		this.setState({
			articleInfo: newInfo
		});
	}

	onEnableChange(value) {
		let {articleInfo} = this.state;
		let newInfo = {...articleInfo};
		newInfo.status = value ? 1 : 0;

		this.setState({
			articleInfo: newInfo
		});
	}

	onFocusChange(value) {
		let {articleInfo} = this.state;
		articleInfo.readCount = value;
		this.setState({
			articleInfo
		});
	}

	saveCurrEditorState(editorState) {
		let that = this;
		let newArticleInfo = {...that.state.articleInfo};

		newArticleInfo.content = editorState.toHTML();

		this.setState({
			articleInfo: newArticleInfo
		});
	}

	handleEditorChange(editorState) {
		this.saveCurrEditorState(editorState);
	};

	importArticle() {
		let that = this;
		let url = this.state.weiXinArticleUrl;
		if (url === undefined || url.isEmpty || url === '') {
			message.error('导入文章失败：微信公众号地址不允许为空');
			return;
		}

		this.setState({
			isImport: true,
		}, function () {
			setTimeout(function () {
				let param = {
					weixinUrl: url
				};
				AppApi.parseWeiXinArticle(param).then(function (response) {
					message.success(' 微信公众号文章导入成功');
					let result = response.response;
					console.log(' parseWeiXinArticle success result: ' + result);
					that.setState({
						isImport: false,
					}, function () {
						console.log(" 微信文章导入成功，现在保存变量中...");
						that.onContentChange(result);
					})

				}).catch(function (error) {
					message.error(' parseWeiXinArticle error: ' + JSON.stringify(error));
					that.setState({
						isImport: false,
					})
				});
			}, 1000);
		})


	}

}

ArticleEditView.defaultProps = {
	shouldShowHeadLineSet: true,
	disableEditType: false,
	showSuccessTip: true,
	miniAppImageSizeTip: '比例收集中...',
	webAppImageSizeTip: '比例收集中...',
	miniAppTitleImageSizeTip: '比例收集中...',
	webAppTitleImageSizeTip: '比例收集中...',
};
