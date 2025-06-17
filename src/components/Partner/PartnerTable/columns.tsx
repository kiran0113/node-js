import { Space } from "antd";
import { InputSwitch } from "primereact/inputswitch";
import { GlobalButton } from "../../comman/GlobalButton.styles";

export type PartnerDataType = {
	id: number;
	fullName: string;
	role: string;
	onboardingStatus: string;
	isActive: number;
	isEncryption: "Y" | "N";
	exComplianceCheck: 1 | 0;
};

export const getColumns = (
	onViewClick: (record: PartnerDataType) => void,
	onActiveToggle: (record: PartnerDataType, value: boolean) => void,
	onEncryptToggle: (record: PartnerDataType, value: boolean) => void,
	onComplianceToggle: (record: PartnerDataType, value: boolean) => void
) => [
	{
		title: "Name",
		dataIndex: "fullName",
		key: "fullName",
		sorter: (a: PartnerDataType, b: PartnerDataType) => a.fullName.localeCompare(b.fullName)
	},
	{
		title: "Role",
		dataIndex: "role",
		key: "role",
		sorter: (a: PartnerDataType, b: PartnerDataType) => (a.role || "").localeCompare(b.role || "")
	},
	{
		title: "Partner Id",
		dataIndex: "id",
		key: "id",
		sorter: (a: PartnerDataType, b: PartnerDataType) => a.id - b.id
	},
	{
		title: "Onboarding Status",
		dataIndex: "onboardingStatus",
		key: "onboardingStatus",
		sorter: (a: PartnerDataType, b: PartnerDataType) => a.onboardingStatus.localeCompare(b.onboardingStatus)
	},
	{
		title: "View",
		key: "view",
		render: (_: any, record: PartnerDataType) => (
			<GlobalButton className="primary" onClick={() => onViewClick(record)}>
				View
			</GlobalButton>
		)
	},
	{
		title: "Active",
		key: "active",
		render: (_: any, record: PartnerDataType) => (
			<Space size="middle">
				<InputSwitch
					className="status-check activeinput"
					disabled={record.onboardingStatus === "Pending"}
					checked={Boolean(record.isActive)}
					onChange={(e) => onActiveToggle(record, e.value)}
				/>
			</Space>
		)
	},
	{
		title: "Encrypt",
		key: "encrypt",
		render: (_: any, record: PartnerDataType) => (
			<Space size="middle">
				<InputSwitch
					className="status-check activeinput"
					disabled={record.onboardingStatus === "Pending"}
					checked={record.isEncryption === "Y"}
					onChange={(e) => onEncryptToggle(record, e.value)}
				/>
			</Space>
		)
	},
	{
		title: "Compliance",
		key: "compliance",
		render: (_: any, record: PartnerDataType) => (
			<Space size="middle">
				<InputSwitch
					className="status-check activeinput"
					disabled={record.onboardingStatus === "Pending"}
					checked={Boolean(record.exComplianceCheck)}
					onChange={(e) => onComplianceToggle(record, e.value)}
				/>
			</Space>
		)
	}
];
