import { gql } from "@apollo/client";

const GET_TIMES = gql`
  query getTimes {
    times {
      id
      activity
      date
      duration
    }
  }
`;

export { GET_TIMES };
