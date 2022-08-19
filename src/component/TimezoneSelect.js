import React from "react";
import PropTypes from "prop-types";
import Layout from "react-tackle-box/Layout";
import moment from "moment";
import "moment-timezone";

const allZones = moment.tz.names();
allZones.unshift("clear");

export default function TimezoneSelect({
  title,
  defaultTZ = moment.tz.guess(),
  timezone,
  setTimezone,
}) {
  const onChange = ({ target: { value } }) =>
    setTimezone(value ? value : defaultTZ);

  return (
    <div>
      <Layout direction="column" align="center">
      
        <label style={{ fontSize:"1.5rem", fontWeight : "bold" }}>Select a Timezone</label>{" "}
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <select
            className="form-control"
            style={{
              width: "90vw",
              height: "30px",
              display: "inline-block",
              fontSize: "1rem",
              margin: "10px"
            }}
            value={timezone}
            onChange={onChange}
          >
            {allZones.map((c, idx) => (
              <option
                style={{ fontSize: "1.5rem" }}
                key={idx}
                value={c !== "clear" ? c : ""}
              >
                {c}
              </option>
            ))}
          </select>
        </div>
      </Layout>
    </div>
  );
}

TimezoneSelect.propTypes = {
  title: PropTypes.string,
  defaultTZ: PropTypes.string,
  timezone: PropTypes.string,
  setTimezone: PropTypes.func,
};
