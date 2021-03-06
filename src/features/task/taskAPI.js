import axios from 'axios'

const Endpoint = 'https://candidate.neversitup.com/todo'

export const callGetTasks = async ({ config }) => {
    try {
        const res = await axios.get(`${Endpoint}/todos`, config)
        return res.data
    } catch (error) {
        return []
    }
}

export const callSetTasks = async ({ data, config }) => {
    try {
        const res = await axios.post(`${Endpoint}/todos`, data, config)
    } catch (error) {}
}

export const callUpdateTasks = async ({ currentTask, data, config }) => {
    try {
        const res = await axios.put(
            `${Endpoint}/todos/${currentTask}`,
            data,
            config
        )
    } catch (error) {}
}

export const callDeleteTasks = async ({ currentTask, config }) => {
    try {
        const res = await axios.delete(
            `${Endpoint}/todos/${currentTask}`,
            config
        )
    } catch (error) {}
}
