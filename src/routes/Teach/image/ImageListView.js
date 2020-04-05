import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import {getTeachImageList} from '../../../services/AppApi';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import ImageEditView from './ImageEditView';
import {deleteTeachImage} from '../../../services/AppApi';


const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;
const COMMENT = BASE_INFO + 2;
const READ_COUNT = BASE_INFO + 4;

@connect(({teach}) => ({
	teach,
}))
class ImageListView extends Component {

	constructor(props) {
		super();
		this.state = {
			operateMode: BASE_INFO,
			isShowModel: false,
			response: {},
			modelTitle: '',
			image: null

		}
	}

	componentDidMount() {
		this.refreshList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshList(pageIndex, pageSize) {
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			typeId: this.props.typeId
		};

		let that = this;

		getTeachImageList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("艺考教学图库列表获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error("艺考教学图库列表获取失败 typeId: " + JSON.stringify(error));
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
				title: '描述',
				align: 'center',
				dataIndex: 'desc'
			},
			{
				title: '图片',
				align: 'center',
				dataIndex: 'url',
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
					}}>美术图库类型</Button>
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
		this.setState({
			isShowModel: false,
		}, function () {
			if (showReload) {
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
			operateMode: BASE_INFO,
			modelTitle: '新增图库艺考教学',
			image: null
		});
	}

	onEdit(record) {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: '编辑图库艺考教学',
			image: record
		});
	}

	onDelClick(id) {
		let that = this;
		let param = {
			id: id
		};
		deleteTeachImage(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
					message.success("删除艺考教学图库成功");
				} else {
					message.error("删除艺考教学图库失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除艺考教学图库失败 error: " + JSON.stringify(e));
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
					<ImageEditView
						typeId={this.props.typeId}
						image={this.state.image}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>

				);
				break;
			case ARTICLE:
		}
	}

}

export default ImageListView;
