import React from "react";
import Base from "../Base/Base";
import "./Help.css";

const Help = () => {
  return (
    <Base>
      <div className="help-container">
        <div className="help-box">
          <ol className="help-data">
            <li>
              Click On the Movie or Actor or Producer Card to Know More Details
              about them
            </li>
            <br />
            <li>
              Click Add Actor or Add Producer to Add a Actor or Producer during
              Adding Movie
            </li>
            <br />
            <li>Click Edit button to Edit Movie</li>
            <br />
            <li>Click Dlete Button to Delete Movie</li>
          </ol>
        </div>
      </div>
    </Base>
  );
};

export default Help;
