<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="departments"
        item-key="id"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon color="medium-emphasis" icon="mdi-account-group" size="large" start></v-icon>
              Departamentos
            </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ingresar Nuevo Departamento"
              border
              @click="addDepartment()"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editDepartment(item._id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="deleteDepartment(item._id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editDepartmentDialog" max-width="500">
    <edit-department :department="editingDepartment" @close="closeEditDialog"></edit-department>
  </v-dialog>

  <delete-dialog
    v-model="deleteDepartmentDialog"
    @delete="removeDepartment()"
    @cancel="closeDeleteDialog"
  />
</template>

<script>
  import axios from 'axios'
  import editDepartment from './editDepartment.vue'
  import deleteDialog from '@/components/deleteDialog.vue'

  export default {
    components: { editDepartment, deleteDialog },
    data: () => ({
      headers: [
        { title: 'Nombre', value: 'name' },
        { title: 'Lider', value: 'manager' },        
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      departments: [],
      editDepartmentDialog: false,
      editingDepartment: null,
      deleteDepartmentDialog: false,
      editingDepartment: null
    }),
    async mounted () {
      await this.getDepartments()
    },
    methods: {
      async getDepartments () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/departments')
          if (response && response.data) {
            this.departments = response.data
          } else {
            console.log('Error al obtener los usuarios')
          }
        } catch (error) {
          console.log(error)
        }
      },
      addDepartment () {
        this.editingDepartment = null
        this.editDepartmentDialog = true
      },
      editDepartment (id) {
        this.editingDepartment = this.departments.find(department => department._id === id)
        this.editDepartmentDialog = true
      },
      deleteDepartment (id) {
        this.deleteDepartmentDialog = true
        this.deleteDepartmentId = id
      },
      async removeDepartment () {
        try {
          const response = await axios.delete(`http://localhost:3000/api/v1/department/${this.deleteDepartmentId}`)

          if (response && response.data) {
            console.log('Usuario eliminado', response.data)
            const departmentIndex = this.departments.findIndex(department => department._id === this.deleteDepartmentId)
            this.departments.splice(departmentIndex, 1)
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
        this.editDepartmentDialog = false
        this.editingDepartment = null
        if (data) {
          this.departments.push(data)
        }
      },
      closeDeleteDialog () {
        this.deleteDepartmentDialog = false
        this.editingDepartment = null
      }
    }
  }
</script>
