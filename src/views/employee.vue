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
              Empleados
            </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ingresar Nuevo Empleado"
              border
              @click="addEmployee()"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editEmployee(item.id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="removeEmployee(item.id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editEmployeeDialog" max-width="500">
    <edit-employee :employee="editingEmployee"></edit-employee>
  </v-dialog>
</template>

<script>
  import editEmployee from './editEmployee.vue'

  export default {
    components: { editEmployee },
    data: () => ({
      headers: [
        { title: 'Código', value: 'code', align: 'end' },
        { title: 'Cédula', value: 'document', align: 'end' },
        { title: 'Nombre', value: 'name' },
        { title: 'Email', value: 'email' },
        { title: 'Cargo', value: 'position', align: 'end' },
        { title: 'Departamento', value: 'department.name', align: 'end' },
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      items: [
        {
          id: '1',
          name: 'Pedro Perez',
          code: '3085',
          document: '30580722',
          position: 'Operador',
          email: 'pedro@mail.com',
          department: {
            name: 'Operaciones',
            manager: 'Jose Luis'
          }
        },
        {
          id: '2',
          name: 'Ramon Valdez',
          code: '3145',
          document: '40580721',
          position: 'Operador',
          email: 'pedro@mail.com',
          department: {
            name: 'Operaciones',
            manager: 'Jose Luis'
          }
        },
        {
          id: '3',
          name: 'Juan Gonzalez',
          code: '3128',
          document: '50580718',
          position: 'Operador',
          email: 'pedro@mail.com',
          department: {
            name: 'Operaciones',
            manager: 'Jose Luis'
          }
        },
        {
          id: '4',
          name: 'Carlos Gomez',
          code: '3228',
          document: '70580780',
          position: 'Auxiliar de Mantenimiento',
          email: 'pedro@mail.com',
          department: {
            name: 'Mantenimiento',
            manager: 'Ricardo Mora'
          }
        }
      ],
      editEmployeeDialog: false,
      editingEmployee: null
    }),
    methods: {
      addEmployee () {
        this.editEmployeeDialog = true
      },
      editEmployee (id) {
        console.log('Id => ', id)
        this.editingEmployee = this.items.find(employee => employee.id === id)
        this.editEmployeeDialog = true
      },
      removeEmployee (id) {
        const employeeIndex = this.items.findIndex(employee => employee.id === id)
        this.items.splice(employeeIndex, 1)
      }
    }
  }
</script>
