import React from 'react'
import { Form, Input, Button } from 'antd'
import { callGetAuth } from '../../features/authen'

export const LoginPanel = () => {
    const onFinish = (values) => {
        const isLoginSucceeded = callGetAuth(values)
        console.log('gj', values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 21,
    },
}

const tailLayout = {
    wrapperCol: {
        offset: 3,
        span: 21,
    },
}
