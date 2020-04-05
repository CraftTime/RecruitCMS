import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import {getStudioBannerList, deleteStudioBanner, addOrUpdateStudioBanner} from '../../../services/AppApi';
import BannerEditView from './BannerEditView';
import ArticleEditView from '../../Article/edit/ArticleEditView';


const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;

@connect(({studio}) => ({
	studio,
}))
class BannerListView extends Component {

	constructor(props) {
		super();
		this.state = {
			operateMode: BASE_INFO,
			isShowModel: false,
			response: {},
			modelTitle: '',
			banner: null,
		}
	}

	componentDidMount() {
		this.refreshBannerList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshBannerList(pageIndex, pageSize) {

		const param = {
			studioId: this.props.studioInfo.id,
			pagination: {
				pageIndex: pageIndex,
				pageSize: pageSize,
			}
		};

		let that = this;

		getStudioBannerList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error(" 画室Banner获取失败: " + that.props.studioInfo.name);
			}

		}).catch(function (error) {
			message.error(" 画室=" + that.props.studioInfo.name + ", Banner获取失败: " + JSON.stringify(error));
		});
	}

	render() {
		const {selectedRowKeys, studioInfo} = this.props;
		const {response} = this.state;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (<text>{index + 1}</text>)
			},
			{
				title: '画室名称',
				align: 'center',
				render: (val, record) => (<text>{studioInfo.name}</text>),
			},
			{
				title: '图片',
				align: 'center',
				dataIndex: 'url',
				render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
			},
			{
				title: '描述',
				align: 'center',
				dataIndex: 'desc',
			},
			{
				title: '内容编辑',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(ARTICLE, record)} type="normal"
						        shape="circle" icon="edit"/>
					</div>
				),
			},

			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
						        shape="circle"
						        icon="edit"/>

						<Popconfirm title="是否要删除该画室Banner？"
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
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					{this.getOpView()}

				</Modal>
				}

				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshBannerList(1, Data.PAGINATION_INFO.pageSize);
					}}>刷新</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onAdd()
					}}>添加</Button>
				</div>

				<Table
					size="small"
					bordered
					// rowSelection={rowSelection}
					dataSource={response.records}
					pagination={paginationProps}
					columns={columns}
					onChange={this.onPageChange.bind(this)}
				/>

			</div>
		);
	}

	onPageChange(page, pageSize) {
		this.refreshBannerList(page.current, page.pageSize);
	}

	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		}, function () {
			this.refreshBannerList(1, Data.PAGINATION_INFO.pageSize);
		});
	}

	onDelClick(id) {
		let that = this;
		const param = {
			id: id
		};
		deleteStudioBanner(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshBannerList(1, Data.PAGINATION_INFO.pageSize);
					message.success("删除画室Banner成功");
				} else {
					message.error("删除画室Banner失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除画室Banner失败 error: " + JSON.stringify(e));
		});
	}

	getOpView() {
		switch (this.state.operateMode) {
			case BASE_INFO:
				return (
					<BannerEditView
						studioInfo={this.props.studioInfo}
						banner={this.state.banner}
						onDialogDismiss={() => this.onDialogDismiss()}
					/>

				);
				break;
			case ARTICLE:
				return (
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_MINI_APP_TRAIN_BANNER}
						webAppImageSizeTip={Data.LOGO_SIZE_TIP_WEB_TRAIN_BANNER}

						id={this.state.banner === null ? -1 : this.state.banner.articleId}
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
						onFinish={(articleId)=> this.addOrUpdateArticleId(articleId)}
					/>
				);
				break;
		}
	}

	addOrUpdateArticleId(articleId) {
		let newInfo = {...this.state.banner};
		newInfo.articleId = articleId;
		const param = {
			studioId: this.props.studioInfo.id,
			banner: newInfo
		};
		let that = this;
		addOrUpdateStudioBanner(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				console.error("画室Banner板块更新ArticleId成功");
			} else {
				console.error("画室Banner板块更新ArticleId失败 error: " + JSON.stringify(response));
			}
			that.onDialogDismiss();

		}).catch(function (error) {
			console.error("画室Banner板块更新ArticleId失败 error: " + JSON.stringify(error));
			that.onDialogDismiss();
		});
	}

	onShowOperatorView(type, record) {
		this.setState({
			isShowModel: true,
			operateMode: ARTICLE,
			modelTitle: '画室Banner文章详情',
			banner: record
		});
	}

	onEdit(banner) {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: '编辑画室Banner',
			banner: banner
		});
	}

	onAdd() {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: '新增画室Banner',
			banner: null
		});
	}


}

export default BannerListView;
