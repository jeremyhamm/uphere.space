<template>
  <b-row id="ads" class="position-absolute">
    <b-col cols="12"> </b-col>
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

<style lang="scss">
#ads {
  bottom: 0;
}
</style>
