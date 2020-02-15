<template>
  <b-container>
    <b-row class="text-center mt-5">
      <b-col cols="12">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
        <p class="text-primary">Loading...</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {
      config: process.env
    };
  }
};
</script>

<style lang="scss"></style>
