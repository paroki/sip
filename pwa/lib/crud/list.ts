import { isEmpty } from "lodash/isEmpty"
import { formatDateTime } from "~/lib/dates"

export default {
  async fetch({ store }) {
    await store.findAll()
  },
  data(){
    return {
      options: {
        sortBy: [],
        sortDesc: [],
        page: 1,
        itemsPerPage: 30,
        filters: {},
        totalItems: 0,
      },
      filters: {}
    }
  },
  watch: {
    deletedItem(item){

    },
    error(message){

    },
    items(){
      this.options.totalItems = this.totalItems
    },
    methods: {
      onUpdateOptions({page, itemsPerPage, sortBy, sortDesc, totalItems} = {}){
        let params = {
          ...this.filters
        }

        if(itemsPerPage > 0){
          params = { ...params, itemsPerPage, page}
        }

        if(!isEmpty(sortBy) && !isEmpty(sortDesc)){
          params[`order[${sortBy[0]}]`] = sortDesc[0] ? 'desc': 'asc'
        }

        this.resetList = true

        Object.assign(this.options, {
          sortBy,
          sortDesc,
          itemsPerPage,
          totalItems
        })

        this.fetchAll(params)
      },
      onSendFilter() {
        this.resetList = true;
        this.onUpdateOptions(this.options);
      },

      resetFilter() {
        this.filters = {};
        this.onSendFilter();
      },

      deleteHandler(item) {
        this.deleteItem(item).then(() => this.onUpdateOptions(this.options));
      },

      formatDateTime
    }
  }
}
