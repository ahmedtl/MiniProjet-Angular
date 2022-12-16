import { Contrat } from "./Contrat";
import { Departement } from "./Department";
import { Equipe } from "./Equipe";
import { Option } from "./Option";

export class Etudiant {
    idEtudiant : number ;
    nomE : String ;
    prenomE : String ;
    options:Option;
    departement:Departement;
    contrats:Contrat;
    equipes:Equipe
}