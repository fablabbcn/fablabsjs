import querystring from 'querystring'
import axios from 'axios'

/**
 * This class encapsulates the methods exposed by the FabLabs.io API
 * You can use this standalone providing a valid access_token and
 * the same config used by the {@link FablabsAPI} class.
 * @example
 * let config = {...}
 * let access_token = '<something>'
 * let api = new Api(config, access_token)
 */
export default class Api {

    constructor(config, token){
        this.config = config
        this.token = token
    }

    /**
     * Perform a GET request on the API endpoint, passing the access token
     * @param {string} token 
     * @param {string} url 
     * @param {*} params 
     * @param {*} options 
     * @returns {object} the GET request result
     */
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
    
    /**
     * Get the profile for the user associated to the current access_token
     * @returns {Object}
     */
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

    /**
     * Get the details for a given lab identified by id
     * @param {Number} lab_id 
     * @returns {Object}
     */
    async getLab(lab_id){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/labs/'+lab_id)       
        if (result.data){
            const record = result.data
            return record
        } 
        return { 'error' : 'Error: failed to load lab data' }
    }
    /**
     * List approved labs
     * @param {Number} page the desired result page, default 1
     * @param {Number} per_page the desired number of results per page, default 10
     @ @returns {Object}
     */
    async labs(page=1, per_page=10){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/labs?page=' + page + '&per_page=' + per_page)       
        if (result.data){
            const record = result.data
            return record
        } 
        return { 'error' : 'Error: failed to list labs' }
    }

    /**
     * Search approved labs by location
     * @param {Number} lat latitute 
     * @param {Number} lng longitude
     * @param {Number} page the desired result page, default 1
     * @param {Number} per_page the desired number of results per page, default 10
     @ @returns {Object}
     */
    async nearbyLabs(lat,lng,page=1, per_page=10){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/labs/search?q='+lat+':'+lng+'&type=location&page=' + page + '&per_page=' + per_page)       
        if (result.data){
            const record = result.data
            return record
        } 
        return { 'error' : 'Error: failed to find nearby labs' }
    }

    /**
     * Search approved labs by name
     * @param {String} query the search query
     * @param {Number} page the desired result page, default 1
     * @param {Number} per_page the desired number of results per page, default 10
     @ @returns {Object}
     */
    async searchLabs(query, page=1, per_page=10){
        if (!this.token) return {'error': 'Error: missing token '}
        const result = await this.get(this.token, '/2/labs/search?q='+query+'&type=fulltext&page=' + page + '&per_page=' + per_page)       
        if (result.data){
            const record = result.data
            return record
        } 
        return { 'error' : 'Error: failed to search labs' }
    }



}