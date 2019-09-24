/* jshint esversion: 6, asi: true */
import { GQuery } from '@/services/gquery'

class NetworkGQueryService extends GQuery {
  constructor () {
    super()
    this.polling = null
  }

  destructor () {
    clearInterval(this.polling)
  }

  subscribe (view, query) {
    const ret = super.subscribe(view, query)
    if (!this.polling) {
      this.polling = setInterval(() => {
        this.request()
      }, 10000)
      this.request()
    }
    return ret
  }
}

const networkService = new NetworkGQueryService()
// export { networkService }
export default networkService
