import { Options, Vue } from "vue-class-component"
import Service from "@/features/trabajadores/service/index.ts"
import PartesService from "@/features/Partes/service/index.ts"
import { Watch } from "vue-property-decorator"
import { DateTime } from "luxon"
import { NewParteRequest, PartesModel } from "@/features/Partes/models/partes.ts"
import { TrabajadoresModel } from "@/features/trabajadores/models/trabajadores.ts";
import DateTimeInput from "@/components/dateTimeInput/index.vue";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

@Options({
    components: {
        DateTimeInput
    }
})
export default class TrabajadorDetail extends Vue {
    
    trabajadorId = 0;
    busy = false;
    errorMessage = "";
    createModal = false;
    trabajador:TrabajadoresModel = new TrabajadoresModel();
    parte:PartesModel = new PartesModel();
    dateTimeProperty = DateTime.DATETIME_FULL;
    
    get paramTrabajadorId() {
        return this.$route.params.trabajadorId
    }

    @Watch('paramTrabajadorId')
    onPropertyChanged(value: string, oldValue: string) {
        this.trabajadorId = parseInt(value);
        this.loadTrabajador();
    }//end Watch

    async createParte() {
        this.parte.trabajadorId = this.trabajadorId;
        //Comprobaciones --> Moverlo a la api??
        if (this.parte.fechaSalida > this.parte.fechaEntrada) {
            await PartesService.AddParte(new NewParteRequest(this.parte));
            this.loadTrabajador(); //Volvemos a cargar los datos del trabajador
            this.createModal = false; //Cerramos el modal
            this.errorMessage = ""; //Reseteamos el mensaje de error
        }
        else {
            this.errorMessage = "Por favor introduzca bien las fechas"
        }
    }//end method createParte

    async closeModals() {
        this.createModal = false;
    }//end method closeModals

    generatePdf(){
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const table = [
            ["Fecha de entrada", "Fecha de salida", "Id proyecto", "Id trabajador"],
        ]
        this.trabajador.partes.forEach(parte => {
            const newRow = [parte.fechaEntrada.toLocaleString(DateTime.DATETIME_FULL),parte.fechaSalida.toLocaleString(DateTime.DATETIME_FULL),parte.proyectoId.toString(), parte.trabajadorId.toString()];
            table.push(newRow);
        });
        const docDefinition = {
            info: {title: "Informe de trabajo"},
            content: [
                {text: `${this.trabajador.nombre}, Código: ${this.trabajador.codigo}`, bold: true, fontSize: 15, alignment: "center"},
                "Listado de partes de trabajo :",
                {
                    table: {
                        body: table,
                    }
                },
            ]
        };
        pdfMake.createPdf(docDefinition).open();
    }//end method generatePdf

    async loadTrabajador() {
        this.busy = true
        try {
            this.trabajador = await Service.getTrabajadorById(this.trabajadorId);
        } finally {
            this.busy = false;
        }
    }//end method loadTrabajador

    async created() {
        this.trabajadorId = parseInt(this.$route.params.trabajadorId as string);
        await this.loadTrabajador();
    }//end method created

}//end class TrabajadorDetail