import {FaTrash} from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { DELETE_TIME } from "../mutations/timeMutations";
import { GET_TIMES } from "../queries/timeQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function TimeTable({ time, project }) {
  const [deleteTime] = useMutation(DELETE_TIME, {
    variables: { id: time.id },
    update(cache, {data: {deleteTime}}) {
      const { times } = cache.readQuery({ query: GET_TIMES });
      cache.writeQuery({
        query: GET_TIMES,
        data: { times: times.filter(time => time.id !== deleteTime.id) },
      });
    }
  });

  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading</p>
  if (error) return <p>Error</p>

  return (
    <tr>
        <td>Project</td>
        <td>{time.activity}</td>
        <td>{time.duration} hours</td>
        <td>{time.date}</td>
        <td>
            <button className="btn btn-danger btn-sm" onClick={deleteTime}>
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
