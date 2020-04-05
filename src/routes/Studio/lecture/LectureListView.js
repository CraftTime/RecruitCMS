import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import {getStudioLectureList, addOrUpdateStudioLecture} from '../../../services/AppApi';
import InfoEditView from '../info/InfoEditView';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import LectureEditView from './LectureEditView';
import {deleteStudioLecture} from '../../../services/AppApi';
import ArticleEditView from '../../Article/edit/ArticleEditView';
import CommentView from '../../Article/comment/CommentView';

const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;
const COMMENT = BASE_INFO + 2;

@connect(({studio}) => ({
	studio,
}))
class LectureListView extends Component {

	constructor(props) {
		super();
		this.state = {
			operateMode: BASE_INFO,
			isShowModel: false,
			response: {},
			modelTitle: '',
			lecture: null

		}
	}

	componentDidMount() {
		this.refreshLectureList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshLectureList(pageIndex, pageSize) {
		const param = {
			studioId: this.props.studioInfo.id,
			pagination: {
				pageIndex: pageIndex,
				pageSize: pageSize,
				typeId: this.props.typeId
			}
		};

		let that = this;

		getStudioLectureList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error(" 画室课程列表获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error(" 画室课程列表获取失败 typeId: " + JSON.stringify(error));
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
				title: '画室名称',
				align: 'center',
				render: (val, record) => (<text>{studioInfo.name}</text>),
			},
			{
				title: '课程名称',
				align: 'center',
				dataIndex: 'name'
			},
			{
				title: '班型人数',
				align: 'center',
				dataIndex: 'studentCount'
			},
			{
				title: '班型费用(元)',
				align: 'center',
				dataIndex: 'studyFee'
			},
			{
				title: '封面图片',
				align: 'center',
				dataIndex: 'titleImageUrl',
				render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
			},
			{
				title: '排序',
				align: 'center',
				dataIndex: 'weight',
				render: (val, record, index) =>
					<InputNumber
						style={{width: '4rem'}}
						size="small"
						min={0}
						onChange={(value) => this.updateRank(record, value)}
						value={record.weight}
						placeholder=""/>

			},
			{
				title: '状态',
				align: 'center',
				render: (val, record, index) => (<text>{ -1 === record.articleId ? '未绑定文章' : '已绑定文章'}</text>)
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
				title: '评论管理',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onCommentClick(record)} type="normal"
						        shape="circle" icon="message"/>
					</div>
				),
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'operator',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
						        shape="circle"
						        icon="edit"/>

						<Popconfirm title="是否要删除该画室课程？"
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
						this.props.onShowTypeMrg();
					}}>画室课程类型管理</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshLectureList(this.state.response.current, Data.PAGINATION_INFO.pageSize);
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
		this.refreshLectureList(page.current, page.pageSize);
	}

	onDialogDismiss(showReload) {
		let that = this;
		this.setState({
			isShowModel: false,
		}, function () {
			if(showReload) {
				this.refreshLectureList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			}
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));

	}

	onEdit(lecture) {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '编辑画室课程',
			lecture: lecture
		});
	}

	onAdd() {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '新增画室课程',
			lecture: null
		});
	}

	onDelClick(id) {
		let that = this;
		const param = {
			id: id
		};
		deleteStudioLecture(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshLectureList(1, Data.PAGINATION_INFO.pageSize);
					message.success("删除画室课程成功");
				} else {
					message.error("删除画室课程失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除画室课程失败 error: " + JSON.stringify(e));
		});
	}


	onCommentClick(lecture) {
		this.setState({
			isShowModel: true,
			operateMode: COMMENT,
			modelTitle: this.getStudioName() + " / " + '画室图集文章评论管理',
			lecture: lecture
		});
	}


	onShowOperatorView(mode, record) {
		this.setState({
			isShowModel: true,
			operateMode: mode,
			lecture: record
		});
	}

	getOpView() {
		switch (this.state.operateMode) {
			case COMMENT:
				return (
					<CommentView
						articleId={this.state.lecture.articleId}
					/>

				);
				break;
			case BASE_INFO:
				return (
					<LectureEditView
						studioInfo={this.props.studioInfo}
						typeId={this.props.typeId}
						lecture={this.state.lecture}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>

				);
				break;
			case ARTICLE:
				return (
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_TRAIN_COMMON}
						webAppImageSizeTip={Data.LOGO_SIZE_TIP_TRAIN_COMMON}
						id={this.state.lecture === null ? -1 : this.state.lecture.articleId}
						disableEditType={true}
						shouldShowHeadLineSet={false}
						mimiAppArticleType={
							{
								options: [
									{
										label: '画室课程',
										value: Data.ARTICLE_TYPE_STUDIO_LECTURE,
									}
								],
								ids: [Data.ARTICLE_TYPE_STUDIO_LECTURE]
							}
						}
						webArticleType={
							{
								options: [
									{
										label: '画室课程',
										value: Data.ARTICLE_TYPE_STUDIO_LECTURE,
									}
								],
								ids: [Data.ARTICLE_TYPE_STUDIO_LECTURE]
							}
						}
						miniAppArticleTypeCheckList={[Data.ARTICLE_TYPE_STUDIO_LECTURE]}
						webAppArticleTypeCheckList={[Data.ARTICLE_TYPE_STUDIO_LECTURE]}
						onFinish={(articleId)=> this.addOrUpdateArticleId(articleId)}
					/>
				);
				break;
		}
	}

	addOrUpdateArticleId(articleId) {
		let newLecture = {...this.state.lecture};
		newLecture.typeId = this.props.typeId;
		newLecture.articleId = articleId;
		const param = {
			studioId: this.props.studioInfo.id,
			lecture: newLecture
		};
		let that = this;
		addOrUpdateStudioLecture(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				console.log("画室课程操作成功");
			} else {
				console.error("画室课程操作失败 error: " + JSON.stringify(response));
			}
			that.onDialogDismiss(true);

		}).catch(function (error) {
			console.error("画室课程操作失败 error: " + JSON.stringify(error));
			that.onDialogDismiss(true);
		});
	}

	updateRank(record, weight) {
		let newLecture = {...record};
		newLecture.typeId = this.props.typeId;
		newLecture.weight = weight;
		const param = {
			studioId: this.props.studioInfo.id,
			lecture: newLecture
		};
		let that = this;
		addOrUpdateStudioLecture(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success('画室课程排序成功');
				that.refreshLectureList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error("画室课程排序失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("画室课程排序失败: " + JSON.stringify(error));
		});
	}

	getStudioName() {
		return this.props.studioInfo.name
	}
}

export default LectureListView;
