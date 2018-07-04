import querystring from 'querystring'
import axios from 'axios'


export default class Auth {

    constructor(config){
        this.config = config
    }


    authorize_url(){
        const config = this.config
        const location =  
            config.base_url + 
            config.authorize_url + '?' + 
            querystring.stringify({
                'client_id' : config.client_id,
                'redirect_uri': config.redirect_url,
                'response_type': 'code'
                })
        return location
    }

    async revoke_token(token){
        const config = this.config
        const result = await axios.delete( 
            config.base_url + config.token_url, 
            querystring.stringify({
            client_id: config.client_id,
            client_secret: config.client_secret,
            access_token: access_token,
            redirect_uri: config.redirect_url
          }),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return result
    }


    async request_token(code){
        const config = this.config
        const result = await axios.post( 
            config.base_url + config.token_url, 
            querystring.stringify({
            client_id: config.client_id,
            client_secret: config.client_secret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: config.redirect_url
          }),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const token = result.data
        return token
    }

}