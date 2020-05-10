import jsonpOrigin from 'jsonp';

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
}