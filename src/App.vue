<template>
  <v-app>
    <v-container>
      <v-form ref="form" @submit.prevent>
        <!-- RuleGroup Component -->
        <rule-group
          :options="options"
          :isFirstRuleGroup="true"
          ref="ruleGroup"
        />

        <div class="d-flex justify-end ga-4 w-100 mt-4 flex-wrap">
          <v-btn
            size="small"
            color="error"
            @click.prevent="resetRules"
            variant="outlined"
            >Reset Rules</v-btn
          >
          <v-btn
            size="small"
            color="success"
            @click.prevent="submitFilter"
            variant="outlined"
            type="submit"
            >Submit Rules</v-btn
          >
        </div>
      </v-form>
    </v-container>
    <v-snackbar v-model="formSubmissionSucceeded" color="success" timeout="2500"
      >Form submission succeeded</v-snackbar
    >
    <v-snackbar v-model="formSubmissionFailed" color="error" timeout="2500"
      >Form submission failed</v-snackbar
    >
  </v-app>
</template>

<script>
import RuleGroup from "./RuleGroup.vue";

export default {
  components: {
    RuleGroup,
  },
  data() {
    return {
      formSubmissionSucceeded: false,
      formSubmissionFailed: false,
      options: {
        types: [
          { label: "Type 1", value: "type-1" },
          { label: "Type 2", value: "type-2" },
          { label: "Type 3", value: "type-3" },
        ],
        conditions: [
          { label: "More", value: ">" },
          { label: "Equal", value: "=" },
          { label: "Less", value: "<" },
          { label: "Is In", value: "isin" },
        ],
      },
    };
  },
  methods: {
    resetRules() {
      this.$refs.ruleGroup.resetConditions();
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    async submitFilter() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          const formData = this.$refs.ruleGroup.getData();
          // send data to node-red
          this.send(formData);
          this.resetRules();
          this.formSubmissionSucceeded = true;
        } catch (error) {
          this.formSubmissionFailed = true;
          console.error(error);
        }
      }
    },
  },
};
</script>
