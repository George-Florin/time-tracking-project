import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, title, description },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id}}],
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if ( !title || !description ) {
        return alert("Please fill in all the fields");
    }

    updateProject(title, description);
  }

  return (
    <div className="mt-5">
        <h3>Update project</h3>
        <form onSubmit={onSubmit}>
        <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                type="text" 
                className="form-control" 
                id="title" 
                value={title} 
                onChange={ (e) =>setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                className="form-control" 
                id="description" 
                value={description} 
                onChange={ (e) =>setDescription(e.target.value)}>
                </textarea>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
