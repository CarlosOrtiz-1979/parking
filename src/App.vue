<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="About" link to="/about"></v-list-item>
        <v-list-item title="Ejemplo" link to="/example"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
