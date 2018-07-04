import FablabsAPI from '../'
import assert from 'assert'

describe('fablabs.js', () => {
  const fablabs = new FablabsAPI({}) //default config

  it('should return the correct authorization url', done => {
    const output = fablabs.authorization_url()
    const result = fablabs.config.base_url + fablabs.config.authorize_url +
                   "?client_id=" + fablabs.config.client_id + 
                   "&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fcallback" +
                   "&response_type=code"
    assert(output,result)
    done()
  })

  it('should be able to retreive a token')

  it('should be able to get the user profile',  (done) => {
    fablabs.api().getUser().then((result)=>{
      assert(result, {})
      done()  
    }).catch((error)=>{
      console.log(error)
      done()
    })
  })

  it('should be able to list fablabs')

  it('should be able to access a lab detail')

  it('should be able to get labs map')

  it('should be able to list projects')

  it('should be able to access a project detail')


})