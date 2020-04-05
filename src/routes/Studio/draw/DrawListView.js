import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import InfoEditView from '../info/InfoEditView';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import DrawEditView from './DrawEditView';
import CommentView from '../list/comment/CommentView';
import {
	addOrUpdateStudioDraw,
	addOrUpdateStudioImage,
	deleteStudioDraw,
	getStudioDrawList
} from '../../../services/AppApi';
import {isEmpty} from "../../../utils/utils";


const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;
const COMMENT = BASE_INFO + 2;

@connect(({studio}) => ({
	studio,
}))
class DrawListView extends Component {

	constructor(props) {
		super();
		this.state = {
			operateMode: BASE_INFO,
			isShowModel: false,
			response: {},
			modelTitle: '',
			draw: null

		}
	}

	componentDidMount() {
		this.refreshDrawList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshDrawList(pageIndex, pageSize) {
		const param = {
			studioId: this.props.studioInfo.id,
			pagination: {
				pageIndex: pageIndex,
				pageSize: pageSize,
				typeId: this.props.typeId
			}
		};

		let that = this;

		getStudioDrawList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error(" 优秀范画列表获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error(" 优秀范画列表获取失败 typeId: " + JSON.stringify(error));
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
				title: '范画名称',
				align: 'center',
				dataIndex: 'name'
			},
			{
				title: '图片',
				align: 'center',
				dataIndex: 'url',
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

						<Popconfirm title="是否要删除该范画？"
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
					}}>优秀范画类型管理</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshDrawList(1, Data.PAGINATION_INFO.pageSize);
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
		this.refreshDrawList(page.current, page.pageSize);
	}

	onDialogDismiss(showReload) {
		this.setState({
			isShowModel: false,
		}, function () {
			if (showReload) {
				this.refreshDrawList(1, Data.PAGINATION_INFO.pageSize);
			}
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));

	}

	onEdit(draw) {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '编辑优秀范画',
			draw: draw
		});
	}

	onComment(draw) {
		this.setState({
			isShowModel: true,
			operateMode: COMMENT,
			modelTitle: this.getStudioName() + " / " + '优秀范画评论管理',
			draw: draw
		});
	}

	onAdd() {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '新增优秀范画',
			draw: null
		});
	}

	onDelClick(id) {
		let that = this;
		const param = {
			id: id
		};
		deleteStudioDraw(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshDrawList(1, Data.PAGINATION_INFO.pageSize);
					message.success("删除范画成功");
				} else {
					message.error("删除范画失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删范画失败 error: " + JSON.stringify(e));
		});
	}

	getOpView() {
		switch (this.state.operateMode) {
			case BASE_INFO:
				return (
					<DrawEditView
						studioInfo={this.props.studioInfo}
						typeId={this.props.typeId}
						draw={this.state.draw}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>

				);
				break;
			case COMMENT:
				return (
					<CommentView
						modal="institutionDraw"
						getId={(item)=> item.id}
						id={this.state.draw.id}/>
				);
				break;
		}
	}

	getStudioName() {
		return this.props.studioInfo.name
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
		addOrUpdateStudioDraw(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success('画室课程排序成功');
				that.refreshDrawList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error("画室课程排序失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("画室课程排序失败: " + JSON.stringify(error));
		});
	}

}

export default DrawListView;
