<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar>
      <v-img
        height="80px"
        :src="logo"
        contain
        style="background-position: left center !important;"
      />
    </v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Nuevo Ticket" link to="/App/ticket"></v-list-item>
        <v-list-item title="Historial de Tickets" link to="/App/ticketHistory"></v-list-item>
        <v-list-item title="Departamentos" link to="/App/department"></v-list-item>
        <v-list-item title="Empleados" link to="/App/employee"></v-list-item>
        <v-list-item title="Usuarios" link to="/App/user"></v-list-item>
        <v-list-item title="Roles" link to="/App/role"></v-list-item>
        <v-list-item title="Permisos" link to="/App/permission"></v-list-item>
        <v-list-item title="Vehículos" link to="/App/vehicle"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" height="100%">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>

export default {
  name: 'Default',

  data: () => ({
    //
  }),
  computed: {
    logo () {
      return require('../assets/img/logo.png')
    }
  }
}
</script>

<style>
  .main-bar {
    background-image: url('../assets/img/logo.png');
    /* background-size: cover;
    background-position: center; */
    background-repeat: no-repeat
  }
</style>