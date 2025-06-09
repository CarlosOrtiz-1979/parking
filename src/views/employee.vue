<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="employees"
        item-key="_id"
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
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editEmployee(item._id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="deleteEmployee(item._id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editEmployeeDialog" max-width="500">
    <edit-employee :employee-for-update="editingEmployee" @close="closeEditDialog"></edit-employee>
  </v-dialog>

  <delete-dialog
    v-model="deleteEmployeeDialog"
    @delete="removeEmployee()"
    @cancel="closeDeleteDialog"
  />
</template>

<script>
  import axios from 'axios'
  import editEmployee from './editEmployee.vue'
  import deleteDialog from '@/components/deleteDialog.vue'

  export default {
    components: { editEmployee, deleteDialog },
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
      employees: [
        /* {
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
        } */
      ],
      editEmployeeDialog: false,
      editingEmployee: null,
      deleteEmployeeDialog: false,
      deleteEmployeeId: null
    }),
    mounted () {
      this.getEmployees()
    },
    methods: {
      async getEmployees () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/employees')
          console.log(response)
          if (response && response.data) {
            response.data.map(employee => {
              this.employees.push({
                department: employee.departmentId,
                departmentId: employee.departmentId._id,
                ...employee
              })
            })
          } else {
            console.log('Error al obtener los usuarios')
          }
        } catch (error) {
          console.log(error)
        }
      },
      addEmployee () {
        this.editingEmployee = null
        this.editEmployeeDialog = true
      },
      editEmployee (id) {
        this.editingEmployee = this.employees.find(employee => employee._id === id)
        this.editEmployeeDialog = true
      },
      deleteEmployee (id) {
        this.deleteEmployeeDialog = true
        this.deleteEmployeeId = id
      },
      async removeEmployee () {
        try {
          const response = await axios.delete(`http://localhost:3000/api/v1/employee/${this.deleteEmployeeId}`)

          if (response && response.data) {
            console.log('Usuario eliminado', response.data)
            const employeeIndex = this.employees.findIndex(employee => employee._id === this.deleteEmployeeId)
            this.employees.splice(employeeIndex, 1)
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
        this.editEmployeeDialog = false
        this.editingEmployee = null
        if (data) {
          this.employees.push(data)
        }
      },
      closeDeleteDialog () {
        this.deleteEmployeeDialog = false
        this.editingEmployee = null
      }
    }
  }
</script>
