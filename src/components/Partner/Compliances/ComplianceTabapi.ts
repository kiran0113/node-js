import axios from "axios";
import { environment } from "../../../environments/environment";
import { UpdateAction } from "./types";


export class ComplainceTabapi {
	private static URL: any = environment.partnerApiUrl;

	public static getReportsDetails(partnerID: any, Page: any, Rows: any) {
		let PartnerURL: string = `${this.URL}/Partner/Sanction?PartnerId=${partnerID}&Page=${Page}&Rows=${Rows}`;

		// https://api-dev.vinsys.live/partnerapidev/api/Partner/Sanction?PartnerId=387
		const config = {
			headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` }
		};
		return axios.get<any>(PartnerURL, config);
	}

	public static ApproveReject(paymentId: any, updateaction: UpdateAction, actioncomment: any) {
		const PartnerURL: string = `${this.URL}/payment/sanctionpaymentupdate?paymentId=${paymentId}&updateaction=${updateaction}&actioncomment=${actioncomment}`;

		const config = {
			headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` }
		};

		const data = {
			paymentId,
			updateaction,
			actioncomment
		};

		return axios.post<any>(PartnerURL, data, config);
	}
}