import { Options, Vue } from "vue-class-component";
import {TrabajadoresModel} from "@/features/trabajadores/models/trabajadores.ts";
import {NewParteRequest, PartesModel} from "@/features/Partes/models/partes.ts";
import TrabajadoresService from "@/features/trabajadores/service/index.ts";
import PartesService from "@/features/Partes/service/index.ts";
import {Watch} from "vue-property-decorator";
import { DateTime } from "luxon"
import DateTimeInput from "@/components/dateTimeInput/index.vue";

@Options({
    components: {
        DateTimeInput
    }
})
export default class PartesCalendar extends Vue {
    trabajadores:TrabajadoresModel[] = [];
    trabajador:TrabajadoresModel = new TrabajadoresModel();
    partes:PartesModel[] = [new PartesModel()];
    parte:PartesModel = new PartesModel();
    busy = false;
    callPrintPartes = false;
    createModal = false;
    isShowParte = false;
    isCreating = false;
    hours: any[] = []; 
    hourStringEntrada = "";
    hourStringSalida = "";
    datePicked = "";
    trabajadorId = "";
    get computedDatePicked(){return this.datePicked}
    get computedTrabajadorCode(){return this.trabajadorId}
    @Watch('computedDatePicked')
    @Watch('computedTrabajadorCode')
    onPropertyChanged(value: string, oldValue: string) {
        this.loadPartes();
    }
    
    async loadPartes(){ //Se encarga de buscar y guardar los partes que coincidan con el trabajador y la hora
        this.partes = [];
        if(this.datePicked && this.trabajadorId){
            const aux =  this.trabajadores.find(trabajador => trabajador.id == parseInt(this.trabajadorId));
            if (aux) this.trabajador = aux;
            const datetime: DateTime = DateTime.fromISO(this.datePicked);
            this.trabajadores.forEach(trabajador => {
                if(trabajador.id == this.trabajador.id){
                    trabajador.partes.forEach(parte => {
                        if(parte.fechaEntrada.day == datetime.day && parte.fechaEntrada.month == datetime.month && parte.fechaEntrada.year == datetime.year){
                            this.partes.push(parte);
                        }
                    });
                }
            });
            this.hours.forEach(hour =>{
                hour.partes = [];
            })
            this.partes.forEach(parte => {
                const horaEntrada = parte.fechaEntrada.hour;
                const horaSalida = parte.fechaSalida.hour;
                for(let i = horaEntrada; i <= horaSalida; i++){
                    this.hours.forEach(hour =>{
                        if(hour.hour == i){
                            hour.partes.push(parte);
                        }
                    })
                }    
            });
        }
        this.callPrintPartes = true; 
    }

    async printPartes(){
        this.sortHours();
        this.hours.forEach(hour => {
            hour.partes.forEach((parte:PartesModel) => {
                const minEntrada = parte.fechaEntrada.minute;
                const minSalida = parte.fechaSalida.minute;
                let minHeight = minSalida - minEntrada;
                if(minHeight == 0)
                    minHeight = 60;
                if(Math.sign(minHeight) == -1)
                    minHeight *= -1;
                minHeight = (minHeight * 100) / 60; 
                const elements = document.getElementsByName(hour.hour);
                let element: any;
                if(elements){
                    for(let i = 0; i < elements.length; i++){
                        const aux = elements[i] as HTMLElement; 
                        if(aux.id == parte.id.toString())
                            element = aux;
                    }
                }
                element.style.backgroundColor = "green"
                if(parte.fechaSalida.hour > parte.fechaEntrada.hour){//Si se cumple tratamos al elemento como un standalone ya que la hora de salida estaría en otra hora distinta
                    //Tenemos que diferenciar entre la hora inicial(ya que a esta tendremos que añadirle los minutos) y las horas intermedias
                    if(hour.hour == parte.fechaEntrada.hour){
                        element.style.height = ((60 - minEntrada) * 100 / 60).toString() + "%";
                        element.style.top = (minEntrada * 100 / 60).toString() + "%";
                    }
                    else{
                        if(hour.hour == parte.fechaSalida.hour){
                            if(minSalida == 0)
                                element.style.height = "100%";
                            else
                                element.style.height = ((minSalida * 100) / 60).toString() + "%";
                            element.style.top = "0%";
                        }
                        else{
                            element.style.height = "100%";
                            element.style.top = "0%";
                        }
                    }
                }
                else{//Si no se cumple significa que la fecha de entrada y de salida comparten la misma hora
                    const aux = minSalida - minEntrada;
                    element.style.height = ((aux * 100) / 60).toString() + "%";
                    element.style.top = ((minEntrada * 100) / 60).toString() + "%";
                }
            });
        });
    }

    async sortHours(){
        this.hours.forEach(hour =>{
            hour.partes.sort(function (a: PartesModel, b: PartesModel){
                if(a.fechaEntrada.toISO() > b.fechaEntrada.toISO()) return 1
                if(a.fechaEntrada.toISO() < b.fechaEntrada.toISO()) return -1
                return 0;
            });
        })
    }

    async createParte(){
        this.isCreating = true;
        this.parte.trabajadorId = parseInt(this.trabajadorId);
        this.parte.fechaEntrada = DateTime.fromISO(this.datePicked + "T" + this.hourStringEntrada);
        this.parte.fechaSalida = DateTime.fromISO(this.datePicked + "T" + this.hourStringSalida);
        console.log(this.parte.fechaEntrada);
        console.log(this.parte.fechaSalida);
        try{
            await PartesService.AddParte(new NewParteRequest(this.parte));
        } finally {
            this.loadTrabajadores();
        }
    }

    async showAddParte(){//Enseña el modal para crear un nuevo parte
        if(!this.isShowParte)
            if(this.datePicked && this.trabajadorId)
                this.createModal = true;
    }

    async showParte(parteId: number){//Enseña el modal con el parte seleccionado y permite modificarlo 
        this.isShowParte = true;
        if(parteId != 0){
            const clickedParte = this.partes.find(parte => parte.id == parteId);
            if(clickedParte){
                this.parte = clickedParte;
                this.hourStringEntrada = this.parte.fechaEntrada.toISOTime({
                    includeOffset: false,
                    suppressSeconds: true,
                    suppressMilliseconds: true,
                })
                this.hourStringSalida = this.parte.fechaSalida.toISOTime({
                    includeOffset: false,
                    suppressSeconds: true,
                    suppressMilliseconds: true,
                })
            }
        }
        this.createModal = true;    
    }

    async loadTrabajadores(){
        this.busy = true;
        try{
            this.trabajadores = await TrabajadoresService.getTrabajadoresList();
        } finally {
            this.busy = false;
            if(this.isCreating){
                this.loadPartes();
                this.createModal = false;
            }
        }
    }
    
    async loadHours(){
        this.hours = [];
        for(let i = 8; i < 24; i++){  //Se debería crear cogiendo las horas equivalentes a un día de la fecha seleccionada
            const hour = i;
            const data = {hour: hour, partes: []};
            this.hours.push(data);
        }
    }

    async created(){
        await this.loadTrabajadores();
        await this.loadHours();
    }

    updated(){
        if(this.callPrintPartes){
            this.printPartes();
            this.callPrintPartes = false;
        }
    }

}