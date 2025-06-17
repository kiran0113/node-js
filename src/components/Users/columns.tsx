import { Space } from "antd";
import { InputSwitch } from "primereact/inputswitch";
import moment from "moment";
import { GlobalButton } from "../comman/GlobalButton.styles";
import { EditOutlined } from "@ant-design/icons";

export type UserDataType = {
	id: number;
	firstName: string;
	lastName: string;
	userName: string;
	roleName: string;
	createdDate: string;
	createdBy: string;
	isActive: boolean;
	roleId: number;
};

export const getColumns = (onEditClick: (record: UserDataType) => void, onToggleActive: (record: UserDataType, value: boolean) => void) => [
	{
		title: "User",
		dataIndex: "firstName",
		key: "firstName",
		sorter: (a: UserDataType, b: UserDataType) => {
			const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
			const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
			return nameA.localeCompare(nameB);
		},
		render: (_: string, record: UserDataType) => `${record.firstName} ${record.lastName}`
	},
	{
		title: "Role",
		dataIndex: "roleName",
		key: "roleName",
		sorter: (a: UserDataType, b: UserDataType) => a.roleName.localeCompare(b.roleName)
	},
	{
		title: "Email",
		dataIndex: "userName",
		key: "userName"
	},
	{
		title: "Invited Date",
		dataIndex: "createdDate",
		key: "createdDate",
		sorter: (a: UserDataType, b: UserDataType) => moment(a.createdDate).unix() - moment(b.createdDate).unix(),
		render: (date: string) => moment(date).format("MM/DD/YYYY H:mm:ss")
	},
	{
		title: "Invited By",
		dataIndex: "createdBy",
		key: "createdBy",
		sorter: (a: UserDataType, b: UserDataType) => a.createdBy.localeCompare(b.createdBy)
	},
	{
		title: "Status",
		dataIndex: "isActive",
		key: "isActive",
		render: (isActive: boolean) => (isActive ? "Active" : "Inactive")
	},
	{
		title: "Action",
		key: "action",
		render: (_: any, record: UserDataType) => (
			<Space size="small">
				<GlobalButton
					icon={<EditOutlined />}
					className="primary small"
					onClick={() => onEditClick(record)}
					style={{ padding: "4px 8px", height: "28px", minWidth: "unset" }}
				/>
				<InputSwitch checked={record.isActive} onChange={(e) => onToggleActive(record, e.value)} className="status-check activeinput" />
			</Space>
		)
	}
];
