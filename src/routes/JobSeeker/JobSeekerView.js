import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Divider, Tag} from 'antd';
import {Button} from 'antd';
import {PageHeader} from 'antd';
import {Radio} from 'antd';

@connect(({JobSeeker}) => ({
  JobSeeker,
}))
class JobSeekerView extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (<div> dasdasd </div>);
  }
}

export default JobSeekerView;
