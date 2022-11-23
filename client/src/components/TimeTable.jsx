import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { DELETE_TIME } from "../mutations/timeMutations";
import { GET_TIMES } from "../queries/timeQueries";
import { GET_PROJECT } from "../queries/projectQueries";

export default function TimeTable({ times, projectId }) {
  const [deleteTime] = useMutation(DELETE_TIME, {
    variables: { projectId },
    refetchQueries: [{ query: GET_TIMES }, { query: GET_PROJECT }],
  });

  const { loading, error } = useQuery(GET_PROJECT);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <tr>
      <td>{times.activity}</td>
      <td>{times.duration} hours</td>
      <td>{times.date}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteTime}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
