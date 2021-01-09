export class PetModel{
    $key?:string;
    tipoReporte?:string;
    reporte?:string;
    segundoReporte?:[];
    foto?:string;
    long?:number;
    lat?:number;

constructor(){
    // this.$key=''
    this.reporte='';
    this.tipoReporte='';
    this.segundoReporte=[];
    this.foto='';
    this.long;
    this.lat;

}
}