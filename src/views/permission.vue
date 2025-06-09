<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="permissions"
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
              text="Ingresar Nuevo Rol"
              border
              @click="addPermission()"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editPermission(item._id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="deletePermission(item._id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editPermissionDialog" max-width="500">
    <edit-permission :permission-for-update="editingPermission" @close="closeEditDialog"></edit-permission>
  </v-dialog>

  <delete-dialog
    v-model="deletePermissionDialog"
    @delete="removePermission()"
    @cancel="closeDeleteDialog"
  />
</template>

<script>
  import axios from 'axios'
  import editPermission from './editPermission.vue'
  import deleteDialog from '@/components/deleteDialog.vue'

  export default {
    components: { editPermission, deleteDialog },
    data: () => ({
      headers: [
        { title: 'Nombre', value: 'name' },
        { title: 'Descripción', value: 'description' },        
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      permissions: [],
      editPermissionDialog: false,
      editingPermission: null,
      deletePermissionDialog: false,
    }),
    async mounted () {
      await this.getPermissions()
    },
    methods: {
      async getPermissions () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/permissions')
          if (response && response.data) {
            this.permissions = response.data
          } else {
            console.log('Error al obtener los usuarios')
          }
        } catch (error) {
          console.log(error)
        }
      },
      addPermission () {
        this.editingPermission = null
        this.editPermissionDialog = true
      },
      editPermission (id) {
        this.editingPermission = this.permissions.find(permission => permission._id === id)
        this.editPermissionDialog = true
      },
      deletePermission (id) {
        this.deletePermissionDialog = true
        this.deletePermissionId = id
      },
      async removePermission () {
        try {
          const response = await axios.delete(`http://localhost:3000/api/v1/permission/${this.deletePermissionId}`)

          if (response && response.data) {
            console.log('Usuario eliminado', response.data)
            const permissionIndex = this.permissions.findIndex(permission => permission._id === this.deletePermissionId)
            this.permissions.splice(permissionIndex, 1)
          } else {
            console.log('Error al eliminar el usuario')
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.closeDeleteDialog()
        }
      },
      closeEditDialog (data) {
        this.editPermissionDialog = false
        this.editingPermission = null
        if (data) {
          this.permissions.push(data)
        }
      },
      closeDeleteDialog () {
        this.deletePermissionDialog = false
        this.editingPermission = null
      }
    }
  }
</script>
