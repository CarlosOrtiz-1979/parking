<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Departamentos" link to="/department"></v-list-item>
        <v-list-item title="Empleados" link to="/employee"></v-list-item>
        <v-list-item title="Usuarios" link to="/user"></v-list-item>
        <v-list-item title="Roles" link to="/role"></v-list-item>
        <v-list-item title="Permisos" link to="/pemission"></v-list-item>
        <v-list-item title="Vehículos" link to="/vehicle"></v-list-item>
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
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
