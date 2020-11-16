import { Options, Vue } from "vue-class-component";
import Store from "@/store/index.ts";

Options({})
export default class Login extends Vue{

    public username = "";
    public password = "";

    async login(){
        const payload = {username: this.username, password: this.password}
        console.log(payload);
        Store.dispatch('AUTH_REQUEST', payload).then(() =>{
            this.$router.push('/')
        })
    }

    created(){
        this.username = "Me cago en dios";
    }
}