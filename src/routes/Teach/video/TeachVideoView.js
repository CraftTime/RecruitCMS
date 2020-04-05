import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal, Button} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import VideoListView from './VideoListView';
import * as Data from '../../../data/data';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import Style from '../../../css/common.less';

const {TabPane} = Tabs;

@connect(({teach}) => ({
	teach,
}))
class TeachVideoView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowDialog: false
		};
	}

	componentDidMount() {
		this.getTypeList();
	}

	getTypeList() {
		const {dispatch} = this.props;
		dispatch({
			type: 'teach/getVideoTypeList',
		});
	}

	render() {
		const {teach: {videoTypeList}} = this.props;


		let tabPanes = [];

		for (let index in videoTypeList) {
			let type = videoTypeList[index];

			let tabPane = (
				<TabPane tab={type.name} key={type.id}>
					<VideoListView
						onShowTypeMrg={()=> this.onShowTypeMrg()}
						typeId={type.id}
					/>
				</TabPane>
			);

			tabPanes.push(tabPane);
		}


		return (
			<PageHeaderLayout title="画室管理" content="">
				<Card bordered={false}>
					{this.state.isShowModel &&
					<Modal
						destroyOnClose="true"
						title="艺考教学视频类型"
						onCancel={() => this.onDialogDismiss(false)}
						visible={true}
						width={(Data.MODEL_WIDTH)}
						footer={[]}
					>
						<TypeListView
							typeList={videoTypeList}
							modelName="teach"
							addOrUpdateMethod="addOrUpdateVideoType"
							getTypeListMethod="getVideoTypeList"
							deleteUrl='/teachVideoType/delete'
							title="艺考教学视频类型"
						/>

					</Modal>
					}
					{videoTypeList.length === 0 &&
					<div className={Style.commonBtnLayout}>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.onShowTypeMrg();
						}}>视频教学类型</Button>
					</div>
					}
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


	onShowTypeMrg() {
		this.setState({
			isShowModel: true,
			modelTitle: '艺考教学视频类型',
		});
	}


	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		});
	}

}

export default TeachVideoView;
