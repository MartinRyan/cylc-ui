/* jshint esversion: 6, asi: true */
import { GQuery } from '@/services/gquery'

class CytoscapeGQueryService extends GQuery {
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
      }, 9000)
      this.request()
    }
    return ret
  }
}

const cytoscapeService = new CytoscapeGQueryService()
export default cytoscapeService
