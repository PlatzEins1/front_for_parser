import React from "react";
import StagesButtons from "./reusableComponents/stagesOfProcess";
import SourceType from "./sourceType";
import DataSource from "./dataSource";
import WhatToParse from "./whatToParse";
import Form from "./reusableComponents/form";
import AdditionalParsingParams from "./additionalParams";
import axios from "axios";
import config from "../config.json";
import withRouter from "./reusableComponents/withRouter";

class VKParser extends Form {
	state = {
		username: "",
		channel_group_name: "",
		sourceTypes: [
			{ id: "groups", name: "Группы" },
			{ id: "users", name: "Пользователей" },
		],
		parseInSourceType: {
			groups: [
				{ id: "mainInfo", name: "Основная информация" },
				{ id: "users", name: "Пользователи" },
				{ id: "postsAndComms", name: "Посты и комментарии" },
				{ id: "outerLinks", name: "Внешние ссылки" },
				{ id: "additionalInfo", name: "Доп информацию" },
			],
			users: [{ id: "subscriptions", name: "Подписки" }],
		},
		stages: [
			{ number: 1, name: "Выбор типа источника данных", attr: "sourceType" },
			{ number: 2, name: "Выбор источника данных", attr: "sources" },
			{ number: 3, name: "Что парсить?", attr: "whatToParse" },
			{ number: 4, name: "Доп. параметры?", attr: "additionalOptions" },
		],
		additionalOptionsList: {
			groups: {
				//field names are matching those in vk api docs: https://dev.vk.com/reference/objects/group
				mainInfo: [
					{ id: "name", name: "Название сообщества" },
					{ id: "is_closed", name: "Является ли сообщество закрытым" },
					{ id: "deactivated", name: "Сообщество удалено или заблокировано" },
					{ id: "type", name: "Тип сообщества" },
					{ id: "activity", name: "Строка тематики паблика" },
					{ id: "age_limits", name: "Возрастное ограничение" },
					{ id: "city", name: "Город, указанный в информации о сообществе" },
					{
						id: "country",
						name: "Страна, указанная в информации о сообществе",
					},
					{ id: "links", name: "Информация из блока ссылок сообщества" },
					{ id: "members_count", name: "Количество участников в сообществе" },
					{
						id: "verified",
						name: "Информация о том, верифицировано ли сообщество",
					},
					{
						id: "wall",
						name: "Стена: выключена, открыта, ограниченна закрыта",
					},
				],
				//field names are matching those in vk api docs: https://dev.vk.com/reference/objects/user
				users: [
					{
						id: "can_write_private_message",
						name: "Информация о том, может ли текущий пользователь отправить личное сообщение",
					},
				],
				postsAndComms: [], //no additonal options
				outerLinks: [], // not working now
				additionalInfo: [], // not working now
			},
			users: { subscriptions: [] }, //no additonal options
		},
		sourceType: "", //parse information from groups, users etc
		sources: "", //string, which consists of a group ids, divided by ','
		whatToParse: "", //comments, subscriptions, common info etc
		selectedAdditionalOptions: [],
		currentStage: 1,
	};
	componentDidMount() {}

	componentWillMount() {
		const username = this.props.username;
		this.setState({ username });
	}

	setSocialNetwork;

	handleURLInput = (event) => {
		const urls = event.currentTarget.value;
		this.setState({ sources: urls });
	};

	handleFileInput = async (event) => {
		event.preventDefault();

		const file = event.currentTarget.files[0];

		const reader = new FileReader();

		reader.readAsText(file);
		reader.onload = () => {
			this.setState({ sources: reader.result.replace(/(\r\n|\n|\r)/gm, "") });
		};
	};

	selectSourceType = (sourceType) => {
		this.setState({ sourceType });
	};

	selectWhatToParse = (WhatToParse) => {
		this.setState({ whatToParse: WhatToParse });
	};

	//changeSource = (sour)

	changeStage = (stage) => {
		this.setState({ currentStage: stage });
	};

	increaseCurrentStage = () => {
		let { currentStage } = this.state;
		currentStage++;
		this.setState({ currentStage });
	};

	handleNextStageClick = () => {
		const { currentStage, stages } = this.state;
		if (currentStage === stages.length) {
			//this.sendRequestToParser();
			this.sendParseRequestToWebsocket();
		} else {
			this.increaseCurrentStage();
		}
	};

	encodeSources(sources) {
		let encodedSources = "";
		for (let source of sources.split(",")) {
			encodedSources += encodeURIComponent(source) + ",";
		}
		return encodedSources;
	}

	stringifySelectedAdditionalOptions(selectedAdditionalOptions) {
		let optionsString = "";
		for (let option of selectedAdditionalOptions) {
			//if (option.includes('\\r\\n')){}
			optionsString += option + ",";
		}
		return optionsString;
	}

