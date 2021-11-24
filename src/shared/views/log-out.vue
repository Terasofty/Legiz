<script>
import { useStore } from "vuex";

export default {
  name: "log-out",
  setup() {
    const store = useStore();
    store.dispatch("auth/logout");
  },
};
</script>
