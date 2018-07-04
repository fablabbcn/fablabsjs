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

    async getLab(lab_id){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/labs/'+lab_id)       
        if (result.data){
            const record = result.data
            return record
        } 
        return { 'error' : 'Error: failed to load lab data' }
    }

    async labs(page=1, per_page=10){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/labs?page=' + page + '&per_page=' + per_page)       
        if (result.data){
            const record = result.data
            return record
        } 
        return { 'error' : 'Error: failed to list labs' }
    }

    async nearbyLabs(lat,lng,page=1, per_page=10){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/labs/search?q='+lat+':'+lng+'&type=location&page=' + page + '&per_page=' + per_page)       
        if (result.data){
            const record = result.data
            return record
        } 
        return { 'error' : 'Error: failed to find nearby labs' }
    }

    async searchLabs(page=1, per_page=10){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/labs/search?q='+query+'&type=fulltext&page=' + page + '&per_page=' + per_page)       
        if (result.data){
            const record = result.data
            return record
        } 
        return { 'error' : 'Error: failed to search labs' }
    }



}