import React, { useState } from "react";
import { addResource } from "../store/resources/actions";
import { useDispatch } from "react-redux";

export default function AddResourceForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("library");
  const [tags, setTags] = useState("");
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  function CreateTagsArray() {
    // if (tags === "") {
    //   return [];
    // } else if (tags.includes(" ")) {
    //   return tags.split(" ");
    // } else if (tags.includes(",")) {
    //   return tags.split(",");
    // } else {
    //   return tags;
    // }

    if (tags === "") {
      return [];
    } else {
      //https://stackoverflow.com/questions/10346722/how-can-i-split-a-javascript-string-by-white-space-or-comma
      return tags.split(/[ ,]+/);
    }
  }

  const submit = (event) => {
    // to make sure that the form does not redirect (which is normal browser behavior)
    event.preventDefault();
    const tagsArray = CreateTagsArray();
    const data = addResource(name, type, tagsArray, url);
    dispatch(data);

    setName("");
    setType("");
    setTags("");
    setURL("");
  };

  const defaultTypes = ["library", "tool", "website", "resource", "cheatsheet"];
  return (
    <div>
      <form onSubmit={submit}>
        <h2>Add a new resource</h2>
        <p>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
        </p>
        <p>
          <label>
            Type:{" "}
            <select onChange={(e) => setType(e.target.value)}>
              {defaultTypes.map((defaultType) => {
                return <option value={defaultType}>{defaultType}</option>;
              })}
            </select>
          </label>
        </p>
        <p>
          <label>
            Tags (comma and/or space-separated):{" "}
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            ></input>
          </label>
        </p>
        <p>
          <label>
            URL:{" "}
            <input
              type="text"
              value={url}
              onChange={(e) => setURL(e.target.value)}
            ></input>
          </label>
        </p>
        <p>
          <button type="submit">Add this resource!</button>
        </p>
      </form>
    </div>
  );
}
