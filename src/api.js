import querystring from 'querystring'
import axios from 'axios'

export default class API {

    constructor(config, token){
        this.config = config
        this.token = token
    }

    async get(token, url,params,options){
        const base_url = this.config.base_url
    
        const res = await axios.request({
                    method: 'get', 
                    url: base_url + url, params,
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    },
                    ...options
                }, params)
        return res
    }
    

    async getUser(){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/users/me.json')       
        if (result.data){
            const record = result.data
            const item = record.data
            return item.attributes
        } 
        return { 'error' : 'Error: failed to load profile data' }
    }



}