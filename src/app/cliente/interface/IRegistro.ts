// Definimos la Estructura de nuestro registro
// Todos los campos son obligatorios 
// al menos que se declare como opcional con signo de pregunta
export interface IRegistro{
    id?:String
    first_name:String
    last_name:String
    //Signo pregunta, permite que el campo sea opcional
    email?:String  
    clave?:String
}
