import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Favorites } from "./views/favorites";
import { Single } from "./views/single";
import { Characters } from "./views/characters"
import { CharacterDetails } from "./views/character-details"
import { Vehicles } from "./views/vehicles"
import { VehicleDetails } from "./views/vehicles-details"
import { Planets } from "./views/Planets"
import { PlanetDetails } from "./views/planet-details"

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/favorites">
							<Favorites />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route exact path="/characters">
							<Characters />
						</Route>
						<Route exact path="/characters-details">
							<CharacterDetails />
						</Route>
            <Route exact path="/vehicles">
							<Vehicles />
						</Route>
            <Route exact path="/vehicles-details">
							<VehicleDetails />
						</Route>
            <Route exact path="/planets">
							<Planets />
						</Route>
            <Route exact path="/planet-details">
							<PlanetDetails />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
