import DeleteProjectButton from "./DeleteProjectButton"

export default function ProjectCard({ project }) {
  return (
    <div className="col-md-4">
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{project.title}</h5>
                    <a className="btn btn-light ms-auto" href={`/projects/${project.id}`}>View</a>
                    <DeleteProjectButton projectId={project.id}/>
                </div>
                <p className="small">{project.description}</p>
            </div>
        </div>
    </div>
  )
}
