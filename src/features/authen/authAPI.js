import Axios from 'axios'

// export const callGetAuth = (values) => {
export const callGetAuth = async (values) => {
    try {
        // // console.log(values)
        // localStorage.setItem('authToken', authToken)
        // return true
        const res = await Axios.post(
            'https://candidate.neversitup.com/todo/users/auth',
            values
        )
        if (res) {
            const { token } = res.data
            localStorage.setItem('authToken', token)
        }
    } catch (error) {
        console.log(error, 'test')
        return false
    }
}
