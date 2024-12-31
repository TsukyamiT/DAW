// Style imports.
import "normalize.css";
import "../css/main.css";

// React imports.
import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, useNavigate, BrowserRouter } from 'react-router-dom';

// App imports.
import State from "./stateController";
import FrontPage from "./endpoints/FrontPage";
import Leaderboard from "./endpoints/Leaderboard";
import Login from "./endpoints/Login";
import Register from "./endpoints/Register";
import AddMatch from "./endpoints/AddMatch";
import About from "./endpoints/About";
import Stats from "./endpoints/Stats";
import Find from "./endpoints/Find";
import Profile from "./endpoints/Profile";
import UnknownPage from "./endpoints/UnknownPage";
import EditProfile from "./endpoints/EditProfile";

const SetupNavigator = () => {
	State.setNavigator(useNavigate());
	return null;
}

document.title = "Game Rankings";

ReactDOM.render(
	<BrowserRouter>
		<SetupNavigator />
		<Routes>
			<Route path="/" element={<FrontPage />} />
			<Route path="/leaderboard" element={<Leaderboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/add-match" element={<AddMatch />} />
			<Route path="/about" element={<About />} />
			<Route path="/stats" element={<Stats />} />
			<Route path="/find" element={<Find />} />
			<Route path="/profile/:username" element={<Profile />} />
			<Route path="/edit" element={<EditProfile />} />
			<Route path="/*" element={<UnknownPage />} />
		</Routes>
	</BrowserRouter>,
	document.body
);


// export default function App() {
// 	return (
// 		<Router>
// 		<SetupNavigator />
// 			<Routes>
// 				<Route path="/" element={<FrontPage />} />
// 				<Route path="/leaderboard" element={<Leaderboard />} />
// 				<Route path="/login" element={<Login />} />
// 				<Route path="/register" element={<Register />} />
// 				<Route path="/add-match" element={<AddMatch />} />
// 				<Route path="/about" element={<About />} />
// 				<Route path="/stats" element={<Stats />} />
// 				<Route path="/find" element={<Find />} />
// 				<Route path="/owo" element={<About />}>
// 					<Route path="/owo/uwu" element={<About />} />
// 				</Route>
// 			</Routes>
// 		</Router>
// 	);
// }
//
// ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
