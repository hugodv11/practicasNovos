import axios from 'axios'
import {NewParteRequest} from "@/features/Partes/models/partes.ts"

export default {
    async AddParte(request: NewParteRequest){
        await axios.post('/Partes', request)
        .then((response) => {
            console.log(response);
            return true;
        }, (error) => {
            console.log(error);
            return false;
        });
    },

}//end export default 