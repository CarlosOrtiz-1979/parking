<template>
  <v-card class="mx-auto" width="500" elevation="12">
    <v-card-title class="text-center">
      Ingreso de Empleado
    </v-card-title>
    <v-card-text>
      <v-form fast-fail validate-on="blur" @submit.prevent class="pa-6">
        <v-text-field
          v-model="code"
          label="Código del empleado"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nombres y apellidos"
          variant="outlined"
        ></v-text-field>

        <v-autocomplete
          v-model="position"
          :items="positionItems"
          label="Cargo"
          variant="outlined"
        ></v-autocomplete>

        <v-autocomplete
          v-model="department"
          :items="departmentItems"
          label="Departamento"
          variant="outlined"
          item-title="name"
          item-value="id"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item.raw.name"
              :subtitle="'Líder: ' + item.raw.manager"
            ></v-list-item>
          </template>
        </v-autocomplete>

        <v-btn class="mt-2" type="submit" block color="success">
          Enviar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      code: '',
      department: null,
      departmentItems: [
        {
          id: '1',
          name: 'Operaciones',
          manager: 'Jose Luis'
        },
        {
          id: '2',
          name: 'Mantenimiento',
          manager: 'Ricardo Mora'
        },
        {
          id: '3',
          name: 'Seguridad',
          manager: 'Yesid Arena'
        }
      ],
      name: '',
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
      position: '',
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
  }
</script>
