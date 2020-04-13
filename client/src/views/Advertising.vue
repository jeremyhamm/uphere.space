<template>
  <b-container fluid>
    <b-row class="heading justify-content-center">
      <b-col cols="12">
        <h1 class="text-center mb-4">Adopt a satellite</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Advertising",
  data() {
    return {
      config: process.env
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables.scss";
.heading {
  padding-top: 100px;
}
</style>
