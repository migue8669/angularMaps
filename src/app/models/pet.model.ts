import { SegundoReporte } from "../models/segundoReporte.model";

export class PetModel{
    $key?:string;
    tipoReporte?:string;
    nombre?:string;
    reporte?:string;
    segundoReporte?:SegundoReporte;
    foto?:string;
    long?:number;
    lat?:number;

constructor(){
    // this.$key=''
    this.reporte='';
    this.tipoReporte='';
    this.nombre='';
    
    this.foto='';
    this.long;
    this.lat;

}
}