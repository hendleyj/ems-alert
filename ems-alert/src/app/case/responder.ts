export class Responder {
    username: string;
    password: string;
    device_id: string;
    name: string;
    certification_number: number;
    certification_date: string;
    latitude: string;
    longitude: string;

    constructor(
        private username_new: string,
        private password_new: string,
        private name_new: string,
        private certification_number_new: number,
        private latitude_new: string,
        private longitude_new: string) {
            this.username = username_new;
            this.password = password_new;
            this.name = name_new;
            this.certification_number = certification_number_new;
            this.latitude = latitude_new;
            this.longitude = longitude_new;
    }
}
