import styled from "styled-components";

export const SearchContainer = styled.div`
	display: flex;
	margin-bottom: 1rem;
	align-items: center;
`;

export const SearchWrapper = styled.div`
	display: block;
	width: 100%;
	max-width: 300px;

	.ant-input-affix-wrapper {
		width: 100%;
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;
	margin-left: auto;
`;

export const TableContainer = styled.div`
	background: #fff;
	border-radius: 4px;
	margin: 1rem 0;
	padding: 1rem;

	.ant-table-thead > tr > th {
		background: #f5f5f5;
		font-weight: 600;
	}
`;

export const PopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

export const PopupContent = styled.div`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	width: 90%;
	max-width: 500px;

	h4 {
		margin-bottom: 1.5rem;
		text-align: center;

		i {
			margin-right: 0.5rem;
			color: #f59e0b;
		}
	}
`;

export const PopupButtons = styled.div`
	display: flex;
	justify-content: center;
	gap: 1rem;
	margin-top: 2rem;
`;

export const FormContainer = styled.div`
	padding: 2rem;
	background: white;
	border-radius: 8px;

	h2 {
		margin-bottom: 2rem;
		font-size: 1.5rem;
		font-weight: 500;
	}
`;

export const FormRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 1.5rem;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const FormGroup = styled.div`
	flex: 1;

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.required {
		color: #dc2626;
	}

	.error-message {
		color: #dc2626;
		font-size: 0.875rem;
		margin-top: 0.25rem;
	}
`;

export const DialogFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	margin-top: 2rem;
	padding-top: 1rem;
	border-top: 1px solid #e5e7eb;
`;
