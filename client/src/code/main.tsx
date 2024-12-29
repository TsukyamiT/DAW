// Style imports.
import "normalize.css";
import "../css/main.css";

// React imports.
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// App imports.
import FrontPage from "./endpoints/FrontPage";
import Leaderboard from "./endpoints/Leaderboard";
import Login from "./endpoints/Login";
import Register from "./endpoints/Register";
import State from "./stateController";

const SetupNavigator = () => {
	State.setNavigator(useNavigate());
	return null;
}

ReactDOM.render(
	<Router>
		<SetupNavigator />
		<Routes>
			<Route path="/" element={<FrontPage />} />
			<Route path="/leaderboard" element={<Leaderboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	</Router>,
	document.body
);

// Now go fetch the user's mailboxes, and then their contacts.
// baseComponent.state.showHidePleaseWait(false);
// async function getMailboxes() {
//   const imapWorker: IMAP.Worker = new IMAP.Worker();
//   const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
//   mailboxes.forEach((inMailbox) => {
//     baseComponent.state.addMailboxToList(inMailbox);
//   });
// }
// //getMailboxes().then(function() {
//   // Now go fetch the user's contacts.
//   async function getContacts() {
//     const contactsWorker: Contacts.Worker = new Contacts.Worker();
//     const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
//     contacts.forEach((inContact) => {
//       baseComponent.state.addContactToList(inContact);
//     });
//   }
//   getContacts().then(() => baseComponent.state.showHidePleaseWait(false));
//});
