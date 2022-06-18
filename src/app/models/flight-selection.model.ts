export class FlightSelection {
    public id?: string;
    public flyingFrom: string;
    public flyingTo: string;
    public departing: string;
    public adult: number;
    public children: number;
    public travelClass: string
    constructor(id: string, flyingFrom: string, flyingTo: string, departing: string, adult: number, children: number, travelClass: string) {
        this.id = id;
        this.flyingFrom = flyingFrom
        this.flyingTo = flyingTo
        this.departing = departing
        this.adult = adult
        this.children = children
        this.travelClass = travelClass
    }
}