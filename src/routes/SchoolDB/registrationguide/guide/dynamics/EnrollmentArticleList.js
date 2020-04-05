import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import {Upload, Button, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import PageHeaderLayout from '../../../../../layouts/PageHeaderLayout';
import Style from './EnrollmentArticleList.less';
import styles from '../../../../../components/StandardTable/index.less';
import ArticleEditView from '../../../../Article/edit/ArticleEditView';
import * as DateUtils from '../../../../../utils/DateUtils';
import * as AppApi from '../../../../../services/AppApi';
import * as Data from '../../../../../data/data';
import {isSuccess} from '../../../../../utils/utils';
import {getApplyGuiderEnrollmentList, deleteApplyGuiderEnrollment, addApplyGuiderEnrollment} from '../../../../../services/AppApi';


@connect(({article}) => ({
	article,
}))
class EnrollmentArticleList extends Component {

	state = {
		selectedRowKeys: [],
		isShowDialog: false,
		isEdit: false,
		currArticleId: -1,
		response: {},

	};

	componentDidMount() {
		this.refreshArticleList(1, Data.PAGINATION_INFO.pageSize);
	}

	refreshArticleList(pageIndex, pageSize) {
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize
		};
		let that = this;
		getApplyGuiderEnrollmentList(this.props.schoolId, param).then(function (response) {
			if (isSuccess((response))) {
				that.setState({
					response: response.response
				});
				console.log(" 院校招生动态文章获取成功");
			} else {
				message.error(" 院校招生动态文章获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(" 院校招生动态文章表获取失败 error: " + JSON.stringify(error));
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

	onDelClick(id) {
		const that = this;
		deleteApplyGuiderEnrollment(this.props.schoolId, id)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshArticleList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
					message.success("删除招生动态文章成功");
				} else {
					message.error("删除招生动态文章失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除招生动态文章失败 error: " + JSON.stringify(e));
		});
	}

	render() {
		const {selectedRowKeys, isShowDialog, currArticleId, response} = this.state;

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(response.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '标题',
				dataIndex: 'title',
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
				title: '创建时间',
				align: 'center',
				dataIndex: 'gmtCreated',
				render: (val, record, index) => (<text>{DateUtils.getFormatDate(val)}</text>)
			},
			{
				title: '状态',
				align: 'center',
				render: (val, record, index) => (<text>{record.status === 1 ? "已发布" : "未发布"}</text>)
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record) => (<div>
						<Button onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>

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

		const actionTitle = this.state.isEdit ? "更新招生动态文章" : "新增招生动态文章";

		return (

			<div>
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
						showSuccessTip={false}
						id={this.state.currArticleId}
						disableEditType={true}
						shouldShowHeadLineSet={false}
						mimiAppArticleType={
							{
								options: [
									{
										label: '招生动态',
										value: Data.ARTICLE_TYPE_REGISTRATION_GUIDE_RECRUIT,
									}
								],
								ids: [Data.ARTICLE_TYPE_REGISTRATION_GUIDE_RECRUIT]
							}
						}
						webArticleType={
							{
								options: [
									{
										label: '招生动态',
										value: Data.ARTICLE_TYPE_REGISTRATION_GUIDE_RECRUIT,
									}
								],
								ids: [Data.ARTICLE_TYPE_REGISTRATION_GUIDE_RECRUIT]
							}
						}
						miniAppArticleTypeCheckList={[Data.ARTICLE_TYPE_REGISTRATION_GUIDE_RECRUIT]}
						webAppArticleTypeCheckList={[Data.ARTICLE_TYPE_REGISTRATION_GUIDE_RECRUIT]}
						onFinish={(articleId) => this.addOrUpdateArticleId(articleId)}
					/>

				</Modal>
				}
				<div className={Style.commonBtnLayout}>
					<Button type="primary" className={Style.commonBtn} onClick={() => {
						this.refreshArticleList(response.current, Data.PAGINATION_INFO.pageSize);
					}}>刷新</Button>
					<Button type="primary" onClick={() => {
						this.onAddClick()
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
		});
	}


	onDialogDismiss() {
		this.setState({
			isShowDialog: false,
		}, function () {
			this.refreshArticleList(1, Data.PAGINATION_INFO.pageSize);
		});
	}

	addOrUpdateArticleId(articleId) {
		let that = this;
		if(this.state.currArticleId !== -1) {
			console.warn(" 报考指南_招生动态文章被更新，不进行添加文章");
			that.onDialogDismiss();
			return;
		}
		let title = this.state.currArticleId === -1 ? "新增招生动态文章" : "编辑招生动态文章";
		addApplyGuiderEnrollment(this.props.schoolId, articleId).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success(title + "成功");
			} else {
				message.error(title + "失败 error: " + JSON.stringify(response));
			}
			that.onDialogDismiss();

		}).catch(function (error) {
			message.error(title + "失败 error: " + JSON.stringify(error));
			that.onDialogDismiss();
		});
	}

}

export default EnrollmentArticleList;
