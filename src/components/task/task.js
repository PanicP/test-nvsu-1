import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Button, Card, Form, Modal, Input } from 'antd'
import { AuthContext } from '../../features/authen'
import styled from 'styled-components'
import { callGetTasks, callSetTasks } from '../../features/task/taskAPI'

export const TaskPanel = () => {
    const [tasks, setTasks] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentTask, setCurrentTask] = useState({})

    const authToken = useContext(AuthContext)
    const [form] = Form.useForm()

    const config = {
        headers: {
            Authorization: `Bearer ${
                localStorage.getItem('authToken') || authToken
            }`,
        },
    }

    useEffect(() => {
        // console.log(authToken, 'authtoken')
        handleUpdateLocalTasks( config )
        // console.log(res)
    }, [])

    const handleUpdateLocalTasks = async (config) => {
        const tasks = await callGetTasks({ config })
        console.log('tasks', tasks)
        setTasks(tasks)
    }

    const AddModal = () => (
        <Modal
            footer={null}
            visible={showAddModal}
            onCancel={() => setShowAddModal(false)}
        >
            <Form
                onFinish={(values) => {
                    callSetTasks({ config, data: values })
                    setShowAddModal(false)
                    handleUpdateLocalTasks( config )
                }}
                layout="vertical"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please fill your title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please fill your description!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )

    return (
        <Fragment>
            <AddModal />
            {tasks.length <= 0 ? (
                <EmptyTaskPanel>
                    <EmptyTaskDescription>
                        It's so empty here. Let's create some tasks !
                    </EmptyTaskDescription>
                    <Button
                        type="primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        Create
                    </Button>
                </EmptyTaskPanel>
            ) : (
                <Fragment>
                    {tasks.map(({ _id, title, description }) => (
                        <StyledCard
                            title={title}
                            onClick={async () => {
                                setShowEditModal(true)
                                form.resetFields()
                            }}
                        >
                            {description}
                        </StyledCard>
                    ))}
                    <Button
                        type="primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        Create
                    </Button>
                </Fragment>
            )}
        </Fragment>
    )
}

const StyledCard = styled(Card)`
    :hover {
        cursor: pointer;
    }
`

const EmptyTaskPanel = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const EmptyTaskDescription = styled.div`
    /* justify-self: center; */
`
