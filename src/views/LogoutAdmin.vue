<template>
  <div>ログアウト中・・・</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class logoutAdmin extends Vue {
  /**
   * ログアウトする.
   *
   * @returns Promiseオブジェクト
   */
  async created(): Promise<void> {
    await axios.get("http://153.127.48.168:8080/ex-emp-api/logout");
    this.$router.push("/loginAdmin");
  }
}
</script>

<style scoped></style>
