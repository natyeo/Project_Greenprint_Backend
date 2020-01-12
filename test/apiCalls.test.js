const Api = require('../src/apiCalls')

describe('googleApiCall', () => {

  test('calls googlemaps and returns promise', async () => {
    const req = {body: {from: "N19 5RQ", to:"N6 5AA" }}
    await expect(Api.googleApiCall(req, 'walking')).resolves.toHaveProperty('mode', 'walking')
  })
})
