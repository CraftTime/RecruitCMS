import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import classnames from 'classnames';

import {
	Row,
	Col,
	Checkbox,
	Form,
	Input,
	DatePicker,
	message,
	Upload,
	Select,
	Button,
	Card,
	InputNumber,
	Radio,
	Modal,
	Tooltip,
} from 'antd';
import Style from './RateEditView.less';


@Form.create()
class RateEditView extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {data} = this.props;

		let cols = [];
		let titleCol = (
			<div className={Style.titleColLayout}>
				<text className={Style.rowLayout}>年份:</text>
				<text className={Style.rowLayout}>标准基数:</text>
				<text className={Style.rowLayout}>加分基数:</text>
				<text className={Style.rowLayout}>减分基数:</text>
				<text className={Style.rowLayout}>正分区间:</text>
				<text className={Style.rowLayout}>负分区间:</text>
				<text className={Style.rowLayout}>区间内加分基数:</text>
			</div>

		);

		cols.push(titleCol);
		for (let index in data) {
			let record = data[index];
			let col = (
				<div className={Style.colLayout}>
					<text className={Style.rowLayout}>{record.year}</text>
					<Input className={Style.rowLayout} value={record.baseLine}/>
					<Input className={Style.rowLayout} value={record.plusLine}/>
 					<Input className={Style.rowLayout} value={record.minLine}/>
					<div className={Style.flexRowVCenter}>
						<Input value={record.positiveRangeStart}/>
						<text>~</text>
						<Input value={record.positiveRangeEnd}/>
					</div>
					<div className={Style.flexRow}>
						<Input value={record.negativeRangeStart}/>
						<text className={Style.flexRowVCenter}>~</text>
						<Input value={record.negativeRangeEnd}/>
					</div>
					<Input className={Style.rowLayout} value={record.plusLineOfRank}/>
				</div>

			);
			cols.push(col);
		}

		return (
			<div className={Style.rootLayout}>
				{cols}
			</div>
		);
	}

}

export default RateEditView;
