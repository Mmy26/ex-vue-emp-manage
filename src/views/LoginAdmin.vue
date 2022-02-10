<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <div class="row login-page">
          <div class="col s12 z-depth-6 card-panel">
            <div class="error">{{ errorMessage }}</div>
            <form class="login-form">
              <div class="row"></div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">mail_outline</i>
                  <input
                    v-model="mailAddress"
                    class="validate"
                    id="mailAddress"
                    type="email"
                  />
                  <label
                    for="mailAddress"
                    data-error="wrong"
                    data-success="right"
                    >メールアドレス</label
                  >
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock_outline</i>
                  <input v-model="password" id="password" type="password" />
                  <label for="password">パスワード</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <button
                    v-on:click="loginAdmin"
                    type="button"
                    class="btn btn-register waves-effect waves-light col s12"
                  >
                    ログイン
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6 m6 l6">
                  <p class="margin medium-small">
                    <a href="registerAdmin.html">管理者登録はこちら</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class loginAdmin extends Vue {
  // 登録時のエラーメッセージ
  private errorMessage = "";
  // メールアドレス
  private mailAddress = "";
  // パスワード
  private password = "";

  /**
   * ログインをする.
   *
   * @returns Promiseオブジェクト
   */
  async loginAdmin(): Promise<void> {
    const response = await axios.post(
      "http://153.127.48.168:8080/ex-emp-api/login",
      {
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );

    if (response.data.status === "success") {
      this.$router.push("/employeeList");
    } else {
      console.log(response);
      this.errorMessage = "ログインに失敗しました";
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 600px;
}
</style>
