/* Disabling a linter warning that is caused by the CSS
 * framework and can't be fixed without undue effort. */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import format from "date-fns/format";
import { isAfter } from "date-fns/esm";
import { IconSquare, IconSquareCheck, IconChevronDown } from "@tabler/icons";

// Style for task cards
const cardButtonStyle = {
  backgroundColor: "#062751",
  borderColor: "rgba(0, 0, 0, 0)",
  outline: "none",
};

function TaskCard({ event, zoomFilter, user }) {
  // Creates state for expandable task cards
  const [toggleDetail, setToggle] = useState(false);

  // State that tracks if a task has been completed.
  const [completedTask, setCompleted] = useState(false);

  const cardTextStyle = {
    color: "white",
    textDecoration: completedTask ? "line-through" : "none",
  };

  // Expands/collapses task cards
  const expandCard = () => {
    setToggle(!toggleDetail);
  };

  const completeTask = () => {
    setCompleted(!completedTask);

    // Create event array to send to update function:
    const updateEvent = {
      userId: user._id,
      eventId: event._id,
      complete: true,
    };
  };

  const checkDate = () => {
    const yesterday = new Date(Date.now() - 864e5);
    return isAfter(new Date(event.dtstart), yesterday);
  };

  return (
    <>
      {/*
       * Returns empty div if card should be filtered. (If a
       * card is a zoom meeting and the zoom filter is active.)
       */}
      {!(event.isZoom && zoomFilter) && checkDate() && (
        <div className="block">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                <span
                  className="icon"
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={completeTask}
                >
                  {!completedTask && (
                    <IconSquare size={44} color="white" stroke={1.5} />
                  )}{" "}
                  {completedTask && (
                    <IconSquareCheck size={44} color="white" stroke={1.5} />
                  )}
                </span>
                <a href={event.url} style={cardTextStyle}>
                  [{event.course}] {event.summary} -{" "}
                  {format(new Date(event.dtstart), "eeee MMM d, h:mm aaa")}
                </a>
              </p>
              <button
                onClick={expandCard}
                id="card-button"
                className="card-header-icon"
                style={cardButtonStyle}
                aria-label="more options"
              >
                <span className="icon">
                  <IconChevronDown size={28} color="white" stroke={1.5} />
                </span>
              </button>
            </header>
            {/* Only displays detail if toggleDetail is set to true. */}
            {toggleDetail && (
              <>
                <div className="card-content">
                  <div className="content">{event.desc}</div>
                </div>
                <footer className="card-footer">
                  <a href="#" className="card-footer-item">
                    Edit
                  </a>
                  <a href="#" className="card-footer-item">
                    Done
                  </a>
                </footer>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;
