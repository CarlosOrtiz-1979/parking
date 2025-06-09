<template>
  <v-card>
    <v-card-text>
      <v-data-table :headers="headers" :items="users" item-key="name" hide-default-footer>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon color="medium-emphasis" icon="mdi-account-group" size="large" start></v-icon>
              Usuarios
            </v-toolbar-title>

            <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Ingresar Nuevo Usuario" border
              @click="addUser()"></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editUser(item._id)"></v-icon>
            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="deleteUser(item._id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editUserDialog" max-width="500">
    <edit-user :user-for-update="editingUser" @close="closeEditDialog"></edit-user>
  </v-dialog>

  <delete-dialog
    v-model="deleteUserDialog"
    @delete="removeUser()"
    @cancel="closeDeleteDialog"
  />
  
</template>

<script>
  import axios from 'axios'
  import editUser from './editUser.vue'
  import deleteDialog from '@/components/deleteDialog.vue'

  export default {
    components: { editUser, deleteDialog },
    data: () => ({
      headers: [
        /* { title: 'id', value: '_id', align: 'start' }, */
        { title: 'Nombre', value: 'name' },
        { title: 'Email', value: 'email' },
        { title: 'Código', value: 'employee.code', align: 'end' },
        { title: 'Cargo', value: 'employee.position', align: 'end' },
        { title: 'Departamento', value: 'employee.departmentId.name', align: 'end' },
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      users: [],
      deleteUserId: null,
      editUserDialog: false,
      deleteUserDialog: false,
      editingUser: null
    }),
    async mounted () {
      this.getUsers()
    },
    methods: {
      async getUsers () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/users')
          if (response && response.data) {
            console.log('response.data: ', response.data)
            response.data.map(user => {
              this.users.push({
                employee: user.employeeId,
                employeeId: user.employeeId._id,
                ...user
              })
            })
          } else {
            console.log('Error al obtener los usuarios')
          }
        } catch (error) {
          console.log(error)
        }
      },
      addUser () {
        this.editingUser = null
        this.editUserDialog = true
      },
      editUser (id) {
        this.editingUser = this.users.find(user => user._id === id)
        this.editUserDialog = true
      },
      deleteUser (id) {
        this.deleteUserDialog = true
        this.deleteUserId = id
      },
      async removeUser () {
        try {
          const response = await axios.delete(`http://localhost:3000/api/v1/user/${this.deleteUserId}`)

          if (response && response.data) {
            console.log('Usuario eliminado', response.data)
            const userIndex = this.users.findIndex(user => user._id === this.deleteUserId)
            this.users.splice(userIndex, 1)
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
        this.editUserDialog = false
        this.editingUser = null
        if (data) {
          this.users.push(data)
        }
      },
      closeDeleteDialog () {
        this.deleteUserDialog = false
        this.editingUser = null
      }
    }
  }
</script>
