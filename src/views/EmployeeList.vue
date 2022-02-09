<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";
@Component
export default class EmployeeList extends Vue {
  /**
   * Vuexストアのアクション経由で非同期でWebAPIから従業員一覧を取得する.
   */
  created(): void {
    this.$store.dispatch("getEmployeeList", {});
  }
  /**
   * 非同期で取得したVuexストア内の従業員数を取得し返す
   */
  get employeeCount(): number {
    return this.$store.getters.getEmployeeCount;
  }
  /**
   * 非同期で取得したVuexストア内の従業員一覧を取得し返す
   */
  get employees(): Array<Employee> {
    return this.$store.getters.getEmployees;
  }
}
</script>

<style scoped></style>
