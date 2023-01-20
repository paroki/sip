import { formatDateTime } from "~/lib/dates"

const servicePrefix = 'user'
export default {
  data(){
    return {
      item: {}
    }
  },
  created(){
    this.retrieve(`${this.$options.endpoint}/${this.$route.params.id}`);
  },
  beforeDestroy() {
    this.reset();
  },
  computed: {
    retrieved() {
      return this.find(`${this.$options.endpoint}/${this.$route.params.id}`);
    }
  },
  methods: {
    del() {
      this.deleteItem(this.retrieved).then(() => {
        this.showMessage(`${this.deleted['@id']} deleted.`);
        this.$router.push(`/${this.$options.servicePrefix}`)
      });
    },
    formatDateTime,
    reset() {
      this.$refs.updateForm.$reset();
      this.updateReset();
      this.delReset();
      this.createReset();
    },

    onSendForm(evt) {
      /*
      const updateForm = this.$refs.updateForm;
      updateForm.$v.$touch();

      if (!updateForm.$v.$invalid) {
        this.update(updateForm.$v.item.$model);
      }
       */
      const updateForm = this.$refs.updateForm;
      this.update(updateForm.item);
    },

    resetForm() {
      this.$refs.updateForm.$reset();
      this.item = { ...this.retrieved };
    }
  },
  watch: {
    deleted(deleted) {
      if (!deleted) {
        return;
      }
      this.$router.push(`/${this.$options.servicePrefix}`)
    },

    error(message) {
      message && this.showError(message);
    },

    deleteError(message) {
      message && this.showError(message);
    },

    updated(val) {
      this.showMessage(`${val['@id']} updated.`);
    },

    retrieved(val) {
      this.item = { ...val };
    }
  }
}
