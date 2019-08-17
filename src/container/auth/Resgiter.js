import React from 'react';
import { Form, Input, Icon, Typography, Button, Radio } from 'antd';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
const { Paragraph } = Typography;
@connect(
  state => state.user,
  { login }
)
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  phoneValidator = (rule, value, callback) => {
    if(/^\d+$/.test(value) && value.length === 10) {
      console.log(value);
      callback();
    } else {
      callback('Invalid US Phone Number');
    }
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    console.log(this.state.confirmDirty)
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 10 },
      },
    };

    return (
      <div>
        <Paragraph className='title-middle'>
          <h3>
            Log in to AirPick
          </h3>
        </Paragraph>
        <Paragraph>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='Username'>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username or email!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username or Email"
                />,
              )}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label="Gender">
              {getFieldDecorator('gender', {
                rules: [
                  {
                    required: true,
                    message: 'Please choose your gender!',
                  }
                ],
              })(<Radio.Group>
                <Radio value='male'>Male</Radio>
                <Radio value='female'>Female</Radio>
              </Radio.Group>)}
            </Form.Item>
            <Form.Item label='Wechat ID'>
              {getFieldDecorator('wechat', {
                rules: [{ required: true, message: 'Please input your wechat ID!' }],
              })(
                <Input
                  placeholder="wechat"
                />,
              )}
            </Form.Item>
            <Form.Item label='US Phone Number'>
              {getFieldDecorator('phone', {
                rules: [{ validator: this.phoneValidator }],
              })(
                <Input
                  type='String'
                  placeholder="US Phone Number"
                />,
              )}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 18, offset: 0 },
                sm: { span: 10, offset: 10 },
              }}
            >
              <Button type="primary" htmlType='submit'>
                Register
              </Button>
              &nbsp; Already have an account? <a href="/register">Log in</a>
            </Form.Item>
          </Form>
        </Paragraph>
      </div>
    )
  }
}
const Register = Form.create({ name: 'normal_register' })(RegisterForm);
export default Register;