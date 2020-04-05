import React, {Component} from 'react';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from './Style.less';
import {addOrUpdateStudio, getStudioList} from '../../../services/AppApi';
import InfoEditView from '../info/InfoEditView';
import StudioImageView from '../image/StudioImageView';
import StudioVideoView from '../video/StudioVideoView';
import StudioLectureView from '../lecture/StudioLectureView';
import StudioTeacherView from '../teacher/StudioTeacherView';
import BannerListView from '../banner/BannerListView';
import CommentView from './comment/CommentView';
import DrawListView from '../draw/DrawListView';
import StudioDrawView from "../draw/StudioDrawView";
import StudioMapView from "../map/StudioMapView";
import SignUpListView from "../signup/SignUpListView";
import {delInstitute} from '../../../services/AppApi';
import {listComment} from '../../../services/TrainApi';
import {isEmpty, isSuccess} from '../../../utils/utils';


const OP_MODE_BASE_DETAIL = 0;
const OP_MODE_BANNER = OP_MODE_BASE_DETAIL + 1;
const OP_MODE_IMAGE = OP_MODE_BASE_DETAIL + 2;
const OP_MODE_LECTURE = OP_MODE_BASE_DETAIL + 3;
const OP_MODE_VIDEO = OP_MODE_BASE_DETAIL + 4;
const OP_MODE_TEACHER = OP_MODE_BASE_DETAIL + 5;
const OP_MODE_DRAW = OP_MODE_BASE_DETAIL + 6;
const OP_MODE_MAP = OP_MODE_BASE_DETAIL + 7;
const OP_MODE_COMMENT = OP_MODE_BASE_DETAIL + 8;
const OP_MODE_SIGN_UP = OP_MODE_BASE_DETAIL + 9;


const OP_TITLE_MAP = new Map([
	[OP_MODE_BASE_DETAIL, '画室详情'],
	[OP_MODE_IMAGE, '画室图集'],
	[OP_MODE_VIDEO, '画室视频'],
	[OP_MODE_LECTURE, '画室课程'],
	[OP_MODE_TEACHER, '师资力量'],
	[OP_MODE_BANNER, '画室Banner'],
	[OP_MODE_DRAW, '优秀范画'],
	[OP_MODE_MAP, '画室位置'],
	[OP_MODE_COMMENT, '画室评论'],
	[OP_MODE_SIGN_UP, '报名记录'],
]);

class StudioListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowModel: false,
			isShowComment: false,
			response: [],
			operateMode: OP_MODE_BASE_DETAIL,
			studioInfo: null,
			isAddStudio: false,
			loading: true,
		}
	}

	componentDidMount() {
		this.refreshStudioList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshComment(id, index) {

		let param = {
			pageIndex: index,
			pageSize: 10,
			status: 1
		};

		listComment(id, param, (r)=> {
			message.info(' r: ' + JSON.stringify(r))
		});
	}


	refreshStudioList(pageIndex, pageSize) {
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			showHiddenItem: true,
			typeId: this.props.typeId
		};

		let that = this;

		getStudioList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response,
					loading: false
				});

			} else {
				message.error(" 画室列表获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error(that.props.title + "操作失败: " + JSON.stringify(error));
		});
	}

	render() {
		const {selectedRowKeys} = this.props;
		const {response} = this.state;
		// message.info(' bingo: ' + JSON.stringify(response));
		let data = Data.USER_LIST;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (<text>{index + 1}</text>)
			},
			{
				title: '画室名称',
				align: 'center',
				dataIndex: 'name'
			},
			{
				title: '地区',
				align: 'center',
				dataIndex: 'city',
			},
			{
				title: '排序',
				align: 'center',
				dataIndex: 'rank',
				render: (val, record, index) =>
					<InputNumber
						style={{width: '4rem'}}
						size="small"
						min={0}
						onChange={(value) => this.updateRank(record, value)}
		             value={record.rank}
		             placeholder=""/>

			},
			//
			// {
			// 	title: '推荐排序',
			// 	align: 'center',
			// 	dataIndex: 'recRank'
			// },
			{
				title: '画室详情',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_BASE_DETAIL, record)} type="normal"
						        shape="circle" icon="edit"/>
					</div>
				),
			},
			{
				title: 'Banner板位',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_BANNER, record)} type="normal"
						        shape="circle" icon="picture"/>
					</div>
				),
			},
			{
				title: '画室图集',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_IMAGE, record)} type="normal"
						        shape="circle" icon="picture"/>
					</div>
				),
			},
			{
				title: '画室课程',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_LECTURE, record)} type="normal"
						        shape="circle" icon="book"/>
					</div>
				),
			},
			{
				title: '画室视频',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_VIDEO, record)} type="normal"
						        shape="circle" icon="edit"/>
					</div>
				),
			},
			{
				title: '师资力量',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_TEACHER, record)} type="normal"
						        shape="circle" icon="user"/>
					</div>
				),
			},
			{
				title: '优秀范画',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_DRAW, record)} type="normal"
						        shape="circle" icon="picture"/>
					</div>
				),
			},
			{
				title: '画室位置',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_MAP, record)} type="normal"
						        shape="circle" icon="edit"/>
					</div>
				),
			},
			{
				title: '报名记录',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_SIGN_UP, record)} type="normal"
						        shape="circle" icon="edit"/>
					</div>
				),
			},
			{
				title: '评论管理',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(OP_MODE_COMMENT, record)} type="normal"
						        shape="circle" icon="message"/>
					</div>
				),
			},
			{
				title: '操作',
				dataIndex: 'delete',
				align: 'center',
				render: (val, record) => (

					<Popconfirm title="是否要删除该画室视频？"
					            onConfirm={() => {
						            this.onDel(record)
					            }}
					            okText="确定" cancelText="取消">
						<Button type="normal" shape="circle" icon="delete"/>
					</Popconfirm>
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
					title={(this.state.studioInfo !== null ? this.state.studioInfo.name : "") + " / " + OP_TITLE_MAP.get(this.state.operateMode)}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					{this.getOperatorView(this.state.operateMode)}

				</Modal>
				}

				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshStudioList(1, Data.PAGINATION_INFO.pageSize);
					}}>刷新</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onAddClick()
					}}>添加</Button>
				</div>

				<Table
					size="small"
					bordered
					loading={this.state.loading}
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
		this.refreshStudioList(page.current, page.pageSize);
	}

	onDialogDismiss() {
		let that = this;
		this.setState({
			isShowModel: false,
		}, function () {
			this.refreshStudioList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));

	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updatePriceInfo();
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	updatePriceInfo() {
	}

	onEdit() {
		this.setState({
			isShowModel: true
		});
	}

	onShowOperatorView(mode, record) {
		this.setState({
			isShowModel: true,
			operateMode: mode,
			studioInfo: record
		});
	}

	getOperatorView(mode) {
		let view = null;
		switch (mode) {
			case OP_MODE_BASE_DETAIL:
				view = (
					<InfoEditView
						typeId={this.props.typeId}
						onDialogDismiss={() => this.onDialogDismiss()}
						studioInfo={this.state.studioInfo}
					/>);
				break;
			case OP_MODE_IMAGE:
				view = ( <StudioImageView studioInfo={this.state.studioInfo}/> );
				break;

			case OP_MODE_VIDEO:
				view = ( <StudioVideoView studioInfo={this.state.studioInfo}/> );
				break;

			case OP_MODE_LECTURE:
				view = ( <StudioLectureView studioInfo={this.state.studioInfo}/> );
				break;

			case OP_MODE_TEACHER:
				view = ( <StudioTeacherView studioInfo={this.state.studioInfo}/> );
				break;

			case OP_MODE_BANNER:
				view = ( <BannerListView studioInfo={this.state.studioInfo}/> );
				break;

			case OP_MODE_DRAW:
				view = ( <StudioDrawView studioInfo={this.state.studioInfo}/> );
				break;

			case OP_MODE_MAP:
				view = ( <StudioMapView studioInfo={this.state.studioInfo}/> );
				break;

			case OP_MODE_SIGN_UP:
				view = ( <SignUpListView studioInfo={this.state.studioInfo}/> );
				break;
			case OP_MODE_COMMENT:
				view = ( <CommentView
							modal="institution"
							isShowScoreModal={true}
							getId={(item)=> item.id}
							id={this.state.studioInfo.id}/> );
				break;
		}
		return view;
	}

	onAddClick() {
		this.setState({
			isShowModel: true,
			operateMode: OP_MODE_BASE_DETAIL,
			studioInfo: null,
			isAddStudio: true
		});
	}
	onDel(record) {
		let param = {
			id: record.id
		};
		let that = this;
		delInstitute(param).then(function (response) {
			if(isSuccess(response)) {
				message.success('删除画室成功');
				that.refreshStudioList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error('删除画室失败 error: ' + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error('删除画室失败 error: ' + JSON.stringify(error));
		});
	}

	updateRank(record, newRank) {
		record.rank = newRank;
		let that = this;
		addOrUpdateStudio(record).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success('画室排序成功');
				that.refreshStudioList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error("画室排序成功操作失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("画室排序成功操作失败: " + JSON.stringify(error));
		});
	}

}

export default StudioListView;
