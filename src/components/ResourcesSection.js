import React from "react";
import { selectResources } from "../store/resources/selector";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedinUser } from "../store/selector";

import "./ResourcesSection.css";
import { toggleFavorite } from "../store/developers/action";

export default function ResourcesSection() {
  const resources = useSelector(selectResources);
  const developer = useSelector(selectLoggedinUser);

  const dispatch = useDispatch();

  return (
    <div className="ResourcesSection">
      <h2>All resources</h2>
      <div className="resources">
        {resources.map((resource) => {
          const toggle = () => {
            const data = toggleFavorite(developer.id, resource.id);
            dispatch(data);
          };
          return (
            <div key={resource.id} className="resource">
              <div className="title">
                {developer.favorites.includes(resource.id) ? (
                  <button onClick={toggle}>♥</button>
                ) : (
                  <button onClick={toggle}>♡</button>
                )}
                <strong>{resource.name}</strong> (<em>{resource.type}</em>)
                &mdash; Find out more at{" "}
                <a href={resource.url}>{resource.url}</a>
              </div>
              <div className="meta">
                {resource.tags.map((tag, i) => {
                  return (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
