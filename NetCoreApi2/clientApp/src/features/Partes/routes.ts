import { Options } from "vue-class-component";
import PartesCalendar from "@/components/partesCalendar/index.vue";

Options({})
export default {
    routes:
        {
            path: "calendar",
            name: "PartesCalendar",
            component: PartesCalendar,
        },
}//export default