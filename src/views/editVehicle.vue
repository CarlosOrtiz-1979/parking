<template>
  <v-card class="mx-auto" width="500" elevation="12">
    <v-card-title class="text-center">
      Ingreso de Usuario
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" class="pa-6">
        <v-autocomplete
          v-model="vehicle.employee"
          :items="employees"
          label="Empleado"
          variant="outlined"
          item-title="name"
          return-object
          dense
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item.raw.name"
              :subtitle="item.raw.code + '. ' + item.raw.position"
            ></v-list-item>
          </template>
        </v-autocomplete>

        <v-autocomplete
          v-model="vehicle.vehicleType"
          :items="vehicleTypeItems"
          label="Tipo de Vehículo"
          variant="outlined"
        ></v-autocomplete>

        <v-text-field
          v-model="vehicle.licensePlate"
          :rules="nameRules"
          label="Placas"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="vehicle.brand"
          :rules="nameRules"
          label="Marca"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="vehicle.model"
          :rules="nameRules"
          label="Modelo"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="vehicle.year"
          label="Año"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="vehicle.color"
          label="Color"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="vehicle.photo"
          label="Foto URL"
          variant="outlined"
        ></v-text-field>

        <v-textarea
          v-model="vehicle.comment"
          label="Comentario"
          variant="outlined"
          rows="2"
        ></v-textarea>

        <v-btn class="mt-2" block color="success" @click="updateVehicle">Enviar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      vehicleForUpdate: Object
    },
    data: () => ({
      vehicleTypeItems: [
        'Carro',
        'Moto',
        'Bicicleta'
      ],
      /* employeeItems: [
        {
          id: '1',
          name: 'Pedro Perez',
          code: '3085',
          position: 'Operador',
          department: {
            name: 'Operaciones',
            manager: 'Jose Luis'
          }
        },
        {
          id: '2',
          name: 'Ramon Valdez',
          code: '3145',
          position: 'Operador',
          department: {
            name: 'Operaciones',
            manager: 'Jose Luis'
          }
        },
        {
          id: '3',
          name: 'Juan Gonzalez',
          code: '3128',
          position: 'Operador',
          department: {
            name: 'Operaciones',
            manager: 'Jose Luis'
          }
        },
        {
          id: '4',
          name: 'Carlos Gomez',
          code: '3228',
          position: 'Auxiliar de Mantenimiento',
          department: {
            name: 'Mantenimiento',
            manager: 'Ricardo Mora'
          }
        }
      ], */
      vehicle: {
        brand: '',
        model: '',
        year: '',
        color: '',
        comment: '',
        licensePlate: '',
        photo: '',
        vehicleType: null,
        employee: null,
        employeeId: null,
      },
      employees: [],
      nameRules: [
        value => {
          if (value?.length >= 3) return true

          return 'El nombre debe tener mínimo 3 caracteres.'
        },
      ]      
    }),
    watch: {
      'vehicle.employee': {
        handler () {
          this.vehicle.employeeId = this.vehicle.employee?._id
        },
        deep: true
      }
    },
    mounted () {
      if (this.vehicleForUpdate) {
        this.vehicle = this.vehicleForUpdate
      }
      this.getEmployees()
    },
    methods: {
      async getEmployees () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/employees')
          console.log(response)
          if (response && response.data) {
            this.employees = response.data
          } else {
            console.log('Error al obtener los usuarios')
          }
        } catch (error) {
          console.log(error)
        }
      },
      async updateVehicle () {
        if (!this.vehicleForUpdate) {
          try {
            const response = await axios.post('http://localhost:3000/api/v1/vehicle', this.vehicle)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
          
        } else {
          try {
            const response = await axios.put(`http://localhost:3000/api/v1/vehicle/${this.vehicleForUpdate._id}`, this.vehicle)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }
</script>
