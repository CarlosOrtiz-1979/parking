<template>
  <v-card class="mx-auto" width="800" elevation="12">
    <v-card-title class="text-center">
      Nuevo Ticket
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" @submit.prevent class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-radio-group
              v-model="typeVisitor"
              inline
            >
              <v-radio
                label="Empleado"
                value="employee"
              ></v-radio>
              <v-radio
                label="Visitante"
                value="visitor"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col v-if="typeVisitor === 'employee'">
            <v-select
              v-model="ticket.typeDocument"
              :items="items"
              label="Código/Documento"
              variant="outlined"
              item-value="_id"
              item-title="name"
            ></v-select>
          </v-col>
          <v-col v-if="ticket.typeDocument">
            <v-text-field
              v-model="ticket.document"
              :label="items[Number(ticket.typeDocument)].name"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        

        <v-row v-if="typeVisitor === 'visitor'">
          <v-col cols="4">
            <v-text-field
              v-model="ticket.visitor.document"
              label="Cédula"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="ticket.visitor.name"
              :rules="nameRules"
              label="Nombres y apellidos"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="ticket.visitor.phone"
              :rules="emailRules"
              label="Teléfono"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-autocomplete
              v-model="ticket.visitor.vehicleType"
              :items="vehicleTypeItems"
              label="Tipo de Vehículo"
              variant="outlined"
            ></v-autocomplete>
          </v-col>

          <v-col cols="6" v-if="ticket.visitor.vehicleType === 'Bicicleta'">
          </v-col>

          <v-col v-else cols="6">
            <v-text-field
              v-model="ticket.visitor.licensePlate"
              :rules="nameRules"
              label="Placas"
              variant="outlined"
            ></v-text-field>
          </v-col>
        
          <v-col cols="4">
            <v-text-field
              v-model="ticket.visitor.brand"
              :rules="nameRules"
              label="Marca"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="ticket.visitor.model"
              :rules="nameRules"
              label="Modelo"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="ticket.visitor.color"
              label="Color"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="ticket.visitor.photo"
              label="Foto URL"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="ticket.visitor.comment"
              label="Comentario"
              variant="outlined"
              rows="2"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      { _id: '0', name: 'Código' },
      { _id: '1', name: 'Placa' },
      { _id: '2', name: 'Documento' }
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
      }
    },
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
    ]
  }),
  methods: {

  }
}
</script>

<style>

</style>
