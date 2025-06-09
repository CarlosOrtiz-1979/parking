<template>
  <v-card class="mx-auto" width="500" elevation="12">
    <v-card-title class="text-center">
      Ingreso de Empleado
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" class="pa-6">
        <v-text-field
          v-model="employee.code"
          label="Código del empleado"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="employee.document"
          label="Cédula del empleado"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="employee.name"
          :rules="nameRules"
          label="Nombres y apellidos"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="employee.email"
          :rules="emailRules"
          label="Email"
          variant="outlined"
        ></v-text-field>

        <v-autocomplete
          v-model="employee.position"
          :items="positionItems"
          label="Cargo"
          variant="outlined"
        ></v-autocomplete>

        <v-autocomplete
          v-model="employee.departmentId"
          :items="departmentItems"
          label="Departamento"
          variant="outlined"
          item-title="name"
          item-value="_id"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item.raw.name"
              :subtitle="'Líder: ' + item.raw.manager"
            ></v-list-item>
          </template>
        </v-autocomplete>

        <v-btn class="mt-2" block color="success" @click="updateEmployee">
          Enviar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      employeeForUpdate: Object
    },
    data: () => ({
      employee: {
        name: '',
        email: '',
        code: '',
        document: '',
        department: null,
        position: '',
        departmentId: null
      },
      departmentItems: [],
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
      positionItems: [
        'Operador',
        'Auxiliar SST',
        'Auxiliar de RRHH',
        'Auxiliar de Nómina',
        'Vigilante',
        'Coordinador de Seguridad',
        'Líder de Seguridad',
        'Analista de Seguridad',
        'Agente Control Pérdidas',
        'Observador de Seguridad',
        'Líder RRHH',
        'Líder de SST'
      ]
    }),
    mounted () {
      if (this.employeeForUpdate) {
        this.employee = this.employeeForUpdate
      }
      this.getDepartments()
    },
    methods: {
      async getDepartments () {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/departments')
          if (response && response.data) {
            this.departmentItems = response.data
          } else {
            console.log('Error al obtener los usuarios')
          }
        } catch (error) {
          console.log(error)
        }
      },
      async updateEmployee () {
        if (!this.employeeForUpdate) {
          try {
            const response = await axios.post('http://localhost:3000/api/v1/employee', this.employee)
            response.data = {
              departmentId: response.data.departmentId._id,
              department: response.data.departmentId,
              ...response.data
            }
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
          
        } else {
          try {
            const response = await axios.put(`http://localhost:3000/api/v1/employee/${this.employeeForUpdate._id}`, this.employee)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }
</script>
