import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import Style from '../../../css/common.less'
import {message} from 'antd';
import {Upload, Button, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import * as DateUtils from '../../../utils/DateUtils';


@connect(({article}) => ({
	article,
}))
class ArticleTypeList extends Component {

	componentDidMount() {
		this.refreshList();

	}

	refreshList() {
		const {dispatch} = this.props;
		dispatch({
			type: 'article/getArticleTypeList',
		});
	}

	render() {
		const {article: {typeList}} = this.props;

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{index + 1}</text>)
			},
			{
				title: ' ID',
				align: 'center',
				dataIndex: 'id',
			},
			{
				title: '文章类型',
				align: 'center',
				dataIndex: 'name',
			},
		];


		const pagination = {
			total: typeList.length,
			defaultPageSize: 1000,
			pageSize: 1000,
			current: 1
		};

		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: false,
			...pagination,
		};


		return (
			<PageHeaderLayout content="">

				<Card bordered={false}>
					<div className={Style.commonBtnLayout}>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.refreshList()
						}}>刷新</Button>
						{/*<Button type="primary" onClick={() => {*/}
							{/*this.onAddClick()*/}
							{/*// }}>添加</Button>*/}
						<Button type="primary" onClick={() => {
							this.initType()
						}}>初始化文章类型</Button>
					</div>
					<Table
						bordered
						dataSource={typeList}
						columns={columns}
						pagination={paginationProps}
					/>
				</Card>
			</PageHeaderLayout>
		);
	}


	onAddClick() {
		this.setState({
			isShowDialog: true,
			isEdit: false,
			currArticleId: -1
		});
	}

	initType() {
		this.addType(1, '艺考头条');
		this.addType(2, '艺考头条');
		this.addType(3, '艺考资讯');
		this.addType(4, '推荐');
		this.addType(5, '教程');
		this.addType(6, '院校');
		this.addType(7, '话题');
		this.addType(8, '报考指南-专业介绍');
		this.addType(9, '报考指南-师资力量');
		this.addType(10, '报考指南-招生动态');
		this.addType(11, '艺考教学-图文');
		this.addType(12, '培新机构-图集');
		this.addType(13, '培新机构-课程');
		this.addType(14, '培新机构-名师');
		this.addType(15, 'Banner广告');
	}

	addType(id, name) {
		const {dispatch} = this.props;
		dispatch({
			type: 'article/addOrUpdateType',
			payload: {
				id: id,
				name: name
			}
		});
	}

	onAddOrEditFinish() {
		this.setState({
			isShowDialog: false,
		});
		this.refreshList();
	}

}

export default ArticleTypeList;
