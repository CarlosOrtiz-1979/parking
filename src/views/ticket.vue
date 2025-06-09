<template>
  <v-card class="mx-auto" width="800" elevation="12">
    <v-card-title class="text-center">
      Nuevo Ticket
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" @submit.prevent class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-radio-group v-model="typeVisitor" inline>
              <v-radio label="Empleado" value="employee"></v-radio>
              <v-radio label="Visitante" value="visitor"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col v-if="typeVisitor === 'employee'">
            <v-select v-model="ticket.typeDocument" :items="documentTypeItems" label="Código/Documento"
              variant="outlined" item-value="_id" item-title="name"></v-select>
          </v-col>
          <v-col v-if="ticket.typeDocument">
            <v-row no-gutters>
              <v-text-field v-model="ticket.document" :label="documentSelected?.name" variant="outlined"></v-text-field>
              <v-btn icon text class="mt-1 ml-4" dark color="primary" @click="getEmployee">
                <v-icon color="white">mdi-file-find</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>


        <v-row v-if="typeVisitor === 'visitor'">
          <v-col cols="4">
            <v-text-field v-model="ticket.visitor.document" label="Cédula" variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="ticket.visitor.name" :rules="nameRules" label="Nombres y apellidos"
              variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="ticket.visitor.phone" :rules="emailRules" label="Teléfono"
              variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-autocomplete v-model="ticket.visitor.vehicleType" :items="vehicleTypeItems" label="Tipo de Vehículo"
              variant="outlined"></v-autocomplete>
          </v-col>

          <v-col cols="6" v-if="ticket.visitor.vehicleType === 'Bicicleta'">
          </v-col>

          <v-col v-else cols="6">
            <v-text-field v-model="ticket.visitor.licensePlate" :rules="nameRules" label="Placas"
              variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="ticket.visitor.brand" :rules="nameRules" label="Marca"
              variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="ticket.visitor.model" :rules="nameRules" label="Modelo"
              variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field v-model="ticket.visitor.color" label="Color" variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="ticket.visitor.photo" label="Foto URL" variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea v-model="ticket.visitor.comment" label="Comentario" variant="outlined" rows="2"></v-textarea>
          </v-col>
        </v-row>

        <v-row v-if="typeVisitor === 'employee' && employee">
          <v-col cols="6">
            <v-text-field v-model="employee.name" label="Nombre" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="employee.email" label="Email" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="employee.position" label="Cargo" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col v-if="ticket.typeDocument !== 'document'" cols="6">
            <v-text-field v-model="employee.document" label="Cédula" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col v-if="ticket.typeDocument !== 'code'" cols="6">
            <v-text-field v-model="employee.code" label="Código" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="ticket.vehicleId"
              :items="employeeVehicles"
              label="Vehículos"
              variant="outlined"
              item-title="licensePlate"
              item-value="_id"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item.raw.licensePlate"
                  :subtitle="`${item.raw.brand} ${item.raw.model} ${item.raw.year}`"
                  :prepend-avatar="item.raw.photo"></v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="px-5 pb-6">
      <v-btn
        block
        variant="elevated"
        color="success"
        append-icon="mdi-text-box"
        @click="createTicket"
      >
        Generar Ticket
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    documentTypeItems: [
      { _id: 'code', name: 'Código' },
      { _id: 'licensePlate', name: 'Placa' },
      { _id: 'document', name: 'Documento' }
    ],
    vehicleTypeItems: [
        'Carro',
        'Moto',
        'Bicicleta'
      ],
    typeVisitor: 'employee',
    ticket: {
      typeDocument: null,
      document: null,
      employeeId: null,
      visitor: {
        document: null,
        name: null,
        phone: null,
        vehicleType: null,
        brand: '',
        model: '',
        color: '',
        comment: '',
        licensePlate: '',
        photo: '',
      },
      vehicleId: null
    },
    employeeVehicles: [],
    nameRules: [
      value => {
        if (value?.length >= 5) return true

        return 'El nombre debe tener mínimo 5 caracteres.'
      },
    ],
    emailRules: [
      value => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        return 'Debe ser un email válido.'
      },
    ],
    employee: null,
  }),
  computed: {
    documentSelected () {
      return this.documentTypeItems.find(item => item._id === this.ticket.typeDocument)
    }
  },
  watch: {
    typeVisitor () {
      this.initTicket()
    }
  },
  methods: {
    initTicket () {
      this.ticket = {
        typeDocument: null,
        document: null,
        employeeId: null,
        visitor: {
          document: null,
          name: null,
          phone: null,
          vehicleType: null,
          brand: '',
          model: '',
          color: '',
          comment: '',
          licensePlate: '',
          photo: '',
        },
        vehicleId: null
      }
      this.employee = null
    },
    async getEmployee () {
      if (!this.documentSelected) return

      try {
        const responseEmployee = await axios.get(`http://localhost:3000/api/v1/employee/${this.documentSelected._id}/${this.ticket.document}`)

        if (responseEmployee && responseEmployee.data) {
          this.employee = responseEmployee.data
          this.ticket.employeeId = responseEmployee.data._id
          await this.getVehicles()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getVehicles () {
      if (this.employee) {
        try {
          const responseVehicles = await axios.get(`http://localhost:3000/api/v1/vehicles/employee/${this.employee._id}`)
          if (responseVehicles && responseVehicles.data) {
            this.employeeVehicles = responseVehicles.data
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async createTicket () {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/ticket', this.ticket)
        if (response && response.data) {
          console.log('Ticket generado con exito ', response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
