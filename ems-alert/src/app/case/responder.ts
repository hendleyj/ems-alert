export class Responder {
    username: string;
    name: string;
    certification_number: number;
    location: string;

    constructor(
        private username_new: string,
        private name_new: string,
        private certification_number_new: number,
        private location_new: string) {
            this.username = username_new;
            this.name = name_new;
            this.certification_number = certification_number_new;
            this.location = location_new;
    }
}
