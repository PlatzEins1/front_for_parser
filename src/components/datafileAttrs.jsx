import Form from "./reusableComponents/form";
import withRouter from "./reusableComponents/withRouter";
//import Joi, { not } from "joi";
import Joi from "joi-browser";
import axios from "axios";
import config from "../config.json";

class DatafilePage extends Form {
	state = {
		datafile_id: "",
		data: { file_name: "", comment: "", is_public: false },
		username: "",
	};
	schema = {
		file_name: Joi.string().required().label("Название файла"),
		comment: Joi.string().required().label("Комментарий"),
		is_public: Joi.boolean(),
	};
	async componentWillMount() {
		const { datafile_id } = this.props.params;
		this.setState({ datafile_id });

		const username = this.props.username;
		this.setState({ username });

		const { apiUrl } = config;

		const newDatafile = this.props.searchParams.get("newDatafile");

		if (newDatafile == "True") {
			//this.setState({new:1})
		} else {
			const datafile_data_endpoint = `${apiUrl}datafile_list/${datafile_id}/`;

			const accessToken = localStorage.getItem("accessToken");

			axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

			try {
				const response = await axios.get(datafile_data_endpoint);

				const data = { ...this.state.data };

				data["file_name"] = response.data["file_name"];
				data["comment"] = response.data["comment"];
				if (response.data["is_public"] == null) {
					data["is_public"] = false;
				}
				this.setState({ data });
			} catch (error) {}
		}
	}

	changePublicity = () => {
		const data = { ...this.state.data };
		const is_public = data.is_public;

		data.is_public = !is_public;
		this.setState({ data });
	};

	doSubmit = async () => {
		const { file_name, comment, is_public } = this.state.data;
		const { username, datafile_id } = this.state;
		const Payload = {
			file_name: file_name,
			comment: comment,
			is_public: is_public,
			username: username,
		};

		const { apiUrl } = config;
		const url = apiUrl + `change_datafile_attrs/${datafile_id}/`;
		//const apiurl = "http://localhost:8000/api/change_datafile_attrs/241/";

		const response = await axios.post(url, Payload);

		console.log(response);

		const navigate = this.props.navigate;

		navigate("/myfiles");
	};
	render() {
		return (
			<div
				//className="d-flex align-items-center justify-content-center container-fluid"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					marginTop: "50px",
				}}
			>
				<div className="d-flex align-items-center justify-content-center container-fluid">
					<h4 style={{ alignSelf: "center" }}>Данные файла:</h4>
				</div>
				<form
					onSubmit={this.handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#f2f2f2",
						padding: "20px",
						borderRadius: "10px",
						boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
						//fontFamily: Arial, sans-serif,
						width: "400px",
					}}
				>
					{this.renderInput("file_name", "Название файла")}
					{this.renderTextArea("comment", "комментарий к файлу")}
					<div
						className="d-flex align-items-center justify-content-center container-fluid"
						style={{ marginTop: "10px" }}
					>
						{this.renderCheckBox(
							"is_public",
							"Общедоступный файл",
							this.changePublicity
						)}
					</div>
					<div className="d-flex align-items-center justify-content-center container-fluid">
						{this.renderoptionalButton("Подтвердить")}
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(DatafilePage);
