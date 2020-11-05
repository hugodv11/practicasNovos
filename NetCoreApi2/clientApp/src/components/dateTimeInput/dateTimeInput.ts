import { Options, Vue } from "vue-class-component";
import { DateTime } from "luxon"
import { Prop, Watch} from "vue-property-decorator";

@Options({})
export default class DateTimeInput extends Vue{
    @Prop({ default: null }) modelValue:DateTime | null = null;

    public get inputDateTime(){
        if(this.modelValue){
            const iso = this.modelValue.toISO({
                includeOffset: false,
                suppressMilliseconds: true,
                suppressSeconds: true,   
            });   
            return iso;
        }
        return "";
    }

    async emitDate(event:any){
        this.$emit('update:modelValue', DateTime.fromISO(event.target.value));
    }
    
}//end class newDateTime