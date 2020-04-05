import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import {addOrUpdateStudioVideo, getStudioTeacherList} from '../../../services/AppApi';
import InfoEditView from '../info/InfoEditView';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import TeacherEditView from './TeacherEditView';
import {deleteStudioTeacher, addOrUpdateStudioTeacher} from '../../../services/AppApi';
import ArticleEditView from '../../Article/edit/ArticleEditView';
import CommentView from '../../Article/comment/CommentView';
import {isEmpty} from "../../../utils/utils";


const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;
const COMMENT = BASE_INFO + 2;

@connect(({studio}) => ({
	studio,
}))
class TeacherListView extends Component {

	constructor(props) {
		super();
		this.state = {
			operateMode: BASE_INFO,
			isShowModel: false,
			response: {},
			modelTitle: '',
			teacher: {}

		}
	}

	componentDidMount() {
		this.refreshTeacherList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshTeacherList(pageIndex, pageSize) {
		const param = {
			studioId: this.props.studioInfo.id,
			pagination: {
				pageIndex: pageIndex,
				pageSize: pageSize,
				typeId: this.props.typeId
			}
		};

		let that = this;

		getStudioTeacherList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("教师列表获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error("教师列表获取失败 typeId: " + JSON.stringify(error));
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
				title: '教师名字',
				align: 'center',
				dataIndex: 'name'
			},

			{
				title: '头像',
				align: 'center',
				dataIndex: 'headImage',
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

						<Popconfirm title="是否要删除该教师？"
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
						this.props.onShowTypeMrg()
					}}>教师类型管理</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshTeacherList(1, Data.PAGINATION_INFO.pageSize);
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
		this.refreshTeacherList(page.current, page.pageSize);
	}

	onDialogDismiss(showReload) {
		this.setState({
			isShowModel: false,
		}, function () {
			if (showReload) {
				this.refreshTeacherList(1, Data.PAGINATION_INFO.pageSize);
			}
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));

	}

	onEdit(teacher) {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '编辑教师资料',
			teacher: teacher
		});
	}

	onAdd() {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '新增教师',
			teacher: null
		});
	}

	onDelClick(id) {
		let that = this;
		const param = {
			id: id
		};
		deleteStudioTeacher(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshTeacherList(1, Data.PAGINATION_INFO.pageSize);
					message.success("删除教师成功");
				} else {
					message.error("删除教师失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除教师失败 error: " + JSON.stringify(e));
		});
	}


	onCommentClick(teacher) {
		this.setState({
			isShowModel: true,
			operateMode: COMMENT,
			modelTitle: this.getStudioName() + " / " + '画室师资力量评论管理',
			teacher: teacher
		});
	}


	onShowOperatorView(mode, record) {
		this.setState({
			isShowModel: true,
			operateMode: mode,
			teacher: record
		});
	}

	getOpView() {
		switch (this.state.operateMode) {
			case COMMENT:
				return (
					<CommentView
						articleId={this.state.teacher.articleId}
					/>
				);
				break;
			case BASE_INFO:
				return (
					<TeacherEditView
						studioInfo={this.props.studioInfo}
						typeId={this.props.typeId}
						teacher={this.state.teacher}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>

				);
				break;
			case ARTICLE:
				return (
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_TRAIN_TEACHER}
						webAppImageSizeTip={Data.LOGO_SIZE_TIP_TRAIN_TEACHER}
						id={this.state.teacher === null ? -1 : this.state.teacher.articleId}
						disableEditType={true}
						shouldShowHeadLineSet={false}
						mimiAppArticleType={
							{
								options: [
									{
										label: '师资力量',
										value: Data.ARTICLE_TYPE_STUDIO_TEACHER,
									}
								],
								ids: [Data.ARTICLE_TYPE_STUDIO_TEACHER]
							}
						}
						webArticleType={
							{
								options: [
									{
										label: '师资力量',
										value: Data.ARTICLE_TYPE_STUDIO_TEACHER,
									}
								],
								ids: [Data.ARTICLE_TYPE_STUDIO_TEACHER]
							}
						}
						miniAppArticleTypeCheckList={[Data.ARTICLE_TYPE_STUDIO_TEACHER]}
						webAppArticleTypeCheckList={[Data.ARTICLE_TYPE_STUDIO_TEACHER]}
						onFinish={(articleId) => this.addOrUpdateArticleId(articleId)}
					/>
				);
				break;
		}
	}

	addOrUpdateArticleId(articleId) {
		let newInfo = {...this.state.teacher};
		newInfo.typeId = this.props.typeId;
		newInfo.institutionId = this.props.studioInfo.id;
		newInfo.articleId = articleId;
		const param = {
			studioId: this.props.studioInfo.id,
			teacher: newInfo
		};

		let that = this;
		addOrUpdateStudioTeacher(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				console.log("师资力量操作成功");
			} else {
				console.error("师资力量操作失败: " + JSON.stringify(response));
			}
			that.onDialogDismiss(true);

		}).catch(function (error) {
			console.error("师资力量操作失败: " + JSON.stringify(error));
			that.onDialogDismiss(true);
		});
	}

	getStudioName() {
		return this.props.studioInfo.name
	}

	updateRank(record, weight) {
		let newInfo = {...record};
		newInfo.typeId = this.props.typeId;
		newInfo.institutionId = this.props.studioInfo.id;
		newInfo.weight = weight;
		const param = {
			studioId: this.props.studioInfo.id,
			teacher: newInfo
		};

		let that = this;
		addOrUpdateStudioTeacher(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success('画室教师排序成功');
				that.refreshTeacherList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error("画室教师排序失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("画室教师排序失败: " + JSON.stringify(error));
		});

	}


}

export default TeacherListView;
