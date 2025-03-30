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
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editDepartment(item.id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="removeDepartment(item.id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editDepartmentDialog" max-width="500">
    <edit-department :department="editingDepartment"></edit-department>
  </v-dialog>
</template>

<script>
  import editDepartment from './editDepartment.vue'

  export default {
    components: { editDepartment },
    data: () => ({
      headers: [
        { title: 'id', value: 'id', align: 'end' },
        { title: 'Nombre', value: 'name' },
        { title: 'Lider', value: 'manager' },        
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      items: [
        {
          id: '1',
          name: 'Operaciones',
          manager: 'Jose Luis',          
        },
        {
          id: '2',
          name: 'Operaciones',
          manager: 'Jose Luis'
        },
        {
          id: '3',
          name: 'Operaciones',
          manager: 'Jose Luis'
        },
        {
          id: '4',
          name: 'Mantenimiento',
          manager: 'Ricardo Mora'
        }
      ],
      editDepartmentDialog: false,
      editingDepartment: null
    }),
    methods: {
      addDepartment () {
        this.editDepartmentDialog = true
      },
      editDepartment (id) {
        console.log('Id => ', id)
        this.editingDepartment = this.items.find(department => department.id === id)
        this.editDepartmentDialog = true
      },
      removeDepartment (id) {
        const departmentIndex = this.items.findIndex(department => department.id === id)
        this.items.splice(departmentIndex, 1)
      }
    }
  }
</script>
