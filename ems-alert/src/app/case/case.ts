export class Case {
    id: number;
    date: string;
    location: string;
    patient_name: string;
    responder_name: string[];
    dispatcher_name: string;
    notes: string;
    responder_notes: string[];

    constructor(
        private id_new: number,
        private date_new: string,
        private location_new: string,
        private patient_name_new: string,
        private responder_name_new: string[],
        private dispatcher_name_new: string,
        private notes_new: string,
        private responder_notes_new: string[]) {
            this.id = id_new;
            this.date = date_new;
            this.location = location_new;
            this.patient_name = patient_name_new;
            this.responder_name = responder_name_new;
            this.dispatcher_name = dispatcher_name_new;
            this.notes = notes_new;
            this.responder_notes = responder_notes_new;
    }
}
