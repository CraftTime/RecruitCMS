import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {Upload, Button, Table, Alert, Badge, Card, Divider, Popconfirm, Modal, Icon} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from './ArticleList.less';
import styles from '../../../components/StandardTable/index.less';
import ArticleEditView from '../edit/ArticleEditView';
import * as DateUtils from '../../../utils/DateUtils';
import * as AppApi from '../../../services/AppApi';
import * as Data from '../../../data/data';
import CommentView from '../../Article/comment/CommentView';


@connect(({article}) => ({
	article,
}))
class ArticleList extends Component {

	state = {
		selectedRowKeys: [],
		isShowDialog: false,
		isEdit: false,
		currArticleId: -1,
		isShowComment: false,
		pageIndex: 1
	};

	componentDidMount() {
		this.refreshArticleList(1, Data.PAGINATION_INFO.pageSize);

	}

	refreshArticleList(pageIndex, pageSize) {
		this.setState({
			pageIndex
		}, ()=> {
			const param = {
				pageIndex: this.state.pageIndex,
				pageSize: pageSize,
				typeIds: [
					Data.ARTICLE_TYPE_HEADLINE,
					Data.ARTICLE_TYPE_LECTURE,
					Data.ARTICLE_TYPE_NEWS,
					Data.ARTICLE_TYPE_RECOMMEND,
					Data.ARTICLE_TYPE_COURSE,
					Data.ARTICLE_TYPE_SCHOOL,
					Data.ARTICLE_TYPE_TOPIC,
				]
			};

			const {dispatch} = this.props;
			dispatch({
				type: 'article/getArticleList',
				payload: {
					param: param
				}
			});
		});
	}

	handleRowSelectChange = (selectedRowKeys, selectedRows) => {
		const totalCallNo = selectedRows.reduce((sum, val) => {
			return sum + parseFloat(val.callNo, 10);
		}, 0);

		if (this.props.onSelectRow) {
			this.props.onSelectRow(selectedRows);
		}

		this.setState({selectedRowKeys, totalCallNo});
	};

	onEdit(record) {
		this.setState({
			isShowDialog: true,
			isEdit: true,
			currArticleId: record.id
		});
	}

	onShowComment(record) {
		this.setState({
			isEdit: true,
			currArticleId: record.id,
			isShowComment: true

		});
	}

