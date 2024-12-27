// Style imports.
import "normalize.css";
import "../css/main.css";

// React imports.
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// App imports.
import BaseLayout from "./components/BaseLayout";
// import * as IMAP from "./IMAP";
// import * as Contacts from "./Contacts";


const baseComponent = ReactDOM.render(
	<Router>
		<Routes>
			<Route path="/home" element={<BaseLayout />} />
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
