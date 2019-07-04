export interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    attendies: string[];
    hall: any;
}
export interface Query {
    events: Event[];
}

