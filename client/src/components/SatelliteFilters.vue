<template>
  <div id="filters-container" class="fixed-top">
    <b-form @submit="updateList" @reset="resetFilters" novalidate>
      <!-- Country Select -->
      <b-form-row class="mt-3 mx-auto" v-if="countryList">
        <b-col cols="12" md="6" lg="4" xl="3" offset-xl="3">
          <div class="mt-4 mb-3 font-weight-bold text-uppercase">
            Filter by Country
          </div>
          <b-form-select
            v-model="selectedCountry"
            :options="countryList"
          ></b-form-select>
        </b-col>
      </b-form-row>
      <!-- Category filter -->
      <b-form-row class="mt-3 mb-5 mx-auto" v-if="categoryList">
        <b-col cols="12" md="8" xl="6" offset-xl="3">
          <div class="mt-4 mb-3 font-weight-bold text-uppercase">
            Filter by Category
          </div>
          <b-form-checkbox-group
            stacked
            :options="categoryList"
            value-field="name"
            text-field="name"
            name="category"
            class="category-list text-uppercase"
            v-model="selectedCategories"
            size="lg"
          >
          </b-form-checkbox-group>
        </b-col>
      </b-form-row>
      <!-- Submit -->
      <b-form-row
        id="filters-submit"
        class="position-fixed d-flex text-center py-2"
      >
        <b-col cols="12">
          <b-button
            type="submit"
            variant="danger"
            class="mr-3"
            :disabled="!selectedCategories.length && !selectedCountry"
          >
            Update
          </b-button>
          <b-button type="reset" variant="outline-danger">Reset</b-button>
        </b-col>
      </b-form-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Satellite-Filters",
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    selectedCategories: {
      get: function() {
        return this.$store.getters["satellite/getSatelliteCategoryFilter"];
      },
      set: function(data) {
        this.$store.commit("satellite/setSatelliteCategoryFilter", data);
      }
    },
    selectedCountry: {
      get: function() {
        return this.$store.getters["satellite/getSatelliteCountryFilter"];
      },
      set: function(data) {
        this.$store.commit("satellite/setSatelliteCountryFilter", data);
      }
    },
    satelliteList: {
      get: function() {
        return this.$store.getters["satellite/getSatelliteList"];
      },
      set: function(data) {
        this.$store.commit("satellite/setSatelliteList", data);
      }
    },
    satellitePageNumber: {
      get() {
        return this.$store.getters["satellite/getSatellitePage"];
      },
      set(val) {
        return this.$store.commit("satellite/setSatellitePage", val);
      }
    },
    infiniteReset: {
      get() {
        return this.$store.getters["satellite/getInfinateReset"];
      },
      set(val) {
        this.$store.commit("satellite/setInfinateReset", val);
      }
    },
    categoryList() {
      return this.$store.getters["satellite/getCategoryList"];
    },
    countryList() {
      return this.$store.getters["satellite/getCountryList"];
    }
  },
  methods: {
    resetCategoryFilter() {
      this.satelliteList.forEach(sat => {
        sat.selected = true;
      });
    },
    updateList(e) {
      e.preventDefault();
      this.$emit("filters", "close");
      this.satellitePageNumber = 1;
      this.satelliteList = [];
      this.infiniteReset += 1;
    },
    resetFilters() {
      this.$emit("filters", "close");
      this.selectedCountry = null;
      this.selectedCategories = [];
      this.satellitePageNumber = 1;
      this.satelliteList = [];
      this.infiniteReset += 1;
      this.$router.replace({ path: "/list" });
    }
  }
};
</script>

<style lang="scss"></style>
