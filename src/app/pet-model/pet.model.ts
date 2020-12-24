export class PetModel{
    $key?:string;
    tipoReporte?:string;
    reporte?:string;
    long?:number;
    lat?:number;

constructor(){
    // this.$key=''
    this.reporte='';
    this.tipoReporte='';
    this.long=0;
    this.lat=0;

}
}