<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon color="medium-emphasis" icon="mdi-account-group" size="large" start></v-icon>
              Roles
            </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ingresar Nuevo Rol"
              border
              @click="addRole()"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editRole(item.id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="removeRole(item.id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editRoleDialog" max-width="500">
    <edit-role :role="editingRole"></edit-role>
  </v-dialog>
</template>

<script>
  import editRole from './editRole.vue'

  export default {
    components: { editRole },
    data: () => ({
      headers: [
        { title: 'id', value: 'id', align: 'end' },
        { title: 'Nombre', value: 'name' },
        { title: 'Descripción', value: 'description' },        
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      items: [
        {
          id: '1',
          name: 'Administrador',
          description: 'Acceso a toda la aplicación',          
        },
        {
          id: '2',
          name: 'Coordinador',
          description: 'Editar, Crear y Consultar'
        },
        {
          id: '3',
          name: 'Operador',
          description: 'Editar y Consultar entradas y salidas del parqueadero'
        },
        
      ],
      editRoleDialog: false,
      editingRole: null
    }),
    methods: {
      addRole () {
        this.editRoleDialog = true
      },
      editRole (id) {        
        this.editingRole = this.items.find(role => role.id === id)
        this.editRoleDialog = true
      },
      removeRole (id) {
        const roleIndex = this.items.findIndex(role => role.id === id)
        this.items.splice(roleIndex, 1)
      }
    }
  }
</script>
