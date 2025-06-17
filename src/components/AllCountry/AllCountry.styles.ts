import styled from "styled-components";

export const SearchContainer = styled.div`
	margin-bottom: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
`;

export const SearchWrapper = styled.div`
	flex: 1;
	max-width: 600px;
	display: flex;
	gap: 8px;

	.p-input-icon-left {
		flex-grow: 1;
		display: block;

		input {
			width: 100%;
		}
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

export const TableContainer = styled.div`
	background: white;
	margin-top: 20px;
	border-radius: 8px;
	min-height: calc(100vh - 350px);

	.ant-table-wrapper {
		.ant-table-thead > tr > th {
			color: var(--purple-dark);
			font-weight: 600;
		}
	}
`;
