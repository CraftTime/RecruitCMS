import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal,Button} from 'antd';
import ImageListView from './ImageListView';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import * as Data from '../../../data/data';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import Style from '../../../css/common.less';


const {TabPane} = Tabs;

@connect(({teach}) => ({
	teach,
}))
class TeachImageView extends Component {
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
			type: 'teach/getImageTypeList',
		});
	}

	render() {
		const {teach: {imageTypeList}} = this.props;


		let tabPanes = [];

		for (let index in imageTypeList) {
			let type = imageTypeList[index];

			let tabPane = (
				<TabPane tab={type.name} key={type.id}>
					<ImageListView
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
						title="图文教学一级类型管理"
						onCancel={() => this.onDialogDismiss(false)}
						visible={true}
						width={(Data.MODEL_WIDTH)}
						footer={[]}
					>
						<TypeListView
							typeList={imageTypeList}
							modelName="teach"
							addOrUpdateMethod="addOrUpdateImageType"
							getTypeListMethod="getImageTypeList"
							deleteUrl='/teachDrawType/delete'
							title="艺考教学美术图库类型"
						/>

					</Modal>
					}
					{imageTypeList.length === 0 &&
					<div className={Style.commonBtnLayout}>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.onShowTypeMrg();
						}}>图文教学一级类型管理</Button>
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
			modelTitle: '艺考教学美术图库类型',
		});
	}


	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		});
	}


}

export default TeachImageView;
