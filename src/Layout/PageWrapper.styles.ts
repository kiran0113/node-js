import styled from "styled-components";
import { Card, Typography } from "antd";
const { Title } = Typography;

export const PageContainer = styled.div`
	height: 100vh;
	overflow-y: auto;
	padding: 24px;
	background: transparent;
`;

export const HeaderSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 32px;
	padding: 16px 24px;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		margin-bottom: 24px;
	}
`;

export const HeaderTitle = styled(Title)`
	margin: 0;
	color: var(--purple-dark);

	@media (max-width: 768px) {
		font-size: 20px !important;
	}
`;

export const ContentCard = styled(Card)`
	padding: 24px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 24px;
	background: #fff;
	border-radius: 8px;

	@media (max-width: 768px) {
		padding: 16px;
	}
`;
