<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-1" text @click="$emit('cancel')">Cancelar</v-btn>
        <v-btn color="red" text @click="$emit('delete')">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Eliminar' },
    text: { type: String, default: '¿Estas seguro que deseas eliminar este registro?' },
    value: { type: Boolean, default: false }
  },
  data: () => ({
    dialog: false
  }),
  watch: {
    dialog () {
      this.$emit('input', this.dialog)
    },
    value () {
      this.dialog = this.value
    }
  }
}
</script>

<style>

</style>