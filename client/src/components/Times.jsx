import {useQuery} from "@apollo/client";
import TimeTable from "./TimeTable";
import { GET_TIMES } from "../queries/timeQueries";
import Spinner from "./Spinner";

export default function Times() {
  const { loading, error, data } = useQuery(GET_TIMES);

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <>
    { !loading && !error && (
        <table className="table table-hover mt-3">
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Activity</th>
                    <th>Duration</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {data.times.map(time => (
                    <TimeTable key={time.id} time={time} />
                ))}
            </tbody>
        </table>
    )}
    </>
  )
}
