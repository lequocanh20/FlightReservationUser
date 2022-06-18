export class Airport {
    public IATA?: string;
    public Name?: string;
    constructor(IATA: string, Name: string) {
        this.IATA = IATA;
        this.Name = Name;
    }
}