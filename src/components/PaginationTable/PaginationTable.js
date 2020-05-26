import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import * as Data from "../../data/data";


class PaginationTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: props.loading
		};

	}

	componentWillReceiveProps(nextProps, nextContext) {

		if(nextProps.loading !== this.state.loading) {
			this.setState({
				loading: nextProps.loading
			});
		}

	}

	render() {
		let {dataSource, onPageChange, columns, needNo} = this.props;
		let {loading} = this.state;
		let newColumns = [];

		if(needNo) {
			newColumns.push(
				{
					title: '序号',
					align: 'center',
					render: (val, record, index) => (
						<text>{(dataSource.current - 1) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
				}
			);
		}

		columns.forEach((item, index) => {
			newColumns.push(item);
		});

		const pagination = {
			total: dataSource.total,
			defaultPageSize: dataSource.size,
			pageSize: dataSource.size,
			current: dataSource.current
		};

		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: false,
			...pagination,
		};

		return (
			<Table
				size="small"
				bordered
				dataSource={dataSource.records}
				loading={loading}
				pagination={paginationProps}
				columns={newColumns}
				onChange={(page, pageSize)=> onPageChange(page, pageSize)}
			/>
		);
	}
}

PaginationTable.defaultProps = {
	needNo: true
};

export default PaginationTable;
