import Axios from 'axios'

export const callGetAuth = async ({ data }) => {
    try {
        const res = await Axios.post(
            'https://candidate.neversitup.com/todo/users/auth',
            data
        )
        if (res) {
            const { token } = res.data
            localStorage.setItem('authToken', token)
        }
    } catch (error) {
        return false
    }
}
