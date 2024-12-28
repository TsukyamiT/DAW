import React from "react";

import BaseLayout from "./BaseLayout";
import PageTitle from "./PageTitle";
import Topbar from "./Topbar";

const Page = ({title}) => (
	<div>
		<BaseLayout />
		<Topbar />
		<PageTitle title={title} />
	</div>
);

export default Page;
