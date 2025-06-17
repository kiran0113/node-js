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
	max-width: 400px;

	.p-input-icon-left {
		width: 100%;
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

export const PopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

export const PopupContent = styled.div`
	background: white;
	padding: 24px;
	border-radius: 8px;
	width: 600px;
	max-height: 80vh;
	overflow-y: auto;

	h2 {
		margin-bottom: 16px;
		color: var(--purple-dark);
	}

	textarea {
		width: 100%;
		min-height: 300px;
		padding: 16px;
		margin-bottom: 16px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		resize: vertical;
		font-family: "Courier New", Courier, monospace;
		font-size: 14px;
		line-height: 1.5;
		white-space: pre;
		overflow-x: auto;
		background-color: #f8f9fa;
		color: #333;
	}
`;

export const PopupButtons = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
`;
