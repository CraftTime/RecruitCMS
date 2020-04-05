import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';

const { Meta } = Card;

class ProductCard extends Component {

	render() {
		return (
			<Card
				onClick={()=> this.props.onClick()}
				hoverable
				style={{ width: 240 }}
				cover={<img alt="example" style={{ width: 240, height: 170}} src={this.props.product.imageUrl} />}
			>
				<Meta title={this.props.productName} description={this.props.productDesc} />
			</Card>
		);
	}
}

export default ProductCard;
