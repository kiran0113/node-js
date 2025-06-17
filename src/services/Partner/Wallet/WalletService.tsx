import axios from "axios";
import { environment } from "../../../environments/environment";

export class WalletService {
    private static URL: any = environment.partnerApiUrl;



    public static addWallet() {
        let UserURL: string = `${this.URL}/partnerwallet`;
        const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
        };
        return axios.post<any>(UserURL, '', config);
    }


}
