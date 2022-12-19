import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_TIME } from "../mutations/timeMutations";
import { GET_TIMES } from "../queries/timeQueries";

export default function AddTimeModal({ project }) {
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [projectId, setProjectId] = useState("");

  const [addTime] = useMutation(ADD_TIME, {
    variables: { activity, date, duration, projectId },
    refetchQueries: [{ query: GET_TIMES }]
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (activity === "" || date === "" || duration === "") {
      return alert("Please fill in all the required fields");
    }

    addTime({ variables: { activity, date, duration, projectId }});

    setActivity("");
    setDate("");
    setDuration("");
    setProjectId("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary w-25"
        data-bs-toggle="modal"
        data-bs-target="#addTimeModal"
      >
        <div className="d-flex align-items-center">
          <FaPlus className="icon" />
          <div>Add time</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addTimeModal"
        aria-labelledby="addTimeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTimeModalLabel">
                Add time
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Activity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration</label>
                  <input
                    type="number"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}