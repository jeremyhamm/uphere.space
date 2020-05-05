<template>
  <b-row class="justify-content-center text-center advertising">
    <b-col cols="12" md="9" xl="8">
      <a href="https://www.bluehost.com/track/upheredotspace/" target="_blank">
        <img
          border="0"
          src="https://bluehost-cdn.com/media/partner/images/upheredotspace/488x160/488x160BW.png"
        />
      </a>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Advertising",
  data() {
    return {
      config: process.env
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables.scss";
.advertising {
  margin-top: 100px;
}
</style>
