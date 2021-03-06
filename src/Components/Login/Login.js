/*eslint-disable*/

import React from 'react';
import './Login.css'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { Link } from 'react-router-dom'
import validator from 'validator'
import { connect } from 'react-redux';
import * as AuthMiddleware from '../../Store/middlewares/authMiddleware';
import SessionStorageManager from '../../Config/SessionStorageManager';

const title = "Error"
const desc = 'Please Enter Email and Password!'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      disable: false,
      loggedIn: false,
      loading: false,
      errorMessage: "",
      successMessage: ""

    }
  }

  static getDerivedStateFromProps = (props, state) => {

    if (!props.currentUser && props.isError) {
      return {
        loading: false,
        errorMessage: props.errorMessage,
      }
    }

    return {
      successMessage: props.successMessage,
      loading: false,
      loggedIn: true,
    }

  }

  componentDidMount() {
    const user = SessionStorageManager.getUser();

    if(user){
      this.props.history.push('/dashboard')
    }
  }
  

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.isError !== this.props.isError) {
      if (this.props.isError && !this.props.isLoggedIn) {
        this.setState({ disable: false })
        return this.openNotification("Problem", this.props.errorMessage, 'close-circle', 'red')
      }
    }

    if (!this.props.isError && this.props.currentUser) {
      this.props.history.push('/dashboard')
    }

  }



  openNotification = (title, desc, icon, color = '#108ee9') => {
    notification.open({
      message: title,
      description: desc,
      icon: <Icon type={icon} style={{ color: color }} />,
    });
  };


  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {

      if (!validator.isEmail(values.email)) {
        return this.openNotification("Email", "Invalid Email", 'close-circle', 'red')
      }

      this.setState({ loading: true, disable: true })
      this.props.authenticate({ email: values.email, password: values.password })

    });

  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card">
          <div className="container">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <h1 style={{ textAlign: 'center' }}>Login</h1>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your Email!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                    type="email"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {/* {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)} */}
                {/* <a className="login-form-forgot" href="">
                  Forgot password
                </a> */}
                <Button htmlType="submit" className="login-form-button" disabled={this.state.disable}>
                  Log in
                </Button>
                {/* Or <Link to="/register">Register Now!</Link> */}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}


const LoginComp = Form.create({ name: 'normal_login' })(Login);


const mapStateToProps = (state) => {
  return {

    isError: state.auth.isError,
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: data => {
      dispatch(AuthMiddleware.loginMiddleware(data))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginComp)
