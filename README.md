# fablabs.js

An ES6 Fablabs.io API client


## Installation

```
yarn add fablabsjs
```


## Usage Examples

```
import  FablabsAPI from 'fablabsjs'

const config = {

    client_id: '<your application id>',
    client_secret: '<your secret>',
    personal_token: '<your personal token from the applications dashboard>' 
}


let fablabs = new FablabsAPI(config)


// get the oauth redirect url

const redirect_url = fablabs.authorization_url()


// process the authorization code and turn it into a token

const token = await fablabs.handle_token(code)


// call any of the api methods

const userProfile = await fablabs.api().getUser()
```


## Configuration variables

The following are all the variables you can set in the fablabsjs config:

```
const _default_config = {
    API_BASE_URL: 'http://api.fablabs.local:3000' || process.env['FABLABS_IO_API_HOST'] ,
    LOCAL_AUTH_URL: "http://localhost:3001/auth/fablabs",
    client_id: 'c7b63f68b0ec92dfc700061c373fcae80c9255e52fa30371ce224b79d7045546' || process.env['FABLABS_IO_API_KEY'],
    client_secret: 'b29b0eaa742bed6e19fca87807af40bfbbd24cb15e9fdc3d6c1b7b558574850d'|| process.env['FABLABS_IO_API_SECRET'],
    redirect_url:'http://localhost:3001/auth/callback' || process.env['FABLABS_APP_REDIRECT_URL']
    base_url:'http://api.fablabs.local:3000' || process.env['FABLABS_IO_WEB_HOST'],
    authorize_url:'/oauth/authorize',
    token_url:'/oauth/token',
    dev_host: 'http://localhost:8080' || process.env['FABLABS_APP_DEVHOST'],
    personal_token: 'a9eb5aa7a6f526a79feb3aa840aa7057d27112edb4570f1bf795c588ad89bcac' || process.env['FABLABS_IO_PERSONAL_TOKEN']
}
```

Please note that you can avoid to specify any config and just set environment variables instead.


## Run tests

You can test the API and your config using the following command

`yarn test`
