import { Button } from "primereact/button";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GlobalButton } from "../comman/GlobalButton.styles";
import { Space } from "antd";

export type CountryDataType = {
	id: number;
	countryName: string;
	code: string;
	currencyCode: string;
	createdDate: string;
	updatedDate: string;
};

export const getColumns = (editCountryDetails: (record: CountryDataType) => void, inactiveCountryDetails: (record: CountryDataType) => void) => [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		sorter: (a: CountryDataType, b: CountryDataType) => a.id - b.id
	},
	{
		title: "Country Name",
		dataIndex: "countryName",
		key: "countryName",
		sorter: (a: CountryDataType, b: CountryDataType) => a.countryName.localeCompare(b.countryName)
	},
	{
		title: "Code",
		dataIndex: "code",
		key: "code",
		sorter: (a: CountryDataType, b: CountryDataType) => a.code.localeCompare(b.code)
	},
	{
		title: "Currency Code",
		dataIndex: "currencyCode",
		key: "currencyCode",
		sorter: (a: CountryDataType, b: CountryDataType) => a.currencyCode.localeCompare(b.currencyCode)
	},
	{
		title: "Created Date",
		dataIndex: "createdDate",
		key: "createdDate",
		render: (text: string) => moment(text).format("MM/DD/YYYY H:mm:ss"),
		sorter: (a: CountryDataType, b: CountryDataType) => moment(a.createdDate).valueOf() - moment(b.createdDate).valueOf()
	},
	{
		title: "Updated Date",
		dataIndex: "updatedDate",
		key: "updatedDate",
		render: (text: string) => moment(text).format("MM/DD/YYYY H:mm:ss"),
		sorter: (a: CountryDataType, b: CountryDataType) => moment(a.updatedDate).valueOf() - moment(b.updatedDate).valueOf()
	},
	{
		title: "Action",
		key: "action",
		render: (_: any, record: CountryDataType) => (
			<div className="user-tab">
				<Space size="middle">
					<Button icon="pi pi-pencil" className="editbtn" onClick={() => editCountryDetails(record)} title="edit" />
					<Button icon="pi pi-trash" className="editbtn" onClick={() => inactiveCountryDetails(record)} title="Delete" />
				</Space>
			</div>
		)
	}
];
