import { Routing } from 'fos-router/js/router'
import routes from '../../../api/public/js/fos_js_routes.json'
export default {
  install() {
    Routing.setRoutingData(routes)
  },
}
