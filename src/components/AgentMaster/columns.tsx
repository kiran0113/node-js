import { Button } from "primereact/button";
import moment from "moment";
import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface AgentDataType {
	id: number;
	countryId: string;
	countryname: string;
	partnerId: string;
	agentId: string;
	agentName: string;
	optionalField: string;
	deliveryType: string;
	createdDate: string;
}

export const getColumns = (editCountryDetails: (record: any) => void, inactiveCountryDetails: (record: any) => void): ColumnsType<AgentDataType> => [
	{
		title: "Country Id",
		dataIndex: "countryId",
		key: "countryId",
		width: "10%",
		sorter: (a, b) => Number(a.countryId) - Number(b.countryId)
	},
	{
		title: "Country Name",
		dataIndex: "countryname",
		key: "countryname",
		sorter: (a, b) => a.countryname.localeCompare(b.countryname),
		width: "20%"
	},
	{
		title: "Partner Id",
		dataIndex: "partnerId",
		key: "partnerId",
		width: "10%",
		sorter: (a, b) => Number(a.partnerId) - Number(b.partnerId)
	},
	{
		title: "Agent Id",
		dataIndex: "agentId",
		key: "agentId",
		sorter: (a, b) => a.agentId.localeCompare(b.agentId),
		width: "10%"
	},
	{
		title: "Agent Name",
		dataIndex: "agentName",
		key: "agentName",
		sorter: (a, b) => a.agentName.localeCompare(b.agentName),
		width: "25%"
	},
	// {
	// 	title: "Optional Field",
	// 	dataIndex: "optionalField",
	// 	key: "optionalField",
	// 	sorter: true,
	// 	width: "20%",
	// 	render: (text) => text || "-"
	// },
	{
		title: "Delivery Type",
		dataIndex: "deliveryType",
		key: "deliveryType",
		sorter: true,
		width: "10%"
	},
	{
		title: "Created Date",
		dataIndex: "createdDate",
		key: "createdDate",
		sorter: (a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix(),
		width: "15%",
		render: (text) => moment(text).format("MM/DD/YYYY H:mm.ss")
	},
	{
		title: "Action",
		key: "action",
		width: "15%",
		render: (_, record) => (
			<Space size="middle">
				<Button icon="pi pi-pencil" className="editbtn" onClick={() => editCountryDetails(record)} title="edit" />
				<Button icon="pi pi-trash" className="editbtn" onClick={() => inactiveCountryDetails(record)} title="Delete" />
			</Space>
		)
	}
];
