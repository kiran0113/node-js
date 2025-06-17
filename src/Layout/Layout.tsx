import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import { Logout } from "../utils/AccountUtils";
import { useNavigate, useParams } from "react-router";
import { PartnerListService } from "../services/Partner/Partnerlist/PartnerDetailList";
import styled from "styled-components";

const LayoutWrapper = styled.div`
	display: flex;
	min-height: 100vh;
	width: 100%;
`;

const MainContent = styled.div`
	flex: 1;
	min-width: 0; // Important to prevent flex items from overflowing
	display: flex;
	flex-direction: column;
	transition: all 0.3s;
`;

const ContentArea = styled.div`
	flex: 1;
	overflow: auto;
`;

const Layout: React.FC<any> = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const id = sessionStorage.getItem("PartnerId");
	const [partnerId, setpartnerId] = useState(id);
	const [drawerState, setDrawerState] = useState(true);
	const [partnerModel, setPartnerrModel] = useState<PartnerListService>({
		id: 0,
		partnerId: Number(partnerId),
		fullName: "",
		role: "",
		type: ""
	});

	useEffect(() => {
		const useroobj = sessionStorage.getItem("User");
		if (useroobj === null || useroobj === undefined) {
			Logout(navigate);
		}
		if (Number(partnerId) !== 0) {
		}
	}, []);

	return (
		<LayoutWrapper>
			<Sidebar drawerState={drawerState} />
			<MainContent>
				<Header setDrawerState={setDrawerState} drawerState={drawerState} />
				<ContentArea>
					<Outlet />
				</ContentArea>
			</MainContent>
		</LayoutWrapper>
	);
};

export default Layout;
