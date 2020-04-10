import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import * as Data from '../../data/data';
import Style from '../../css/common.less';
import * as RecruitApi from '../../services/RecruitApi';
import PaginationTable from "../../components/PaginationTable/PaginationTable";

class BannerListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false,
			currIndex: 1,
			isShowDialog: false,
			info: {}
		};
	}


	render() {
		const {selectedRowKeys, onEditClick, onDelClick, onPageChange} = this.props;
		let {data, loading, isShowDialog, info} = this.state;
		const {list} = this.props;
		const columns = [
			{
				title: '图片',
				align: 'center',
				dataIndex: 'url',
				render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
			},
			{
				title: '链接类型',
				align: 'center',
				dataIndex: 'actionType',
				render: (val, record) => (<text>{Data.BANNER_ACTION_TYPE_TITLE[record.actionType]}</text>),

			},
			{
				title: '链接值',
				align: 'center',
				dataIndex: 'actionValue',
				render: (val, record) => (<text>{this.getActionValueTip(record)}</text>),
			},
			{
				title: '状态',
				align: 'center',
				dataIndex: 'visible',
				render: (val, record) => (<text>{record.visible ? '启用' : '禁用'}</text>),
			},
			{
				title: '操作',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => onEditClick(record)} type="normal"
						        shape="circle" icon="edit"/>

						<Popconfirm title="是否要删除该广告？"
						            onConfirm={() => {
							            onDelClick(record.id)
						            }}
						            okText="确定" cancelText="取消">
							<Button type="normal" shape="circle" icon="delete"/>
						</Popconfirm>

					</div>
				),
			},
		];


		return (
			<div>

				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshList()
					}}>刷新</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onAddClick()
					}}>添加</Button>
				</div>

				<PaginationTable
					dataSource={data}
					loading={loading}
					columns={columns}
					onPageChange={(page, pageSize) => {
						this.onPageChange(page, pageSize)
					}}
				/>
			</div>
		);
	}

	onChange(type, value) {

	}

	onPageChange(page, pageSize) {
		this.setState({
			currIndex: page
		}, () => {
			this.refreshList();
		});
	}

	refreshList() {
		let info = {
			pageIndex: this.state.currIndex,
			pageSize: Data.PAGINATION_INFO.pageSize
		};

		RecruitApi.listBanner(info, (resp) => {
			this.setState({
				data: resp.data
			});
		}, (error) => {
			message.error('获取Banner失败: ' + JSON.stringify(error));
		});
	}

	getActionValueTip(banner) {
		let type = banner.actionType;
		let value = banner.actionValue;
		if (Data.BANNER_ACTION_TYPE_SCENE === type) {
			return Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(value);
		} else if (Data.BANNER_ACTION_TYPE_ARTICLE === type) {
			return `文章id:${value}`
		} else {
			return '--'
		}
	}
}

export default BannerListView;
