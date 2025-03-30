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
              Permisos
            </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ingresar Nuevo Permiso"
              border
              @click="addPermission()"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editPermission(item.id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="removePermission(item.id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editPermissionDialog" max-width="500">
    <edit-permission :permission="editingPermission"></edit-permission>
  </v-dialog>
</template>

<script>
  import editPermission from './editPermission.vue'

  export default {
    components: { editPermission },
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
          name: 'modulo_empleados',
          description: 'Acceso completo al módulo de empleados',          
        },
        {
          id: '2',
          name: 'modulo_usuarios',
          description: 'Acceso completo al módulo de usuarios'
        },
        {
          id: '3',
          name: 'modulo_departamentos',
          description: 'Acceso completo al módulo de departamentos'
        },
        
      ],
      editPermissionDialog: false,
      editingPermission: null
    }),
    methods: {
      addPermission () {
        this.editPermissionDialog = true
      },
      editPermission (id) {        
        this.editingPermission = this.items.find(permission => permission.id === id)
        this.editPermissionDialog = true
      },
      removePermission (id) {
        const permissionIndex = this.items.findIndex(permission => permission.id === id)
        this.items.splice(permissionIndex, 1)
      }
    }
  }
</script>
