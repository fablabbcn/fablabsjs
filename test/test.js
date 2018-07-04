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

  it('should be able to list fablabs', (done) => {
    fablabs.api().labs().then((result)=>{
   
      assert(result.data.length > 0, "Empty lab list")
      result.data.forEach(lab => {
        assert(lab.type, 'lab')        
      });
      done()  
    }).catch((error)=>{
      console.log(error)
      done()
    })
  })

  it('should be able to paginate the list of fablabs', (done) => {
    fablabs.api().labs(2).then((result)=>{
 
      assert(result.data.length > 0, "Empty lab list")
      assert(result.links['self'],2)
      done()  
    }).catch((error)=>{
      console.log(error)
      done()
    })
  })

  it('should be able to access a lab detail', (done) => {
    fablabs.api().labs(2).then((result)=>{
      const lab_id = result.data[0].id
      fablabs.api().getLab(lab_id).then((lab)=>{
        assert(lab.data.id, lab_id)
        done()
      }).catch((error)=>{
        console.log(error)
        done()
      })
    }).catch((error)=>{
      console.log(error)
      done()
    })
  })

  it('should be able to find nearby labs', (done) => {
    fablabs.api().nearbyLabs(64.963, 19.0208).then((result)=>{
   
      assert(result.data.length > 0, "Empty lab list")
      result.data.forEach(lab => {
        assert(lab.attributes.country_code, 'IS')        
      });
      done()  
    }).catch((error)=>{
      console.log(error)
      done()
    })
  })

  it('should be able to find labs by name')

  it('should be able to list projects')

  it('should be able to access a project detail')


})