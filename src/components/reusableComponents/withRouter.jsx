import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
	const params = useParams();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<WrappedComponent
			{...props}
			params={params}
			navigate={navigate}
			searchParams={searchParams}
			setSearchParams={setSearchParams}
		/>
	);
};

export default withRouter;
