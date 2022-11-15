import {FaCalendar, FaClock, FaBook} from "react-icons/fa";

export default function TimeInfo({ project }) {
  return (
    <>
      <h5 className="mt-5">Time details</h5>
      <ul className="list-group">
        <li className="list-group-item">
            <FaBook className="icon" /> {time.activity}
        </li>
        <li className="list-group-item">
            <FaCalendar className="icon" /> {time.date}
        </li>
        <li className="list-group-item">
            <FaClock className="icon" /> {time.duration}
        </li>
      </ul>
    </>
  )
}
