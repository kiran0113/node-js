import styled from "styled-components";
import { Button as AntButton } from "antd";

export const GlobalButton = styled(AntButton)`
	&.ant-btn {
		height: 40px;
		padding: 0 24px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-weight: 500;
		min-width: 120px;

		&.primary {
			background: var(--purple-dark);
			border-color: var(--purple-dark);
			color: white;

			&:disabled {
				background: #f5f5f5;
				border-color: #d9d9d9;
				color: #d9d9d9;

				&:hover,
				&:focus,
				&:active {
					background: #f5f5f5;
					border-color: #d9d9d9;
					color: #d9d9d9;
				}
			}

			&:not(:disabled) {
				&:hover,
				&:focus,
				&:active {
					background: var(--purple-dark);
					border-color: var(--purple-dark);
					color: white;
				}
			}
		}

		&.secondary {
			background: white;
			border-color: var(--purple-dark);
			color: var(--purple-dark);

			&:disabled {
				background: white;
				border-color: #d9d9d9;
				color: #d9d9d9;

				&:hover,
				&:focus,
				&:active {
					background: white;
					border-color: #d9d9d9;
					color: #d9d9d9;
				}
			}

			&:not(:disabled) {
				&:hover,
				&:focus,
				&:active {
					background: white;
					border-color: var(--purple-dark);
					color: var(--purple-dark);
				}
			}
		}
	}

	&.small {
		font-size: 12px;
		padding: 4px 8px;
		height: 28px;
		min-width: unset;

		.anticon {
			font-size: 12px;
		}
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: 16px;
`;
