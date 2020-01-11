import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
const { Paragraph } = Typography;
@connect(
  state => state.user,
  { login }
)
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  // console.log(input, pwd);

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 10 },
      },
    };

    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Paragraph className='title-middle'>
          <h3>
            Log in to AirPick
          </h3>
        </Paragraph>
        <Paragraph>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='Username or Email'>
              {getFieldDecorator('input', {
                rules: [{ required: true, message: 'Please input your username or email!' }],
              })(
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username or Email"
                />,
              )}
            </Form.Item>
            <Form.Item label='Password'>
              {getFieldDecorator('pwd', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            {/* <Form.Item
              wrapperCol={{
                xs: { span: 18, offset: 0 },
                sm: { span: 10, offset: 8 },
              }}>
              {this.props.msg? <Alert type='error' message='Error' description={this.props.msg}></Alert>: null}
            </Form.Item> */}
            <Form.Item
              wrapperCol={{
                xs: { span: 18, offset: 0 },
                sm: { span: 10, offset: 8 },
              }}
            >
              <Button type="primary" htmlType='submit'>
                Log in
              </Button>
              &nbsp; Or <a href="/register">register now!</a>
            </Form.Item>
          </Form>
        </Paragraph>
      </div>
    );
  }
}
const Login = Form.create({ name: 'normal_login' })(LoginForm);
export default Login;

