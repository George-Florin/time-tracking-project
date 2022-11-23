import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import AddTimeModal from "../components/AddTimeModal"
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import Times from '../components/Times';

export default function Project({ projectId }) {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {
        <div className='mx-auto w-75 card p-5'>
          <AddTimeModal projectId={data.projectId}/>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.project.title}</h1>
          <p>{data.project.description}</p>

          <EditProjectForm project={data.project} />
          <Times projectId={projectId}/>
        </div>
      }
    </>
  );
}