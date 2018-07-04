# fablabs.js

An ES6 Fablabs.io API client


## Installation

```
yarn add fablabsjs
```


## Usage Examples


### Using a personal token

If you want to write a personal app, or just want avoid using the OAuth flow for testing, you need
to get a **personal token** from the Fablabs.io Developer console, along with application id and secret.

> WARNING: Please make sure you understand that the token must be kept safe since all operations are done with your
account and other users can impersonate you if it leaks.

See [docs.fablabs.io](http://docs.fablabs.io) for further information

```
import  FablabsAPI from 'fablabsjs'

const config = {

    client_id: '<your application id>',
    client_secret: '<your secret>',
    personal_token: '<your personal token from the dashboard>'  // only for thev
}


let fablabs = new FablabsAPI(config)


// get the oauth redirect url

const redirect_url = fablabs.authorization_url()


// process the authorization code and turn it into a token

const token = await fablabs.handle_token(code)


// call any of the api methods

const userProfile = await fablabs.api().getUser()
```

### Using the oAuth flow

The library helps you in implementing the OAuth flow easily into your application. This is the preferred way to authenticate 
your app, allowing each user to login on fablabs.io and authorize your app.

```
import  FablabsAPI from 'fablabsjs'

const config = {

    client_id: '<your application id>',
    client_secret: '<your secret>',
    redirect_url:'http://localhost:3001/auth/callback'
}

let fablabs = new FablabsAPI(config)

// get the oauth redirect url

const redirect_url = fablabs.authorization_url()

// send the user to this url, and wait for the code to be sent to redirect_url

// there, process the authorization code and turn it into a token

const token = await fablabs.handle_token(code)

// call any of the api methods on behalf of the user

const userProfile = await fablabs.api().getUser()
```


## Configuration variables

The following are all the variables you can set in the fablabsjs config:

```
const _default_config = {
    client_id: 'c7b63f68b0ec92dfc700061c373fcae80c9255e52fa30371ce224b79d7045546' || process.env['FABLABS_IO_API_KEY'],
    client_secret: 'b29b0eaa742bed6e19fca87807af40bfbbd24cb15e9fdc3d6c1b7b558574850d'|| process.env['FABLABS_IO_API_SECRET'],
    redirect_url:'http://localhost:3001/auth/callback' || process.env['FABLABS_IO_REDIRECT_URL']
    base_url:'http://api.fablabs.local:3000' || process.env['FABLABS_IO_API_HOST'],
    authorize_url:'/oauth/authorize',
    token_url:'/oauth/token',
    personal_token: 'a9eb5aa7a6f526a79feb3aa840aa7057d27112edb4570f1bf795c588ad89bcac' || process.env['FABLABS_IO_PERSONAL_TOKEN']
}
```

Please note that you can avoid to specify any config and just set environment variables instead.

```
FABLABS_IO_API_KEY = 'your client id'
FABLABS_IO_API_SECRET = 'your secret'
FABLABS_IO_REDIRECT_URL = 'http://localhost:3001/auth/callback'
FABLABS_IO_API_HOST = 'http://api.fablabs.io'
FABLABS_IO_PERSONAL_TOKEN = 'your personal token'
```

## Run tests

You can test the API and your config using the following command

`yarn test`
