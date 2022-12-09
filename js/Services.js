export default class Services{
    url = "https://63676ecaf5f549f052d54efc.mockapi.io/";

    
    luuCongViec = (data) => {
        return axios({
            method: 'post',
            url: `${this.url}todoList`,
            data: data
          })
    }
    loadCongViec = () => {
        return axios({
            method: 'get',
            url: `${this.url}todoList`,
          })
    }
    suaCongViec = (data) => {
        return axios({
            method: 'put',
            url: `${this.url}todoList/${data.id}`,
            data: data
          })
    }

    xoaCongViec = (id) => {
        return axios({
            method: 'delete',
            url: `${this.url}todoList/${id}`,
          })
    }
}