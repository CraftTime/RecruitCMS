import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal, Button} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DrawListView from './DrawListView';
import * as Data from '../../../data/data';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import Style from '../../../css/common.less';

const {TabPane} = Tabs;

@connect(({studio}) => ({
	studio,
}))
class StudioDrawView extends Component {
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
			type: 'studio/getDrawTypeList',
			param: {
				institutionId: this.props.studioInfo.id
			}
		});
	}

	render() {
		const {studio: {drawTypeList}} = this.props;

		let tabPanes = [];

		for (let index in drawTypeList) {
			let type = drawTypeList[index];

			let tabPane = (
				<TabPane tab={type.name} key={type.id}>
					<DrawListView
						onShowTypeMrg={()=> this.onShowTypeMrg()}
						studioInfo={this.props.studioInfo}
						typeId={type.id}
					/>
				</TabPane>
			);

			tabPanes.push(tabPane);
		}


		return (
			<div>
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title="优秀范画类型管理"
					onCancel={() => this.onDialogDismiss(false)}
					visible={true}
					width={(Data.MODEL_WIDTH)}
					footer={[]}
				>
					<TypeListView
						institutionId={this.props.studioInfo.id}
						typeList={drawTypeList}
						addOrUpdateMethod="addOrUpdateDrawTypeList"
						getTypeListMethod="getDrawTypeList"
						deleteUrl='/institutionDrawType/delete'
						title="优秀范画管理类型"
					/>

				</Modal>
				}
				{drawTypeList.length === 0 &&
				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onShowTypeMrg();
					}}>优秀范画类型管理</Button>
				</div>
				}
				<Tabs onChange={(key) => this.callback(key)} type="card">
					{tabPanes}
				</Tabs>
			</div>
		);
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}


	onShowTypeMrg() {
		this.setState({
			isShowModel: true,
			modelTitle: '优秀范画类型管理',
		});
	}


	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		});
	}
}

export default StudioDrawView;
