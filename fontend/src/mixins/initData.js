export default {
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      params: {},
      query: {}
    }
  },
  methods: {
    pageChange(e) {
      this.page = e
      this.init()
    },
    sizeChange(e) {
      this.page = 1
      this.size = e
      this.init()
    }
  }
}
