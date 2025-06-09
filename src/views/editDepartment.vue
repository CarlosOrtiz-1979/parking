<template>
  <v-card class="mx-auto" width="500" elevation="12">
    <v-card-title class="text-center">
      Ingreso de Departamento
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" class="pa-6">
        
        <v-text-field
          v-model="department.name"
          :rules="nameRules"
          label="Nombre"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="department.manager"
          :rules="nameRules"
          label="Lider"
          variant="outlined"
        ></v-text-field>       

        <v-btn class="mt-2" block color="success" @click="updateDepartment">
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
      departmentForUpdate: Object
    },
    data: () => ({
      department: {
        manager: '',      
        name: '',
      },
      nameRules: [
        value => {
          if (value?.length >= 5) return true

          return 'El nombre debe tener mínimo 5 caracteres.'
        },
      ],     
      
    }),
    mounted () {
      if (this.userForUpdate) {
        this.department = this.departmentForUpdate
      }
    },
    methods: {
      async updateDepartment () {
        if (!this.departmentForUpdate) {
          try {
            const response = await axios.post('http://localhost:3000/api/v1/department', this.department)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
          
        } else {
          try {
            const response = await axios.put(`http://localhost:3000/api/v1/department/${this.departmentForUpdate._id}`, this.department)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }
</script>
