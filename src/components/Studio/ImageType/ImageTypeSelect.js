import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Select, message} from 'antd';
import * as Data from '../../data/data';


@connect(({studio}) => ({
	studio,
}))
class ImageTypeSelect extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		const {studio: {imageTypeList}} = this.props;

		let options = [];
		for (let index in imageTypeList) {
			let type = imageTypeList[index];
			let option = (<Option value={type.id}>{type.name}</Option>);
			options.push(option);
		}

		return (
			<Select
				onChange={(value) =>
					this.props.onChange(value)
				}
				style={{width: Data.FORM_ITEM_WIDTH}}
				value={this.props.currValue}>
				{options}
			</Select>
		);
	}


}

export default ImageTypeSelect;
