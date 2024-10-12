<template>
  <v-card class="mb-3" variant="outlined">
    <v-card-text>
      <v-row>
        <v-col class="d-flex justify-space-between w-100">
          <div class="d-flex ga-4 align-center flex-wrap">
            <p class="text-body-1 font-weight-medium">Rule Group</p>
            <v-btn-toggle
              variant="outlined"
              color="primary"
              density="compact"
              v-model="condition"
            >
              <v-btn size="small">And</v-btn>
              <v-btn size="small">Or</v-btn>
            </v-btn-toggle>
          </div>
          <v-btn
            variant="flat"
            size="small"
            icon="mdi-delete"
            v-if="!isFirstRuleGroup"
            @click.prevent="deleteSelf"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex ga-4 flex-wrap">
          <v-btn
            prepend-icon="mdi-plus"
            color="secondary"
            variant="outlined"
            size="small"
            @click.prevent="addRuleGroup"
            >Rule Group</v-btn
          >
          <v-btn
            prepend-icon="mdi-plus"
            color="primary"
            variant="outlined"
            size="small"
            @click.prevent="addCondition"
            >Condition</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>

    <!-- Conditions -->
    <v-card-text v-for="condition in conditions" :key="condition.id">
      <condition
        :options="options"
        @delete-condition="deleteCondition(condition.id)"
        :ref="'condition_' + condition.id"
      />
    </v-card-text>

    <!-- Nested Rule Groups -->
    <v-card-text v-for="group in ruleGroups" :key="group.id">
      <rule-group
        :options="options"
        @delete-rule-group="deleteRuleGroup(group.id)"
        :ref="'ruleGroup_' + group.id"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Condition from "./Condition.vue";
// import RuleGroup from "./RuleGroup.vue";

export default {
  components: { Condition },
  props: {
    options: { type: Object, required: true },
    isFirstRuleGroup: { type: Boolean, default: false },
  },
  data() {
    return {
      condition: 0, // And/Or toggle
      ruleGroups: [], // List of nested rule groups
      conditions: [], // List of conditions
    };
  },
  methods: {
    addRuleGroup() {
      this.ruleGroups.push({ id: crypto.randomUUID() });
    },
    deleteRuleGroup(ruleGroupId) {
      this.ruleGroups = this.ruleGroups.filter(
        (group) => group.id !== ruleGroupId
      );
    },
    addCondition() {
      this.conditions.push({ id: crypto.randomUUID() });
    },
    deleteCondition(conditionId) {
      this.conditions = this.conditions.filter(
        (condition) => condition.id !== conditionId
      );
    },
    deleteSelf() {
      this.$emit("delete-rule-group");
    },
    getData() {
      return {
        condition: this.condition === 0 ? "and" : "or",
        ruleGroups:
          this.ruleGroups.length !== 0
            ? this.ruleGroups.map((group) =>
                this.$refs[`ruleGroup_${group.id}`][0].getData()
              )
            : [],
        conditions:
          this.conditions.length !== 0
            ? this.conditions.map((condition) =>
                this.$refs[`condition_${condition.id}`][0].getData()
              )
            : [],
      };
    },
    resetConditions() {
      this.condition = 0; // Reset condition to AND (0)
      this.ruleGroups = []; // Reset nested rule groups
      this.conditions = []; // Reset conditions
    },
  },
};
</script>
