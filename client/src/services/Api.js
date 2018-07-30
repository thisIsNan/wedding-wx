import axios from 'axios'

export default () => {
  return axios.create({
    // http://nzhang.local:3000
    // `http://wedding.ap-northeast-1.elasticbeanstalk.com:80`
    baseURL: `http://wedding.ap-northeast-1.elasticbeanstalk.com:80`
  })
}
