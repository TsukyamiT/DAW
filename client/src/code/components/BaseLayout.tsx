// React imports.
import React, { Component } from "react";

// Library imports.
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// App imports.
// import Toolbar from "./Toolbar";
// import MailboxList from "./MailboxList";
// import MessageList from "./MessageList";
// import ContactList from "./ContactList";
// import WelcomeView from "./WelcomeView";
// import ContactView from "./ContactView";
// import MessageView from "./MessageView";
import { createState } from "../state";
import Topbar from "./Topbar";


/**
 * BaseLayout.
 */
class BaseLayout extends Component {
	/**
	 * State data for the app.  This also includes all mutator functions for manipulating state.  That way, we only
	 * ever have to pass this entire object down through props (not necessarily the best design in terms of data
	 * encapsulation, but it does have the benefit of being quite a bit simpler).
	 */
	state = createState(this);


	/**
	 * Render().
	 */
	render() {
		return ((
			<div className="appContainer">
				<Dialog
					open={ this.state.pleaseWaitVisible }
					disableEscapeKeyDown={ true }
					transitionDuration={ 0 }>
					<DialogTitle style={{ textAlign:"center" }}>Please Wait</DialogTitle>
					<DialogContent><DialogContentText>...Contacting server...</DialogContentText></DialogContent>
				</Dialog>
				<div className="topbar">
					<Topbar state={ this.state } />
				</div>
			</div>
		));
	}
}


export default BaseLayout;
