import jsonpOrigin from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';

export default class Axios{
    static jsonp(options){
        return new Promise((resolve,reject) => {
            jsonpOrigin(options.url,{
                param: 'callback'
            },(err,data) => {
                if(data.status == 'success'){
                    resolve(data.results)
                } else {
                    reject(err)
                }
            })
        })
    }

    static ajax(options){
        let baseApi = 'http://106.12.220.186:4000/api';
        let loading;

        if(options.data && options.data.isShowLoading != false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }

        return new Promise((resolve,reject) => {
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.options) || ''
            }).then((response) => {

                if(options.data && options.data.isShowLoading != false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }

                if(response.status == 200){
                    let data = response.data;
                    if(data.code == 0){
                        resolve(data);
                    } else {
                        Modal.info({
                            title:"提示",
                            content:data.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        })
    }
}