	sendParseRequestToWebsocket = () => {
		const { sourceType, sources, whatToParse, selectedAdditionalOptions } =
			this.state;
		const encodedSources = this.encodeSources(sources);
		const optionsString = this.stringifySelectedAdditionalOptions(
			selectedAdditionalOptions
		);

		let url = `ws://127.0.0.1:8000/ws/parse-task-add`;

		//console.log("fortnite");

		const parsingSocket = new WebSocket(url);

		parsingSocket.onopen = (event) => {
			console.log("connected");

			parsingSocket.send(
				JSON.stringify({
					appointment: "add parsing task",
					message: "fortnite_test",
					//group_name: channel_group_name,
					sourceType: sourceType,
					sources: encodedSources,
					whatToParse: whatToParse,
					selectedAdditionalOptions: optionsString,
					username: this.state.username,
				})
			);
		};

		parsingSocket.onmessage = (event) => {
			let data = JSON.parse(event.data);

			console.log("Data:", data);
			if (data.type == "parsing_start_notification") {
				const navigate = this.props.navigate;
				navigate(`/datafileAttrs/${data.message.datafile_id}?newDatafile=True`);
			}
		};
	};

	sendRequestToParser = async () => {
		let parserURL = config.apiUrl + "parsing_request_from_frontend/";
		const { sourceType, sources, whatToParse, selectedAdditionalOptions } =
			this.state;
		const encodedSources = this.encodeSources(sources);
		const optionsString = this.stringifySelectedAdditionalOptions(
			selectedAdditionalOptions
		);
		parserURL += `?sourceType=${sourceType}&sources=${encodedSources}&whatToParse=${whatToParse}&selectedAdditionalOptions=${optionsString}`;
		//console.log(parserURL);
		try {
			const responce = await axios.get(parserURL);
		} catch (error) {
			if (
				error.response.status === 401 &&
				error.response.statusText === "Unauthorized"
			) {
				const { navigate } = this.props;
				navigate("/login");
			}
		}
	};

	renderStage() {
		const { handleURLInput, handleFileInput, selectAdditionalOption } = this;
		const {
			currentStage,
			sourceTypes,
			sourceType,
			sources,
			parseInSourceType,
			whatToParse,
		} = this.state;
		return (
			<React.Fragment>
				{currentStage == 1 && (
					<SourceType
						sourceTypes={sourceTypes}
						selectSourceType={this.selectSourceType}
					></SourceType>
				)}
				{currentStage == 2 && (
					<DataSource
						handleURLInput={handleURLInput}
						handleFileInput={handleFileInput}
						sources={sources}
					></DataSource>
				)}
				{currentStage == 3 && (
					<WhatToParse
						options={parseInSourceType[sourceType]}
						selectWhatToParse={this.selectWhatToParse}
					></WhatToParse>
				)}
				{currentStage == 4 && (
					<AdditionalParsingParams
						options={this.getAdditionalOptions(sourceType, whatToParse)}
						selectOption={selectAdditionalOption}
					></AdditionalParsingParams>
				)}
			</React.Fragment>
		);
	}

	getAdditionalOptions(sourceType, whatToParse) {
		return this.state.additionalOptionsList[sourceType][whatToParse];
	}

	selectAdditionalOption = (option) => {
		const { selectedAdditionalOptions } = this.state;
		const index = selectedAdditionalOptions.indexOf(option);
		if (index === -1) {
			selectedAdditionalOptions.push(option);
		} else {
			selectedAdditionalOptions.splice(index, 1);
		}
		this.setState({ selectedAdditionalOptions: selectedAdditionalOptions }); //idk why, but if you remove second word, it will not work
	};

	render() {
		const {
			stages,
			currentStage,
			sourceTypes,
			sourceType,
			sources,
			parseInSourceType,
			whatToParse,
		} = this.state;

		const { handleURLInput, handleFileInput, handleNextStageClick } = this;

		const nextStageDisabled =
			(currentStage == 1 && sourceType) ||
			(currentStage == 2 && sources) ||
			(currentStage == 3 && whatToParse) ||
			currentStage == 4;

		return (
			<React.Fragment>
				<div style={{ justifyContent: "center", alignContent: "center" }}>
					<div>
						<StagesButtons
							stages={stages}
							currentStage={currentStage}
							handleStageChange={this.changeStage}
						></StagesButtons>
					</div>
					<div style={{ marginBottom: "20 px" }}>{this.renderStage()}</div>
					<div>
						<button
							className="btn btn-light"
							onClick={() => handleNextStageClick()}
							disabled={!nextStageDisabled}
						>
							{currentStage === stages.length ? "Начать парсинг" : "Далее"}
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(VKParser);
