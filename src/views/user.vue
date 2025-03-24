<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="name"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon color="medium-emphasis" icon="mdi-account-group" size="large" start></v-icon>
              Usuarios
            </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ingresar Nuevo Usuario"
              border
              @click="addUser()"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editUser(item.id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="removeUser(item.id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editUserDialog" max-width="500">
    <edit-user :user="editingUser"></edit-user>
  </v-dialog>
</template>

<script>
  import editUser from './editUser.vue'

  export default {
    components: { editUser },
    data: () => ({
      headers: [
        { title: 'id', value: 'id', align: 'start' },
        { title: 'Nombre', value: 'name' },
        { title: 'Email', value: 'email' },
        { title: 'Código', value: 'employee.code', align: 'end' },
        { title: 'Cargo', value: 'employee.position', align: 'end' },
        { title: 'Departamento', value: 'employee.department.name', align: 'end' },
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      items: [
        {
          id: '1',
          name: 'Pedro Perez',
          email: 'pedro@mail.com',
          employee: {
            id: '1',
            name: 'Pedro Perez',
            code: '3085',
            position: 'Operador',
            department: {
              name: 'Operaciones',
              manager: 'Jose Luis'
            }
          }
        },
        {
          id: '2',
          name: 'Ramon Valdez',
          email: 'pedro@mail.com',
          employee: {
            id: '2',
            name: 'Ramon Valdez',
            code: '3145',
            position: 'Operador',
            department: {
              name: 'Operaciones',
              manager: 'Jose Luis'
            }
          }
        },
        {
          id: '3',
          name: 'Juan Gonzalez',
          email: 'pedro@mail.com',
          employee: {
            id: '3',
            name: 'Juan Gonzalez',
            code: '3128',
            position: 'Operador',
            department: {
              name: 'Operaciones',
              manager: 'Jose Luis'
            }
          }
        },
        {
          id: '4',
          name: 'Carlos Gomez',
          email: 'pedro@mail.com',
          employee: {
            id: '4',
            name: 'Carlos Gomez',
            code: '3228',
            position: 'Auxiliar de Mantenimiento',
            department: {
              name: 'Mantenimiento',
              manager: 'Ricardo Mora'
            }
          }
        }
      ],
      editUserDialog: false,
      editingUser: null
    }),
    methods: {
      addUser () {
        this.editUserDialog = true
      },
      editUser (id) {
        this.editingUser = this.items.find(user => user.id === id)
        this.editUserDialog = true
      },
      removeUser (id) {
        const userIndex = this.items.findIndex(user => user.id === id)
        this.items.splice(userIndex, 1)
      }
    }
  }
</script>
