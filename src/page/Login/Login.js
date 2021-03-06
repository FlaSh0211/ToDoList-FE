import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as loginCreators from 'redux/modules/saga/login';
import { connect } from 'react-redux';
import { notification } from 'antd';

const Login = ({ history, loginState, loginActions })=> {
    useEffect(()=> {
        let message = loginState.get('message')
        if(message === 'login success') {
            notification.open({
                message: message,
                style: {
                    width: 600,
                },
                duration: 1
            });
            history.push('/')
        }
        else if(message) {
            notification.open({
                message: message,
                style: {
                    width: 600,
                },
                duration: 1
            });
        }
    },[loginState])

    const onFinish = (values) => {
        let data = {
            email: values.username,
            password: values.password
        };
        // axios 로 전송
        loginActions.loginRequest(data);
    };

    return (
        <div  style={{ height: "90vh" }}>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={ onFinish }
            style={{ minHeight: "600px", paddingTop: "50px", textAlign: "center"}}
        >
           
                <Form.Item 
                style={{textAlign: "center"}}
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
                >
                    <Input 
                     style={{maxWidth: "340px"}}
                    name="username" 
                    prefix={<UserOutlined 
                    className="site-form-item-icon" />} 
                    placeholder="Username" 
                    />
                </Form.Item>
           
                <Form.Item
                    style={{textAlign: "center"}}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                    style={{maxWidth: "340px"}}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    name="password"
                    />
                </Form.Item>
           
                <Form.Item style={{textAlign: "center"}}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    {/* 링크에 url을 삽입*/}
                    <Link to=''>
                        Forgot password
                    </Link>
                </Form.Item>
           
                <Form.Item style={{textAlign: "center"}}>
                    <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button" 
                    style={{marginRight: "10px"}} 
                    >
                        Log in
                    </Button>
                        Or <Link to='/register'>&nbsp;register now!</Link>
                </Form.Item>
           
        </Form>
        </div>
    );
};

export default connect(
    state => ({
        loginState: state.loginReducer
    }),
    dispatch => ({
        loginActions: bindActionCreators(loginCreators, dispatch)
    })
)(Login);
