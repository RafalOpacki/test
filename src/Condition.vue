<template>
  <v-row class="d-flex flex-wrap align-top">
    <v-col>
      <v-select
        min-width="100"
        density="compact"
        variant="outlined"
        v-model="type"
        :items="options.types"
        label="Type*"
        item-title="label"
        item-value="value"
        :rules="validator.typeValidator"
        validate-on="blur"
      />
    </v-col>
    <v-col
      ><v-select
        min-width="100"
        density="compact"
        variant="outlined"
        v-model="condition"
        :items="options.conditions"
        label="Condition*"
        item-title="label"
        item-value="value"
        :rules="validator.conditionValidator"
        validate-on="blur"
    /></v-col>
    <v-col
      ><v-text-field
        min-width="100"
        density="compact"
        variant="outlined"
        v-model="value"
        label="Value*"
        :rules="validator.valueValidator"
        validate-on="blur"
      />
    </v-col>
    <v-col class="d-flex justify-end" cols="2" md="1">
      <v-btn
        variant="flat"
        size="small"
        icon="mdi-delete"
        @click.prevent="deleteSelf"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Condition",
  props: {
    options: { type: Object, required: true },
  },
  data() {
    return {
      validator: {
        typeValidator: [(value) => !!value || "Type is required"],
        conditionValidator: [(value) => !!value || "Condition is required"],
        valueValidator: [(value) => !!value || "Value is required"],
      },
      type: null,
      condition: null,
      value: "",
    };
  },
  methods: {
    deleteSelf() {
      this.$emit("delete-condition");
    },
    getData() {
      return {
        type: this.type,
        condition: this.condition,
        value: this.value,
      };
    },
  },
};
</script>
