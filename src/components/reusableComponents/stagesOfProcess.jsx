import React, { Component } from "react";
const StagesButtons = (props) => {
	const { stages, currentStage, handleStageChange } = props;
	return (
		<div className="btn-group btn-group-justified" style={{ marginBottom: 5 }}>
			{stages.map((stage) => {
				return (
					<div key={stage.number} className="btn-group">
						<button
							disabled={stage.number > currentStage ? true : false}
							type="button"
							className="btn btn-light"
							onClick={() => {
								handleStageChange(stage.number);
							}}
						>
							{stage.name}
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default StagesButtons;

const ex = (
	<div className="btn-group">
		<button disabled={false} type="button" className="btn btn-light">
			Apple
		</button>
	</div>
);
