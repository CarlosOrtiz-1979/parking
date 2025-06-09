<template>
  <v-card class="mx-auto" width="500" elevation="12">
    <v-card-title class="text-center">
      Ingreso de Roles
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" class="pa-6">
        
        <v-text-field
          v-model="role.name"
          :rules="nameRules"
          label="Nombre"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="role.description"          
          label="Descripción"
          variant="outlined"
        ></v-text-field>       

        <v-btn class="mt-2" block color="success" @click="updateRole">
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
      roleForUpdate: Object
    },
    data: () => ({
      role: {
        description: '',
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
      if (this.roleForUpdate) {
        this.role = this.roleForUpdate
      }
    },
    methods: {
      async updateRole () {
        if (!this.roleForUpdate) {
          try {
            const response = await axios.post('http://localhost:3000/api/v1/role', this.role)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
          
        } else {
          try {
            const response = await axios.put(`http://localhost:3000/api/v1/role/${this.roleForUpdate._id}`, this.role)
            this.$emit('close', response.data)
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }
</script>
