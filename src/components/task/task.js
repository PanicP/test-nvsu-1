import React, { Fragment, useState, useEffect } from 'react'
import { Button, Card, Form, Modal, Input } from 'antd'
import styled from 'styled-components'
import {
    callGetTasks,
    callSetTasks,
    callUpdateTasks,
    callDeleteTasks,
} from '../../features/task/taskAPI'

export const TaskPanel = () => {
    const [tasks, setTasks] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [currentTask, setCurrentTask] = useState({})

    const [form] = Form.useForm()

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    }

    useEffect(() => {
        handleUpdateLocalTasks(config)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdateLocalTasks = async (config) => {
        const tasks = await callGetTasks({ config })
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
                    handleUpdateLocalTasks(config)
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

    const EditModal = () => (
        <Modal
            visible={showEditModal}
            footer={null}
            onCancel={() => setShowEditModal(false)}
        >
            <Form
                form={form}
                initialValues={
                    tasks.filter((task) => task._id === currentTask)[0]
                }
                onFinish={(values) => {
                    try {
                        callUpdateTasks({ currentTask, data: values, config })
                        setShowEditModal(false)
                        handleUpdateLocalTasks(config)
                    } catch (error) {}
                }}
                layout="vertical"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your title!',
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
                            message: 'Please input your description!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )

    const DeleteModal = () => (
        <Modal
            footer={null}
            visible={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
        >
            <Form
                form={form}
                initialValues={
                    tasks.filter((task) => task._id === currentTask)[0]
                }
                layout="vertical"
            >
                <ConfirmDeleteLayout>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="danger"
                            onClick={async () => {
                                await callDeleteTasks({ currentTask, config })
                                setShowDeleteModal(false)
                                handleUpdateLocalTasks(config)
                            }}
                        >
                            Confirm
                        </Button>
                    </Form.Item>
                </ConfirmDeleteLayout>
            </Form>
        </Modal>
    )

    return (
        <Fragment>
            <AddModal />
            <EditModal />
            <DeleteModal />
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
                    {tasks.map((task) => (
                        <StyledCard
                            title={task.title}
                            onClick={async (event) => {
                                await setCurrentTask(task._id)
                                setShowEditModal(true)
                                form.resetFields()
                            }}
                            extra={
                                <Button
                                    type="danger"
                                    onClick={async (event) => {
                                        event.stopPropagation()
                                        await setCurrentTask(task._id)
                                        setShowDeleteModal(true)
                                        form.resetFields()
                                    }}
                                >
                                    X
                                </Button>
                            }
                        >
                            {task.description}
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
    .ant-card-head {
        border-bottom: 0px;
    }

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

const ConfirmDeleteLayout = styled.div`
    display: flex;
`
