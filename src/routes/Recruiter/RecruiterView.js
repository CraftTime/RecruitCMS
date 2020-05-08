import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Button, Modal, message,Breadcrumb,Icon,Table, Divider, Tag} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import BannerListView from '../Banner/BannerListView';
import Style from '../../css/common.less';
import EditView from '../Banner/EditView';
import * as Data from '../../data/data';

@connect(({banner}) => ({
  banner,
}))
class RecruiterView extends Component {
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
      "pageSize": pageSize,
    };
  }


  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        align: 'center',
        render: tags => (
          <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],

      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
    return (<div>
      <PageHeaderLayout title=" 招聘者" content="">
<Table columns={columns} dataSource={data}  bordered/>
      </PageHeaderLayout>

      </div>
    );
  }

}

export default RecruiterView;
