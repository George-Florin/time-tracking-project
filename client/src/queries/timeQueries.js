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

const GET_TIME = gql`
  query getTime($projectId: ID!) {
    time(id: $projectId) {
      id
      activity
      date
      duration
      project {
        id
        title
        description
        times {
          id
          activity
          date
          duration
        }
      }
    }
  }
`;

export { GET_TIMES, GET_TIME };
