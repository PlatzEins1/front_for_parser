import React, { Component, useReducer } from "react";
import WithLogin from "./reusableComponents/withLogin";
import { Navigate } from "react-router-dom";
import StagesButtons from "./reusableComponents/stagesOfProcess";
import SourceType from "./sourceType";
import DataSource from "./dataSource";
import WhatToParse from "./whatToParse";
import Form from "./reusableComponents/form";
import AdditionalParsingParams from "./additionalParams";
import axios from "axios";

class VKParser extends Form {
	state = {
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
		selectedAdditionalOptions: [],
		sourceType: "", //parse information from groups, users etc
		currentStage: 1,
		sources: "", //string, which consists of a group ids, divided by ','
		whatToParse: "", //comments, subscriptions, common info etc
		additionalOptions: "",
		query: {},
	};
	componentDidMount() {}

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
			//console.log(reader.result);
			this.setState({ sources: reader.result });
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
			this.sendRequestToParser();
		} else {
			this.increaseCurrentStage();
		}
	};

	sendRequestToParser() {}

	renderStage() {
		const { handleURLInput, handleFileInput, selectAdditionalOption } = this;
		const {
			stages,
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

		//const additionalOptions =
		//this.state.additionalOptionsList[sourceType][whatToParse];

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

export default VKParser;
