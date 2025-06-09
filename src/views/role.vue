<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="roles"
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
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editRole(item._id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="deleteRole(item._id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editRoleDialog" max-width="500">
    <edit-role :role-for-update="editingRole" @close="closeEditDialog"></edit-role>
  </v-dialog>

  <delete-dialog
    v-model="deleteRoleDialog"
    @delete="removeRole()"
    @cancel="closeDeleteDialog"
  />
</template>

<script>
  import axios from 'axios'
  import editRole from './editRole.vue'
  import deleteDialog from '@/components/deleteDialog.vue'

  export default {
    components: { editRole, deleteDialog },
    data: () => ({
      headers: [
        { title: 'Nombre', value: 'name' },
        { title: 'Descripción', value: 'description' },        
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      roles: [],
      editRoleDialog: false,
      editingRole: null,
      deleteRoleDialog: false,
    }),
    async mounted () {
      await this.getRoles()
    },
    methods: {
      async getRoles () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/roles')
          if (response && response.data) {
            this.roles = response.data
          } else {
            console.log('Error al obtener los usuarios')
          }
        } catch (error) {
          console.log(error)
        }
      },
      addRole () {
        this.editingRole = null
        this.editRoleDialog = true
      },
      editRole (id) {
        this.editingRole = this.roles.find(role => role._id === id)
        this.editRoleDialog = true
      },
      deleteRole (id) {
        this.deleteRoleDialog = true
        this.deleteRoleId = id
      },
      async removeRole () {
        try {
          const response = await axios.delete(`http://localhost:3000/api/v1/role/${this.deleteRoleId}`)

          if (response && response.data) {
            console.log('Usuario eliminado', response.data)
            const roleIndex = this.roles.findIndex(role => role._id === this.deleteRoleId)
            this.roles.splice(roleIndex, 1)
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
        this.editRoleDialog = false
        this.editingRole = null
        if (data) {
          this.roles.push(data)
        }
      },
      closeDeleteDialog () {
        this.deleteRoleDialog = false
        this.editingRole = null
      }
    }
  }
</script>
