import React, {Component} from 'react';
import {Icon, Card, Button} from 'antd';
import {isEmpty} from '../../utils/utils';
import Style from './Product.less';


const { Meta } = Card;
const WIDTH = 150;
const HEIGHT = 300;

class ProductTag extends Component {

	render() {
		const {tag} = this.props;
		return (
			<div
				style={{marginRight: 10}}
			>
				{isEmpty(tag) &&
					<Card
						onClick={()=> this.props.onClick()}
						hoverable
						style={{ width: WIDTH, height: HEIGHT }}
						className={Style.flexCenter}
					>
						<div
							className={Style.addTagBtn}
						>
							<Icon type="plus"/>
							<div className={Style.addTagBtnTitle}>添加</div>
						</div>
					</Card>
				}
				{!isEmpty(tag) &&
					<Card
						onClick={()=> this.props.onClick()}
						hoverable
						style={{ width: WIDTH, height: HEIGHT }}
						cover={<img alt="example" style={{ width: WIDTH, height: 100}} src={tag.imageUrl} />}
					>
						<Meta style={{fontSize: '11px'}} title={tag.title} description={tag.content} />
						{/*<Meta title={tag.title} description={tag.content} />*/}
					</Card>
				}
			</div>

		);
	}
}

export default ProductTag;