	onDelClick(id) {
		const that = this;
		const param = {
			id: id
		};
		AppApi.delArticle(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshArticleList();
					message.success("删除文章成功");
				} else {
					message.error("删除文章失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除文章失败 error: " + JSON.stringify(e));
		});
	}

	onDelAllClick() {
		message.info("批量删除文章");
	}


	render() {
		const {article: {articleList, loading}} = this.props;
		const {selectedRowKeys, isShowDialog, currArticleId, isShowComment} = this.state;
		console.log(" article list: " + JSON.stringify(articleList));

		const renderLocation = (val, record, index) => {
			const obj = {
				children: record,
				props: {},
			};
			if (record.locationNameList.length === 1) {
				let location = record.locationNameList[0];
				obj.props.colSpan = 2;
				obj.children = (<text className={Style.locationType}>{location}</text>)
			} else if (record.locationNameList.length === 2) {
				let location = record.locationNameList[0];
				obj.props.colSpan = 1;
				obj.children = (<text className={Style.locationType}>{location}</text>)
			}
			return obj;
		};

		const renderLocation2 = (val, record, index) => {
			const obj = {
				children: record,
				props: {},
			};
			if (record.locationNameList.length === 1) {
				let location = record.locationNameList[0];
				obj.props.colSpan = 0;
			} else if (record.locationNameList.length === 2) {
				let location = record.locationNameList[1];
				obj.props.colSpan = 1;
				obj.children = (<text className={Style.locationType}>{location}</text>)
			}
			return obj;
		};

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(articleList.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '状态',
				align: 'center',
				render: (val, record, index) => (<text>{record.status === 1 ? "已发布" : "未发布"}</text>)
			},
			{
				title: '文章分类',
				dataIndex: 'locationNameList',
				colSpan: 2,
				align: 'center',
				render: renderLocation
			},
			{
				title: '文章分类',
				dataIndex: 'locationNameList',
				colSpan: 0,
				align: 'center',
				render: renderLocation2
			},
			{
				title: '标题',
				dataIndex: 'articleDesc',
				width: 200,
				align: 'center',
				render: (val, record, index) => {
					return {
						children: (<text>{record.title}</text>),
						props: {
							colSpan: 1,
						},
					};
				},
			},
			{
				title: '点击量',
				align: 'center',
				dataIndex: 'readCount'
			},
			{
				title: '评论状态',
				align: 'center',
				render: (val, record, index) => (
					<div className={Style.commentNumberLayout}>
						<div>
							<Badge showZero count={record.unCheckCommentCount}>
								<div className={Style.commentStatus}>
									<Icon type="question-circle" theme="twoTone" twoToneColor="#52c41a"/>
								</div>
							</Badge>
						</div>

						<div>
							<Badge showZero count={record.passCheckCommentCount}>
								<div className={Style.commentStatus}>
									<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>
								</div>
							</Badge>
						</div>

						<div>
							<Badge showZero count={record.rejectCheckCommentCount}>
								<div className={Style.commentStatus}>
									<Icon type="close-circle" theme="twoTone" twoToneColor="#52c41a"/>
								</div>
							</Badge>
						</div>
					</div>
				)
			},
			{
				title: '创建时间',
				align: 'center',
				dataIndex: 'gmtCreated',
				render: (val, record, index) => (<text>{DateUtils.getFormatDate(val)}</text>)
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record) => (<div>
						<Button onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>
						<Button onClick={() => this.onShowComment(record)} type="normal" shape="circle" icon="message"/>

						<Popconfirm title="是否要删除该文章？"
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
			total: articleList.total,
			defaultPageSize: articleList.size,
			pageSize: articleList.size,
			current: articleList.current
		};

		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: false,
			...pagination,
		};

		const actionTitle = this.state.isEdit ? "更新文章" : "新增文章";

		return (
			<PageHeaderLayout content="">
				{isShowDialog &&
				<Modal
					style={{marginBottom: '30rem'}}
					destroyOnClose="true"
					title={actionTitle}
					width={820}
					onCancel={() => this.onDialogCancel()}
					visible={true}
					footer={[]}
				>
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_NOT_TITLE_ARTICLE}
						miniAppTitleImageSizeTip={Data.LOGO_SIZE_TIP_HOME_TITLE_ARTICLE}
						mimiAppArticleType={Data.MIMI_APP_INDEX_ARTICLE_TYPE}
						webArticleType={Data.WEB_INDEX_ARTICLE_TYPE}
						webAppImageSizeTip={Data.LOGO_SIZE_TIP_WEB_ARTICLE}
						id={currArticleId}
						onFinish={() => {
							this.onAddOrEditFinish()
						}}
					/>

				</Modal>
				}
				{isShowComment &&
				<Modal
					style={{marginBottom: '30rem'}}
					destroyOnClose="true"
					title="文章评论"
					width={820}
					onCancel={() => this.onCommentDialogCancel()}
					visible={true}
					footer={[]}
				>
					<CommentView
						articleId={currArticleId}
						onFinish={() => {
							this.refreshArticleList(this.state.pageIndex, Data.PAGINATION_INFO.pageSize);
						}}
					/>

				</Modal>
				}


				<Card bordered={false}>
					<div className={Style.btnLayout}>
						<Button type="primary" onClick={() => {
							this.refreshArticleList()
						}}>刷新</Button>
						<Button type="primary" onClick={() => {
							this.onAddClick()
						}}>添加</Button>
						{/*<Button type="primary" onClick={() => {*/}
						{/*this.onDelAllClick()*/}
						{/*}}>删除</Button>*/}
					</div>

					<div className={styles.standardTable}>
						{/*<div className={styles.tableAlert}>*/}
						{/*<Alert*/}
						{/*message={*/}
						{/*<Fragment>*/}
						{/*已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;*/}
						{/*<a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>*/}
						{/*清空*/}
						{/*</a>*/}
						{/*</Fragment>*/}
						{/*}*/}
						{/*type="info"*/}
						{/*showIcon*/}
						{/*/>*/}
						{/*</div>*/}
						<Table
							size="small"
							bordered
							dataSource={articleList.records}
							loading={loading}
							pagination={paginationProps}
							columns={columns}
							onChange={this.onPageChange.bind(this)}
						/>
					</div>
				</Card>
			</PageHeaderLayout>
		);
	}

	onPageChange(page, pageSize) {
		this.refreshArticleList(page.current, page.pageSize);
	}

	onAddClick() {
		this.setState({
			isShowDialog: true,
			isEdit: false,
			currArticleId: -1
		});
	}

	onDialogCancel() {
		this.setState({
			isShowDialog: false,
			isShowComment: false
		});
	}

	onCommentDialogCancel() {
		this.setState({
			isShowDialog: false,
			isShowComment: false
		}, function () {
			this.refreshArticleList(this.state.pageIndex, Data.PAGINATION_INFO.pageSize);
		});
	}

	onAddOrEditFinish() {
		this.setState({
			isShowDialog: false,
		});
		this.refreshArticleList();
	}

}

export default ArticleList;
