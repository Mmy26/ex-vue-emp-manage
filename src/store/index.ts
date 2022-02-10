import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "@/types/employee";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // 従業員の人数
    totalEmployeeCount: 0,
    // 従業員一覧
    employees: new Array<Employee>(),
  }, // end state
  actions: {
    /**
     * 従業員一覧情報をWebAPIから取得してmutationを呼び出す.
     *
     * @param context - コンテキスト
     */
    async getEmployeeList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ex-emp-api/employee/employees"
      );
      console.dir("response:" + JSON.stringify(response));

      const payload = response.data;
      // contextオブジェクトのcommitメソッドを使用し、データが入っているpayload変数を渡す
      context.commit("showEmployeeList", payload);
    },
  }, // end actions
  mutations: {
    /**
     * 従業員一覧情報を作成してstateに格納する.
     *
     * @param state - ステート
     * @param payload - WebAPIから取得した従業員情報(JSON)
     */
    showEmployeeList(state, payload) {
      // payloadの中のtotalCountをstateのtotalCountの代入
      state.totalEmployeeCount = payload.totalEmployeeCount;
      state.employees = new Array<Employee>();
      // payload内のemployeesをfor...of文で回して都度Employeeオブジェクトを作成し、stateのemployeesにpush
      for (const employee of payload.employees) {
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        );
      }
    },
  }, // end mutations
  getters: {
    /**
     * 従業員数を返す.
     *
     * @param state - ステート
     * @returns 従業員数
     */
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },
    /**
     * 従業員一覧を返す.
     *
     * @param state - ステート
     * @returns 従業員一覧
     */
    getEmployees(state) {
      return state.employees;
    },
    /**
     * IDから従業員を検索し返す.
     *
     * @param state - ステート
     * @returns 従業員情報
     */
    getEmployeeById(state) {
      return (id: number) => {
        const newEmployees = state.employees.filter(
          (employee) => employee.id === id
        );
        return newEmployees[0];
      };
    },
  }, // end getters
  modules: {}, // end modules
});
