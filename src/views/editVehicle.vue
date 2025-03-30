<template>
  <v-card class="mx-auto" width="500" elevation="12">
    <v-card-title class="text-center">
      Ingreso de Usuario
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" @submit.prevent class="pa-6">
        <v-autocomplete
          v-model="employee"
          :items="employeeItems"
          label="Empleado"
          variant="outlined"
          item-title="name"
          item-value="code"
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
          v-model="vehicleType"
          :items="vehicleTypeItems"
          label="Tipo de Vehículo"
          variant="outlined"
        ></v-autocomplete>

        <v-text-field
          v-model="licensePlate"
          :rules="nameRules"
          label="Placas"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="brand"
          :rules="nameRules"
          label="Marca"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="model"
          :rules="nameRules"
          label="Modelo"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="year"
          label="Año"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="color"
          label="Color"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="photo"
          label="Foto URL"
          variant="outlined"
        ></v-text-field>

        <v-textarea
          v-model="comment"
          label="Comentario"
          variant="outlined"
          rows="2"
        ></v-textarea>

        <v-btn class="mt-2" type="submit" block color="success">Enviar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      vehicle: Object
    },
    data: () => ({
      vehicleType: null,
      vehicleTypeItems: [
        'Carro',
        'Moto',
        'Bicicleta'
      ],
      employee: null,
      employeeItems: [
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
      ],
      brand: '',
      model: '',
      year: '',
      color: '',
      comment: '',
      licensePlate: '',
      photo: '',
      showPassword: false,
      showPassword2: false,
      nameRules: [
        value => {
          if (value?.length >= 3) return true

          return 'El nombre debe tener mínimo 3 caracteres.'
        },
      ],
      email: '',
      emailRules: [
        value => {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

          return 'Debe ser un email válido.'
        },
      ],
      password: '',
      password2: '',
      passwordRules: [
        value => {
          if (value?.length >= 6) {
            /* if (password === password2) {
              return true
            } else {
              return 'Las contraseñas no coinciden.'
            } */
          } else {
            return 'El password debe tener mínimo 6 caracteres.'
          }
        }
      ]
    }),
    mounted () {
      if (this.vehicle) {
        this.id = this.vehicle.id
        this.name = this.vehicle.name
        this.email = this.vehicle.email
        this.employee = this.vehicle.employee.code
      }
    }
  }
</script>
