<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6" width="400" elevation="10">
      <v-card-title class="text-center text-h5 font-weight-bold">
        Iniciar Sesión
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Correo Electrónico"
            type="email"
            :rules="emailRules"
            prepend-inner-icon="mdi-email"
            required
          />
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="passwordRules"
            prepend-inner-icon="mdi-lock"
            required
          />
          <v-btn block color="primary" :disabled="!valid" type="submit" class="mt-3">
            Iniciar Sesión
          </v-btn>
        </v-form>
        <v-btn variant="text" class="mt-2" block @click="forgotPassword">
          ¿Olvidaste tu contraseña?
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const valid = ref(false);
const form = ref(null);

const emailRules = [
  v => !!v || 'El correo es requerido',
  v => /.+@.+\..+/.test(v) || 'Ingrese un correo válido',
];

const passwordRules = [
  v => !!v || 'La contraseña es requerida',
  v => v.length >= 6 || 'Mínimo 6 caracteres',
];

const login = () => {
  if (form.value.validate()) {
    alert('Iniciando sesión...');
  }
};

const forgotPassword = () => {
  alert('Redirigir a recuperación de contraseña');
};
</script>
