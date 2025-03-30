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
              Vehículos
            </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ingresar Nuevo Vehículo"
              border
              @click="addVehicle()"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.vehicle`]="{ item }">
          <td>
            {{ `${item.brand} ${item.model} ${item.year} ${item.color}` }}
          </td>
        </template>
        <template v-slot:[`item.photo`]="{ item }">
          <td>
            <v-avatar>
              <v-img :src="item.photo">
              </v-img>
            </v-avatar>
          </td>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editVehicle(item.id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="removeVehicle(item.id)"></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editVehicleDialog" max-width="500">
    <edit-vehicle :vehicle="editingVehicle"></edit-vehicle>
  </v-dialog>
</template>

<script>
  import editVehicle from './editVehicle.vue'

  export default {
    components: { editVehicle },
    data: () => ({
      headers: [
        { title: 'Foto', value: 'photo', align: 'start' },
        { title: 'Placas', value: 'licensePlate', align: 'start' },
        { title: 'Vehículo', value: 'vehicle' },
        { title: 'Empleado', value: 'employee.name' },
        { title: 'Cargo', value: 'employee.position', align: 'start' },
        { title: 'Departamento', value: 'employee.department.name', align: 'center' },
        { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
      ],
      items: [
        {
          id: '1',
          vehicleType: 'Carro',          
          brand:'Mazda',
          model:'323 HS',
          year:'2025',
          color:'Rojo Metalizado',
          comment:'En perfecto estado',
          licensePlate: 'RLY980',
          photo: 'https://i.postimg.cc/Gpc5tkwh/20211111-MAZDA-323-MAS-ANTIGUO-EN-COLOMBIA-1981-01.webp',
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
          vehicleType: 'Carro',
          brand:'Honda',
          model:'Civic',
          year:'2021',
          color:'Gris Oscuro',
          comment:'Como nuevo',
          licensePlate: 'HGF350',
          photo: 'https://i.postimg.cc/hjFhVbgT/Honda-Civic-2025-accion-2.jpg',
          employee: {
            id: '1',
            name: 'Juan Gomez',
            code: '3678',
            position: 'Operador',
            department: {
              name: 'Operaciones',
              manager: 'Jose Luis'
            }
          }
        },
        {
          id: '3',
          vehicleType: 'Moto',
          brand:'Honda',
          model:'XRL300',
          year:'2023',
          color:'Negro',
          comment:'Le falta un espejo',
          licensePlate: 'RLY54G',
          photo: 'https://i.postimg.cc/W12GkVST/D-Q-NP-2-X-722700-MCO83179186425-032025-T.webp',
          employee: {
            id: '1',
            name: 'Vladimir Rueda',
            code: '1258',
            position: 'Operador',
            department: {
              name: 'Operaciones',
              manager: 'Jose Luis'
            }
          }
        },
        {
          id: '4',
          vehicleType: 'Carro',
          brand:'Fiat',
          model:'Idea HLX',
          year:'2011',
          color:'Plateado',
          comment:'Pintura en regular estado, Poco espacion en baúl',
          licensePlate: 'EKP285',
          photo: 'https://i.postimg.cc/FRjzpdsq/Fiat-Idea-2011-Side-Profile-46e69e47.jpg',
          employee: {
            id: '1',
            name: 'Carlos Ortiz',
            code: '3015',
            position: 'Operador',
            department: {
              name: 'Operaciones',
              manager: 'Jose Luis'
            }
          }
        }
      ],
      editVehicleDialog: false,
      editingVehicle: null
    }),
    methods: {
      addVehicle () {
        this.editVehicleDialog = true
      },
      editVehicle (id) {
        this.editingVehicle = this.items.find(vehicle => vehicle.id === id)
        this.editVehicleDialog = true
      },
      removeVehicle (id) {
        const vehicleIndex = this.items.findIndex(vehicle => vehicle.id === id)
        this.items.splice(vehicleIndex, 1)
      }
    }
  }
</script>
