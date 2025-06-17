import axios from "axios";
import { environment } from "../../../environments/environment";

export class PartnerStatusUpdateService {
    private static URL: any = environment.partnerApiUrl;



    public static updatestatus() {
        let UserURL: string = `${this.URL}/partner/updatestatus`;
        const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
        };
        return axios.post<any>(UserURL, '', config);
    }


}
