import { Etudiant } from "./Etudiant";
import { Role } from "./Role";

export class Account {
    userName: string;
    userFirstName: string;
    userLastName: string;
    userPassword: string;
    role: Role[];
    etudiant:Etudiant;
  }