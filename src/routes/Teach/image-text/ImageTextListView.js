import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import {getTeachImageTextList} from '../../../services/AppApi';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import ImageTextEditView from './ImageTextEditView';
import {addOrUpdateTeachImageText, deleteTeachImageText} from '../../../services/AppApi';
import ArticleEditView from '../../Article/edit/ArticleEditView';
import {isSuccess} from '../../../utils/utils';
import SecondTypeListView from './secondTypeList/SecondTypeListView';
import * as DateUtils from '../../../utils/DateUtils';

const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;
const COMMENT = BASE_INFO + 2;
const TYPE_MRG = BASE_INFO + 3;
const READ_COUNT = BASE_INFO + 4;
const SECOND_TYPE_MRG = BASE_INFO + 5;

@connect(({teach}) => ({
	teach,
}))
class ImageTextListView extends Component {

	constructor(props) {
		super();
		this.state = {
			operateMode: BASE_INFO,
			isShowModel: false,
			response: {},
			modelTitle: '',
			imageText: null

		}
	}

	componentDidMount() {
		this.refreshList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshList(pageIndex, pageSize) {
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize,
		};

		let that = this;

		getTeachImageTextList(param, this.props.typeId).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("图文教学列表获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error("图文教学列表获取失败 typeId: " + JSON.stringify(error));
		});
	}

	render() {
		const {selectedRowKeys, studioInfo} = this.props;
		const {response} = this.state;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(response.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '标题',
				align: 'center',
				dataIndex: 'title'
			},

			{
				title: '创建时间',
				align: 'center',
				dataIndex: 'gmtCreated',
				render: (val, record, index) => (<text>{DateUtils.getFormatDate(val)}</text>)
			},
			// {
			// 	title: '封面图片',
			// 	align: 'center',
			// 	dataIndex: 'titleImageUrl',
			// 	render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
			// },
			{
				title: '状态',
				align: 'center',
				render: (val, record, index) => (<text>{record.status === 1 ? "已发布" : "未发布"}</text>)
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'operator',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
						        shape="circle"
						        icon="edit">

						</Button>

						<Popconfirm title="是否要删除该图文教学？"
						            onConfirm={() => {
							            this.onDelClick(record.id)
						            }}
						            okText="确定" cancelText="取消">
							<Button type="normal" shape="circle" icon="delete"/>
						</Popconfirm>

					</div>
				),
			},


		];

		const rowSelection = {
			selectedRowKeys,
			onChange: this.handleRowSelectChange,
			getCheckboxProps: record => ({
				disabled: record.disabled,
			}),
		};

		const pagination = {
			total: response.total,
			defaultPageSize: response.size,
			pageSize: response.size,
			current: response.current
		};

		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: false,
			...pagination,
		};


		return (
			<div>
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title={this.state.modelTitle}
					onCancel={() => this.onDialogDismiss(false)}
					visible={true}
					width={(Data.MODEL_WIDTH)}
					footer={[]}
				>
					{this.getOpView()}

				</Modal>
				}

				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onShowTypeMrg();
					}}>图文教学一级类型管理</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onShowSecondTypeMrg();
					}}>图文教学二级类型管理</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshList(this.state.response.current, Data.PAGINATION_INFO.pageSize);
					}}>刷新</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onAdd()
					}}>添加</Button>
				</div>

				<Table
					size="small"
					bordered
					dataSource={response.records}
					pagination={paginationProps}
					columns={columns}
					onChange={this.onPageChange.bind(this)}
				/>

			</div>
		);
	}

	onPageChange(page, pageSize) {
		this.refreshList(page.current, page.pageSize);
	}

	onDialogDismiss(showReload) {
		let reload = arguments[0] ? arguments[0] : true;
		this.setState({
			isShowModel: false,
		}, function () {
			if (reload) {
				this.refreshList(1, Data.PAGINATION_INFO.pageSize);
			}
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));

	}

	onAdd() {
		this.setState({
			isShowModel: true,
			operateMode: ARTICLE,
			modelTitle: '新增图文教学',
			imageText: null
		});
	}

	onDelClick(articleId) {
		let that = this;
		deleteTeachImageText(this.props.typeId, articleId)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
					message.success("删除艺考教学图文成功");
				} else {
					message.error("删除艺考教学图文失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除艺考教学图文失败 error: " + JSON.stringify(e));
		});
	}


	onCommentClick() {
		this.setState({
			isShowModel: true,
			operateMode: COMMENT,
			modelTitle: this.getStudioName() + " / " + '图文教学类型'
		});
	}

	getOpView() {
		switch (this.state.operateMode) {
			case BASE_INFO:
				return (
					<ImageTextEditView
						studioInfo={this.props.studioInfo}
						typeId={this.props.typeId}
						video={this.state.imageText}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>

				);
				break;
			case ARTICLE:
				return (
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_NOT_TITLE_ARTICLE}
						showSuccessTip={false}
						id={this.state.imageText === null ? -1 : this.state.imageText.id}
						disableEditType={true}
						shouldShowHeadLineSet={false}

						mimiAppArticleType={
							{
								options: [
									{
										label: '艺考教学图文',
										value: Data.ARTICLE_TYPE_AE_IMAGE_TEXT,
									}
								],
								ids: [Data.ARTICLE_TYPE_AE_IMAGE_TEXT]
							}
						}
						webArticleType={
							{
								options: [
									{
										label: '艺考教学图文',
										value: Data.ARTICLE_TYPE_AE_IMAGE_TEXT,
									}
								],
								ids: [Data.ARTICLE_TYPE_AE_IMAGE_TEXT]
							}
						}
						miniAppArticleTypeCheckList={[Data.ARTICLE_TYPE_AE_IMAGE_TEXT]}
						webAppArticleTypeCheckList={[Data.ARTICLE_TYPE_AE_IMAGE_TEXT]}
						onFinish={(articleId)=> this.addOrUpdateArticleId(articleId)}
					/>
				);
				break;


			case TYPE_MRG:
				return (
					<TypeListView
						typeList={this.props.teach.imageTextTypeList}
						modelName="teach"
						addOrUpdateMethod="addOrUpdateImageTextType"
						getTypeListMethod="getImageTextTypeList"
						deleteUrl='/teachArticleTypeOne/delete'
						title="艺考教学一级图文类型"
					/>
				);
				break;

			case SECOND_TYPE_MRG:
				return (
					<SecondTypeListView
						parentTypeId={this.props.parentTypeId}
						onSecondTypeChange={()=> this.props.onSecondTypeChange()}
					/>
				);
				break;
		}
	}

	onShowTypeMrg() {
		this.setState({
			isShowModel: true,
			operateMode: TYPE_MRG,
			modelTitle: '艺考教学图文一级类型管理',
		});
	}
	onShowSecondTypeMrg() {
		this.setState({
			isShowModel: true,
			operateMode: SECOND_TYPE_MRG,
			modelTitle: '艺考教学图文二级类型管理',
		});
	}


	getStudioName() {
		return this.props.studioInfo.name
	}

	onEdit(record) {
		this.setState({
			isShowModel: true,
			operateMode: ARTICLE,
			modelTitle: '编辑图文教学',
			imageText: record
		});
	}


	addOrUpdateArticleId(articleId) {
		console.log('addOrUpdateArticleId articleId: ' + articleId);
		let that = this;
		console.log(" addOrUpdateArticleId INTRODUCTION ... ");
		if (this.state.imageText === null) {
			console.log(" addOrUpdateArticleId INTRODUCTION .Add. ");
			addOrUpdateTeachImageText(this.props.typeId, articleId)
				.then(function (response) {
					if (isSuccess(response)) {
						message.success("艺考教学图文教学添加成功");
						that.onDialogDismiss()
					} else {
						message.error("艺考教学图文教学添加失败 errorMsg: " + JSON.stringify(response));
						that.onDialogDismiss()
					}
				}).catch(function (e) {
				message.error("艺考教学图文教学添加失败 error: " + JSON.stringify(e));
				that.onDialogDismiss()
			});
		} else {
			console.log(" addOrUpdateArticleId INTRODUCTION .Update. ");
			message.success("艺考教学图文文章更新成功");
			that.onDialogDismiss()
		}
	}


}

export default ImageTextListView;
