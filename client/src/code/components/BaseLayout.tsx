// React imports.
import React, { Component } from "react";
import axios from "axios";

// App imports.
import State from "../stateController";
import Info from "./Info";
import Wait from "./Wait";
import Confirmation from "./Confirmation";

// class BaseLayout extends Component {
// 	constructor(props: {}) {
// 		super(props);
// 	}
//
	// private async fetchData() {
	// 	try {
	// 		const response = await axios.get("http://127.0.0.1:8080/api/data");
	// 		console.log(response.data);
	// 		this.data = response.data;
	// 	} catch (err) {
	// 		console.log(err.message);
	// 	}
	// }

	// componentDidMount() {
	// 	State.setLoading(true);
	// 	this.fetchData().then(() => {
	// 		console.log("fetched");
	// 		// State.showInfo("Did you know?", "That I can spawn text in this window! just like you are seeing rn :3\n (also fetch succeeded btw :3)")
	// 		State.showConfirmation("Do you acknowledge that fetch has succeeded?", this.acknowledge);
	// 		State.setLoading(false);
	// 	});
	// }

	// private acknowledge(result: boolean): void {
	// 	if (result)
	// 		console.log("acknowledged YES");
	// 	else
	// 		console.log("acknowledged NO");
	// }
//
// 	render() {
// 		return ((
// 			<div>
// 				<Wait />
// 				<Info />
// 				<Confirmation />
// 			</div>
// 		));
// 	}
// }

const BaseLayout = () => (
	<div>
		<Wait />
		<Info />
		<Confirmation />
	</div>
);

export default BaseLayout;
