<template>
  <b-row id="ads" class="position-absolute pl-2">
    <b-col cols="12">
      <h3>
        <b-link class="add-link text-center" to="/adopt"
          >Adopt this satellite</b-link
        >
      </h3>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Map-Advertising",
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
#ads {
  bottom: 0;
  left: 10px;
  z-index: 999;
  div {
    h3 {
      a.add-link {
        color: $color-base !important;
        text-decoration: none;
        &:hover {
          color: $primary !important;
        }
      }
    }
  }
}
</style>
