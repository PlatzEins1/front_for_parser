import React from "react";

const ListGroup = () => {
	const { items } = this.props;
	return (
		<React.Fragment>
			<ul class="list-group">
				{items.map((item) => (
					<li class="list-group-item">item</li>
				))}
			</ul>
		</React.Fragment>
	);
};

export default ListGroup;
