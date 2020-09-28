<template>
  <div class="home">
    <organization />
  </div>
</template>

<script>
// @ is an alias to /src
import Organization from './Organization.vue'

export default {
  name: 'Home',
  components: {
    Organization,
  }
}
</script>
