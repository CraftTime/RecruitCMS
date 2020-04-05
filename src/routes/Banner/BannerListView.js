import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import * as Data from '../../data/data';
import Style from '../../css/common.less';

@connect(({banner}) => ({
	banner,
}))
class BannerListView extends Component {

	render() {
		const {selectedRowKeys, onEditClick, onDelClick, onPageChange} = this.props;
		const {list} = this.props;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (<text>{(list.current -1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '位置',
				align: 'center',
				dataIndex: 'locationId',
				render: (val, record) => (<text>{Data.BANNER_LOCATION_TITLE[record.locationId]}</text>),
			},
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
						<Button className={Style.commonBtn} onClick={() => onEditClick(record)} type="normal" shape="circle" icon="edit"/>

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


		const pagination = {
			total: list.total,
			defaultPageSize: list.size,
			pageSize:list.size,
			current: list.current
		};

		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: false,
			...pagination,
		};

		const rowSelection = {
			selectedRowKeys,
			onChange: this.handleRowSelectChange,
			getCheckboxProps: record => ({
				disabled: record.disabled,
			}),
		};

		return (
			<Table
				size="small"
				// rowSelection={rowSelection}
				dataSource={list.records}
				pagination={paginationProps}
				columns={columns}
				onChange={onPageChange.bind(this)}
			/>
		);
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

	onChange(type, value) {

	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updatePriceInfo();
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	updatePriceInfo() {
		message.info(" updatePriceInfo ")
	}

	getActionValueTip(banner) {
		let type = banner.actionType;
		let value = banner.actionValue;
		if(Data.BANNER_ACTION_TYPE_SCENE === type) {
			return Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(value);
		} else if(Data.BANNER_ACTION_TYPE_ARTICLE === type){
			return `文章id:${value}`
		} else {
			return '--'
		}
	}
}

export default BannerListView;
