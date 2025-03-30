<template>
  <v-layout>
    <v-main class="d-flex align-center justify-center" height="100vh">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>

export default {
  name: 'Main',

  data: () => ({
    //
  }),
}
</script>
