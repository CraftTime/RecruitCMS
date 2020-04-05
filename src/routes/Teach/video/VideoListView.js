import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import {getTeachVideoList} from '../../../services/AppApi';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import VideoEditView from './VideoEditView';
import {deleteTeachVideo} from '../../../services/AppApi';
import {isSuccess} from '../../../utils/utils';


const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;
const COMMENT = BASE_INFO + 2;
const READ_COUNT = BASE_INFO + 4;

@connect(({teach}) => ({
	teach,
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
			pageIndex: pageIndex,
			pageSize: pageSize,
			typeId: this.props.typeId
		};

		let that = this;

		getTeachVideoList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("艺考教学视频列表获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error("艺考教学视频列表获取失败 typeId: " + JSON.stringify(error));
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
				dataIndex: 'name'
			},
			{
				title: '封面图片',
				align: 'center',
				dataIndex: 'titleImageUrl',
				render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'operator',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
						        shape="circle"
						        icon="edit"/>

						<Popconfirm title="是否要删除该艺考教学视频？"
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
					}}>视频教学类型</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshVideoList(this.state.response.current, Data.PAGINATION_INFO.pageSize);
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
		this.refreshVideoList(page.current, page.pageSize);
	}

	onDialogDismiss(showReload) {
		this.setState({
			isShowModel: false,
		}, function () {
			if (showReload) {
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
			modelTitle: '编辑艺考教学视频',
			video: video
		});
	}

	onAdd() {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: '新增艺考教学视频',
			video: null
		});
	}

	onDelClick(id) {
		let that = this;
		let param = {
			id: id
		};
		deleteTeachVideo(param)
			.then(function (response) {
				if (isSuccess(response)) {
					that.refreshVideoList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
					message.success("删除艺考教学视频成功");
				} else {
					message.error("删除艺考教学视频失败 error : " + JSON.stringify(response));
				}
			}).catch(function (e) {
			message.error("删除艺考教学视频失败 error: " + JSON.stringify(e));
		});
	}


	onCommentClick() {
		this.setState({
			isShowModel: true,
			operateMode: COMMENT,
			modelTitle: '未知'
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
						typeId={this.props.typeId}
						video={this.state.video}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>

				);
				break;
		}
	}

	getStudioName() {
		return this.props.studioInfo.name
	}
}

export default VideoListView;
