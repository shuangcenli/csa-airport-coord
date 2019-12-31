/**
 *  List my request's status including volunteer info
*/

import React from 'react';
import { Button, Icon } from 'antd';
import { updatePickreq, loadPickreq } from '../../redux/request.redux';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import PickForm from './PickModal';

@connect(
  state => state,
  { updatePickreq, loadPickreq }
)
class RequestCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleSubmit = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'publish': fieldsValue['publish'] ? fieldsValue['publish'] : false,
        'notes': fieldsValue['notes'] ? fieldsValue['notes'] : '',
        'date': fieldsValue['date'].format('YYYY-MM-DD'),
        'time': fieldsValue['time'].format('HH:mm'),
        'username': this.formRef.user.username,
        'volunteer': this.formRef.user.volunteer
      };
      this.formRef.onSubmit(values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveForm = formRef => {
    this.formRef = formRef;
  }

  render() {
     // TODO: change this.props.request to an array. One user can have multiple requests
    let previousReq = null;
    if(!this.props.request.request) {
      if(this.props.user.username) this.props.loadPickreq(this.props.user.username);
    } else {
      if(this.props.request.request.request) {
        previousReq = this.props.request.request.request;
      }
    }

    return (
      <div style={{textAlign: "center"}}>
        {previousReq ? console.log('has req') : console.log('no req')}
        <Button type="primary" onClick={this.showModal}>
          <Icon type="plus" />Add Request
        </Button>
        <PickForm
          wrappedComponentRef={this.saveForm}
          visible={this.state.visible}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}>
        </PickForm>
      </div>
    )
  }
}

export default RequestCenter;