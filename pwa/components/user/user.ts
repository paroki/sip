import {ComponentOptionsMixin} from "vue"
import update from "~/components/crud/mixins/update"
import api from "~/lib/api"
import Routing from "~/vendor/jsrouting-bundle/router"

export default <ComponentOptionsMixin>{
  mixins: [update],
  methods: {
    async onChangePassword(){
      const url = Routing.generate('auth_change_password')
      const v$ = this.$refs.changePasswordForm.v$
      const id = this.$route.params['id']

      if(await v$.$validate()){
        const payload = {
          id,
          ...v$.item.$model
        }

        api.fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload)
        })
      }
    }
  }
}
