<template>
  <v-card class="mx-auto" width="500" elevation="12">
    <v-card-title class="text-center">
      Ingreso de Permisos
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" @submit.prevent class="pa-6">
        
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nombre"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="description"          
          label="Descripción"
          variant="outlined"
        ></v-text-field>       

        <v-btn class="mt-2" type="submit" block color="success">
          Enviar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      permission: Object
    },
    data: () => ({
      description: '',
            
      name: '',
      nameRules: [
        value => {
          if (value?.length >= 5) return true

          return 'El nombre debe tener mínimo 5 caracteres.'
        },
      ],     
      
    }),
    mounted () {
      if (this.permission) {
        this.id = this.permission.id        
        this.name = this.permission.name
        this.description = this.permission.description        
      }
    }
  }
</script>
