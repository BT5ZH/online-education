import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://67yra4mxye.execute-api.cn-northwest-1.amazonaws.com.cn/rsuser'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance