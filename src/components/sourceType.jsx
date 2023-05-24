import React, { Component } from "react";
const SourceType = (props) => {
	const { sourceTypes, selectSourceType } = props;

	return (
		<React.Fragment>
			<fieldset id="sourceTypes">
				{sourceTypes.map((sourceType) => {
					return (
						<div key={sourceType.id}>
							<input
								onClick={() => {
									selectSourceType(sourceType.id);
								}}
								//onSelect={selectSourceType(sourceType.id)}
								//onChange={console.log(sourceType.id)}
								type="radio"
								id={sourceType.id}
								name="sourceTypes"
								value={sourceType.name}
							></input>
							<label htmlFor={sourceType.id}>{sourceType.name}</label>
						</div>
					);
				})}
			</fieldset>
		</React.Fragment>
	);
};

export default SourceType;
