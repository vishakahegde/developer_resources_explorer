import React, { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import {
  selectDevelopersWithFavorite,
  selectDevelopers,
} from "./store/developers/selectors";
import { selectResources } from "./store/resources/selector";

import {
  selectDevelopersFavoritesResources,
  selectLoggedinUser,
} from "./store/selector";
import ResourcesSection from "./components/ResourcesSection";
import AddResourceForm from "./components/AddResourceForm";

function selectStatistics(state) {
  return {
    numDevelopers: state.developers.length,
    numResources: state.resources.length,
  };
}

function App() {
  const statistics = useSelector(selectStatistics);
  const resources = useSelector(selectResources);
  const developers = useSelector(selectDevelopers);
  const loggedinUser = useSelector(selectLoggedinUser);

  const [favoriteId, setFavoriteId] = useState(1);
  const [developerId, setDeveloperId] = useState(1);

  const developersWithThisFavorite = useSelector(
    selectDevelopersWithFavorite(favoriteId)
  );

  const favoriteResources = useSelector(
    selectDevelopersFavoritesResources(developerId)
  );

  return (
    <div className="App">
      <p
        style={{
          margin: "-1rem 0 2rem 0",
          padding: "0.5rem",
          background: "#eee",
        }}
      >
        Welcome back, <strong>{loggedinUser.name}</strong>!
      </p>
      <h1>Web development resources</h1>
      <div className="statistics">
        <div className="statistic">
          <div className="statistic__num">{statistics.numDevelopers}</div>
          <p>developers</p>
        </div>
        <div className="statistic">
          <div className="statistic__num">{statistics.numResources}</div>
          <p>resources</p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "2rem" }}>
          <h2>
            Who likes{" "}
            <select onChange={(e) => setFavoriteId(parseInt(e.target.value))}>
              {resources.map((resource) => {
                return (
                  <option key={resource.id} value={resource.id}>
                    {resource.name}
                  </option>
                );
              })}
            </select>
            ?
          </h2>
          <ul>
            {developersWithThisFavorite.map((dev) => {
              return <li key={dev.id}>{dev.name}</li>;
            })}
          </ul>
        </div>

        <div>
          <h2>
            What are{" "}
            <select onChange={(e) => setDeveloperId(parseInt(e.target.value))}>
              {developers.map((dev) => {
                return (
                  <option key={dev.id} value={dev.id}>
                    {dev.name}
                  </option>
                );
              })}
            </select>
            's favorites?
          </h2>
          <ul>
            {favoriteResources.map((resource) => {
              return <li key={resource.id}>{resource.name}</li>;
            })}
          </ul>
        </div>
      </div>
      <ResourcesSection />
      <AddResourceForm />
    </div>
  );
}

export default App;
