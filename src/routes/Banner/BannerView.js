import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Button, Modal, message} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import BannerListView from './BannerListView';
import Style from '../../css/common.less';
import EditView from './EditView';
import * as Data from '../../data/data';
import ArticleBoard from '../Article/ArticleBoard';


@connect(({banner}) => ({
	banner,
}))
class BannerView extends Component {
	constructor(props) {
		super();
		this.state = {
			isEdit: false,
			isShowEditDialog: false,
			dialogBanner: {...Data.BANNER_EMPTY}
		}
	}


	componentDidMount() {
		this.refreshList(1, 10);

	}

	refreshList(pageIndex, pageSize) {
		const param = {
			"pageIndex": pageIndex,
			"pageSize": pageSize
		};

		const {dispatch} = this.props;
		dispatch({
			type: 'banner/getList',
			payload: {
				param: param
			}
		});
	}


	render() {
		const actionTitle = this.state.isEdit ? "编辑广告" : "新增广告";
		const { dialogBanner } = this.state;

		return (
			<PageHeaderLayout title="广告管理" content="">
				<Card bordered={false}>

					{this.state.isShowEditDialog &&
					<Modal
						destroyOnClose="true"
						title={actionTitle}
						onCancel={() => this.onDialogDismiss()}
						visible={true}
						footer={[]}
					>
						<EditView
							onDialogDismiss={()=> this.onDialogDismiss()}
							srcBanner={dialogBanner}
						/>
					</Modal>
					}
					<BannerListView
						onDelClick={(id)=> this.onDelClick(id)}
						onEditClick={(banner) => this.onEditClick(banner)}
						onPageChange={(page, pageSize)=> this.onPageChange(page, pageSize)}
					/>
				</Card>
			</PageHeaderLayout>
		);
	}

	onPageChange(page, pageSize) {
		this.refreshList(page.current, page.pageSize);
	}

	onAddClick() {
		this.setState({
			isShowEditDialog: true,
			isEdit: false,
			dialogBanner: {...Data.BANNER_EMPTY}
		});
	}

	onDelClick(id) {
		const param = {
			id: id
		};

		const {dispatch} = this.props;
		dispatch({
			type: 'banner/delBanner',
			payload: {
				param: param
			}
		});
		message.success('广告删除成功');
	}

	onEditClick(banner) {
		this.setState({
			isShowEditDialog: true,
			isEdit: true,
			dialogBanner: {...banner}
		});
	}

	onDialogDismiss() {
		let that = this;
		this.setState({
			isShowEditDialog: false,
		}, function () {
			that.refreshListView();
		});
	}

	refreshListView() {
		this.refreshList(this.props.banner.list.current, Data.PAGINATION_INFO.pageSize);
	}
}

export default BannerView;