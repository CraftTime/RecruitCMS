import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import {addOrUpdateStudioLecture, addOrUpdateStudioVideo, getStudioVideoList} from '../../../services/AppApi';
import InfoEditView from '../info/InfoEditView';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import VideoEditView from './VideoEditView';
import CommentView from '../list/comment/CommentView';
import {deleteStudioVideo} from '../../../services/AppApi';
import {isEmpty} from "../../../utils/utils";


const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;
const COMMENT = BASE_INFO + 2;
const READ_COUNT = BASE_INFO + 4;

@connect(({studio}) => ({
	studio,
}))
class VideoListView extends Component {

	constructor(props) {
		super();
		this.state = {
			operateMode: BASE_INFO,
			isShowModel: false,
			response: {},
			modelTitle: '',
			video: null

		}
	}

	componentDidMount() {
		this.refreshVideoList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshVideoList(pageIndex, pageSize) {
		const param = {
			studioId: this.props.studioInfo.id,
			pagination: {
				pageIndex: pageIndex,
				pageSize: pageSize,
				typeId: this.props.typeId
			}
		};

		let that = this;

		getStudioVideoList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error(" 画室视频列表获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error(" 画室视频列表获取失败 typeId: " + JSON.stringify(error));
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
				title: '标题',
				align: 'center',
				dataIndex: 'name'
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
				title: '评论管理',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onComment(record)} type="normal"
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

						<Popconfirm title="是否要删除该画室视频？"
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
					}}>画室视频类型管理</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshVideoList(1, Data.PAGINATION_INFO.pageSize);
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
		this.refreshVideoList(page.current, page.pageSize);
	}

	onDialogDismiss(showReload) {
		this.setState({
			isShowModel: false,
		}, function () {
			if(showReload) {
				this.refreshVideoList(this.state.response.current, Data.PAGINATION_INFO.pageSize);
			}
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));

	}

	onEdit(video) {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '编辑画室视频',
			video: video
		});
	}

	onComment(video) {
		this.setState({
			isShowModel: true,
			operateMode: COMMENT,
			modelTitle: this.getStudioName() + " / " + '画室视频评论管理',
			video: video
		});
	}

	onAdd() {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '新增画室视频',
			video: null
		});
	}

	updateRank(record, weight) {
		let newInfo = {...record};
		newInfo.typeId = this.props.typeId;
		newInfo.weight = weight;

		const param = {
			studioId: this.props.studioInfo.id,
			info: newInfo
		};
		let that = this;
		addOrUpdateStudioVideo(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success('画室视频排序成功');
				that.refreshVideoList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error("画室视频排序失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("画室视频排序失败: " + JSON.stringify(error));
		});

	}


	onDelClick(id) {
		let that = this;
		const param = {
			id: id
		};
		deleteStudioVideo(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshVideoList(1, Data.PAGINATION_INFO.pageSize);
					message.success("删除画室视频成功");
				} else {
					message.error("删除画室视频失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除画室视频失败 error: " + JSON.stringify(e));
		});
	}


	onCommentClick() {
		this.setState({
			isShowModel: true,
			operateMode: COMMENT,
			modelTitle: this.getStudioName() + " / " + '画室图集文章评论管理'
		});
	}


	onShowOperatorView(mode, record) {
		this.setState({
			isShowModel: true,
			operateMode: mode,
			studioInfo: record
		});
	}

	getOpView() {
		switch (this.state.operateMode) {
			case BASE_INFO:
				return (
					<VideoEditView
						studioInfo={this.props.studioInfo}
						typeId={this.props.typeId}
						video={this.state.video}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>

				);
				break;
			case COMMENT:
				return (
					<CommentView
						modal="institutionVideo"
						getId={(item)=> item.id}
						id={this.state.video.id}/>
				);
				break;
		}
	}

	getStudioName() {
		return this.props.studioInfo.name
	}
}

export default VideoListView;
