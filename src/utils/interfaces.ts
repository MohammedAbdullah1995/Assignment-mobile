import { COUNTRY_NAME } from "./enums";

export interface RegistrationPayload {
    username : string,
    password : string,
    email : string,
    country : COUNTRY_NAME
}