import Auth from "./auth"
import API from "./api"

const _default_config = {
  client_id: 'c7b63f68b0ec92dfc700061c373fcae80c9255e52fa30371ce224b79d7045546' || process.env['FABLABS_IO_API_KEY'],
  client_secret: 'b29b0eaa742bed6e19fca87807af40bfbbd24cb15e9fdc3d6c1b7b558574850d'|| process.env['FABLABS_IO_API_SECRET'],
  personal_token: 'a9eb5aa7a6f526a79feb3aa840aa7057d27112edb4570f1bf795c588ad89bcac' || process.env['FABLABS_IO_PERSONAL_TOKEN'],
  redirect_url: 'http://localhost:3001/auth/callback' || process.env['FABLABS_IO_REDIRECT_URL'],
  base_url: 'http://api.fablabs.local:3000' || process.env['FABLABS_IO_API_HOST'],
  authorize_url: '/oauth/authorize',
  token_url: '/oauth/token'
}

export default class FablabsAPI {
  
  
  constructor(config={}){
    this.config = { ...config, ..._default_config }
    this.auth = new Auth(this.config)
    this.token = this.config.personal_token
  }

  authorization_url(){
    return this.auth.authorize_url()
  }

  async handleAuthCode(code){
     const token = this.auth.request_token(code)
     if (token){
       this.token = token
     }
     return this.token
  }

  api(){
    return new API(this.config, this.token)
  }

}
