<template>
  <v-card class="mx-auto" width="500" elevation="12">
    <v-card-title class="text-center">
      Ingreso de Usuario
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" class="pa-6">
        <v-autocomplete
          v-model="user.employee"
          :items="employeeItems"
          label="Empleado"
          variant="outlined"
          item-title="name"
          return-object
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item.raw.name"
              :subtitle="item.raw.code + '. ' + item.raw.position"
            ></v-list-item>
          </template>
        </v-autocomplete>

        <v-text-field
          v-model="user.name"
          :rules="nameRules"
          label="Nombre y apellido"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="Email"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="passwordRules"
          label="Contraseña"
          variant="outlined"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-text-field
          v-model="password2"
          :rules="passwordRules"
          label="Repita la contraseña"
          variant="outlined"
          :type="showPassword2 ? 'text' : 'password'"
          :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword2 = !showPassword2"
        ></v-text-field>

        <v-btn class="mt-2" block color="success" @click="updateUser">Enviar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      userForUpdate: Object
    },
    data: () => ({
      employeeItems: [
        /* {
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
        } */
      ],
      user: {
        employee: '',
        name: '',
        code: '',
        email: '',
        password: '',
        employeeId: null
      },
      showPassword: false,
      showPassword2: false,
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
      if (this.userForUpdate) {
        this.user = this.userForUpdate
      }
      this.getEmployees()
    },
    methods: {
      async getEmployees () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/employees')
          console.log(response)
          if (response && response.data) {
            response.data.map(employee => {
              this.employeeItems.push({
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
      async updateUser () {
        if (!this.userForUpdate) {
          try {
            const response = await axios.post('http://localhost:3000/api/v1/user', this.user)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
          
        } else {
          try {
            const response = await axios.put(`http://localhost:3000/api/v1/user/${this.userForUpdate._id}`, this.user)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }
</script>
