import AddTimeModal from "../components/AddTimeModal";
import Projects from "../components/Projects";
import Times from "../components/Times";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddTimeModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Times />
    </>
  )
}
