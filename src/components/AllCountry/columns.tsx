import { Space } from "antd";
import { InputSwitch } from "primereact/inputswitch";
import moment from "moment";

export type CountryDataType = {
	id: number;
	countryName: string;
	code: string;
	currencyCode: string;
	isDeleted: string;
};

export const getColumns = (onDeleteToggle: (record: CountryDataType, value: boolean) => void) => [
	{
		title: "Country Name",
		dataIndex: "countryName",
		key: "countryName",
		sorter: (a: CountryDataType, b: CountryDataType) => a.countryName.localeCompare(b.countryName)
	},
	{
		title: "Country Code",
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
		title: "Active",
		key: "active",
		render: (_: any, record: CountryDataType) => (
			<Space size="middle">
				<InputSwitch
					className="status-check activeinput"
					checked={record.isDeleted === "N"}
					onChange={(e) => onDeleteToggle(record, e.value)}
				/>
			</Space>
		)
	}
];
