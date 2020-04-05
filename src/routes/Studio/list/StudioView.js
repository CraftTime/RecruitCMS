import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import StudioListView from './StudioListView';


const {TabPane} = Tabs;

@connect(({studio}) => ({
	studio,
}))
class StudioView extends Component {

	componentDidMount() {
		this.getTypeList();
	}

	getTypeList() {
		const {dispatch} = this.props;
		dispatch({
			type: 'studio/getTypeList',
		});
	}

	render() {
		const {studio: {typeList}} = this.props;


		let tabPanes = [];

		for (let index in typeList) {
			let type = typeList[index];

			let tabPane = (
				<TabPane tab={type.name} key={type.id}>
					<StudioListView
						typeId={type.id}
					/>
				</TabPane>
			);

			tabPanes.push(tabPane);
		}


		return (
			<PageHeaderLayout title="画室管理" content="">
				<Card bordered={false}>

					<Tabs onChange={(key) => this.callback(key)} type="card">
						{tabPanes}
					</Tabs>

				</Card>
			</PageHeaderLayout>
		);
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}


}

export default StudioView;
