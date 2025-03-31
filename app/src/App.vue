<template>
  <v-app>
    <v-app-bar :color="$vuetify.theme.current.colors.header" dense>
      <v-btn to="/" class="header-btn">Статьи</v-btn>
      <v-btn to="/analytics" class="header-btn">Аналитика</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.header-btn {
  color: #000000 !important;
  background-color: transparent !important;
}

.header-btn:hover,
.header-btn:active,
.header-btn:focus,
.header-btn.v-btn--active {
  background-color: #E0E0E0 !important;
  color: #000000 !important;
}

.header-btn .v-btn__overlay,
.header-btn .v-btn__underlay {
  display: none !important;
}
</style>
