<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="tickets"
        item-key="id"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon color="medium-emphasis" icon="mdi-account-group" size="large" start></v-icon>
              Historial de Tickets
            </v-toolbar-title>

            <!-- <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ingresar Nuevo Rol"
              border
              @click="addTicket()"
            ></v-btn> -->
          </v-toolbar>
        </template>
        <!-- <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editTicket(item._id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="deleteTicket(item._id)"></v-icon>
          </div>
        </template> -->
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      headers: [
        { title: 'Entrada', value: 'checkIn' },
        { title: 'Vehiculo', value: 'vehicleId.licensePlate' },
        { title: 'Propietario', value: 'employeeId.name' },
        /* { title: 'Acciones', key: 'actions', align: 'end', sortable: false }, */
      ],
      tickets: [],
      editTicketDialog: false,
      editingTicket: null,
      deleteTicketDialog: false,
    }),
    async mounted () {
      await this.getTickets()
    },
    methods: {
      async getTickets () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/tickets')
          if (response && response.data) {
            console.log('Tickets obtenidos correctamente', response.data)
            this.tickets = response.data
          } else {
            console.log('Error al obtener los usuarios')
          }
        } catch (error) {
          console.log(error)
        }
      },
    }
  }
</script>
