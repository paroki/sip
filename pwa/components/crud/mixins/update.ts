import {Store, StoreDefinition} from "pinia"
import {ICrudService, IResource} from "~/lib"
import {Component, ComponentOptionsMixin, ref} from "vue"
import useVuelidate from "@vuelidate/core"
import notification from "~/components/crud/notification"
import useNotification from "~/components/crud/notification"

export default <ComponentOptionsMixin>{
  mixins: [notification],
  setup(){
    const { showMessage } = useNotification()
    return {
      showMessage
    }
  },
  async mounted() {
    await this.service.load(`${this.$route.params.id}`)
  },
  data: () => {
    return {
      item: {}
    }
  },
  computed: {
    retrieved(){
      return this.store.find(`/${this.servicePrefix}/${this.$route.params.id}`)
    }
  },
  watch: {
    deleted(deleted){

    },
    error(message){

    },
    deleteError(message){

    },
    retrieved(val){
      this.item = val
    }
  },
  beforeUnmount() {
    this.reset()
  },
  methods: {
    showError(item: any): string{
      const errors: string[] = []
      if (!item.$dirty) return "";

      const errs = item.$errors

      errs.map((err:any) => {
        errors.push(err.$message)
      })

      return errors.join("<br/>")
    },
    async onSave(){
      const v$ = this.$refs.updateForm.v$
      if(await v$.$validate()){
        // this.service.update(this.v$.item.$model)
        this.service.update(v$.item.$model)
      }
    },
    reset(){
      if(this.$refs.updateForm){
        this.$refs.updateForm.v$.$reset();
      }
      this.store.resetUpdate();
      this.store.resetCreate();
    },
    onReset(){
      this.$refs.updateForm.v$.$reset();
      this.item = { ...this.retrieved}
    },
    async onDelete(){
      await this.service.delete(this.retrieved)
      await navigateTo(`/konfigurasi/user`, {replace: false})
    }
  }
}
