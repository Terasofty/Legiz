import { createStore } from "vuex";
import auth from "./modules/auth.module";
import customer from "./modules/customer.module";
import lawyer from "./modules/lawyer.module";
import legalAdvice from "./modules/legal-advice.module";

export default createStore({
  modules: {
    auth,
    customer,
    lawyer,
    legalAdvice,
  },
});
