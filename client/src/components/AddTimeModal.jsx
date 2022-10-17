import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { ADD_TIME } from "../mutations/timeMutations";
import { GET_TIMES } from "../queries/timeQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function AddTimeModal() {
  const [project, setProject] = useState("");
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const [addTime] = useMutation(ADD_TIME, {
    variables: { project, activity, date, duration },
    update(cache, { data: { addTime }}) {
        const { times } = cache.readQuery({ query: GET_TIMES});

        cache.writeQuery({
            query: GET_TIMES,
            data: { times: [...times, addTime]},
        });
    }
  });

  const { loading, error, data } = useQuery(GET_PROJECTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if(project === "" || activity === "" || date === "" || duration === "") {
        return alert("Please fill in all the fields");
    }

    addTime(activity, date, duration);

    setProject("");
    setActivity("");
    setDate("");
    setDuration("");
  };

  if (loading) return null;
  if (error) return <p>Error</p>

  return (
    <>
    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addTimeModal">
  <div className="d-flex align-items-center">
    <FaPlus className="icon" />
    <div>Add time</div>
  </div>
</button>

<div className="modal fade" id="addTimeModal" aria-labelledby="addTimeModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addTimeModalLabel">Add time</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={onSubmit}>
        <div className="mb-3">
                <label className="form-label">Project</label>
                <select 
                id="project" 
                className="form-select" 
                value={project} 
                onChange={(e) => setProject(e.target.value)}>
                    <option value="">Select</option>
                    { data.projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.title}</option>
                    ) ) }
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Activity</label>
                <input 
                type="text" 
                className="form-control" 
                id="activity" 
                value={activity} 
                onChange={ (e) =>setActivity(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Duration</label>
                <input 
                type="number" 
                className="form-control" 
                id="duration" 
                value={duration} 
                onChange={ (e) =>setDuration(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Date</label>
                <input 
                type="date" 
                className="form-control" 
                id="date" 
                value={date} 
                onChange={ (e) =>setDate(e.target.value)} />
            </div>
            <button type="Submit" data-bs-dismiss="modal" className="btn btn-secondary">
                Submit
            </button>

        </form>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
