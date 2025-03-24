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
          v-model="name"
          :rules="nameRules"
          label="Nombre y apellido"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
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

        <v-btn class="mt-2" type="submit" block color="success">Enviar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      user: Object
    },
    data: () => ({
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
      name: '',
      showPassword: false,
      showPassword2: false,
      nameRules: [
        value => {
          if (value?.length >= 5) return true

          return 'El nombre debe tener mínimo 5 caracteres.'
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
      if (this.user) {
        this.name = this.user.name
        this.email = this.user.email
        this.employee = this.user.employee.code
      }
    }
  }
</script>
