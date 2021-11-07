<script>
import { mapActions } from "vuex";
export default {
  name: "LogOut",
  created() {
    this.destroyToken();
  },
  methods: {
    ...mapActions(["destroyToken"]),
  },
};
</script>
