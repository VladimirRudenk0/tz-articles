<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Статьи и комментарии</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/">Статьи</v-btn>
      <v-btn to="/analytics">Аналитика</v-btn>
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
