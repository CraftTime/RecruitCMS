import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "./style.less";
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';


class FeedbackListView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			loading: false
		};
	}

	render() {
		let {data, loading} = this.state;

		const columns = [
			{
				title: '内容',
				align: 'center',
				dataIndex: 'content'
			},
			{
				title: '图片',
				align: 'center',
				dataIndex: 'image',
				render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record) => (<div>
						<Button onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>

						<Popconfirm title="是否要删除该关于？"
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

		return (
			<div>

				<div className={Style.btnLayout}>
					<Button className={Style.mainOperateBtn} type="primary" onClick={() => {
						this.refreshArticleList()
					}}>刷新</Button>
				</div>

				<PaginationTable
					dataSource={data}
					loading={loading}
					columns={columns}
					onPageChange={(page, pageSize)=> {
						this.onPageChange(page, pageSize)
					}}
				/>

			</div>);
	}

	onPageChange(page, pageSize) {

	}

}

export default FeedbackListView;