import { gql } from "@apollo/client";

const GET_TIMES = gql`
  query getTimes($projectId: ID!) {
    times(projectId: $projectId) {
      id
      activity
      date
      duration
      projectId
    }
  }
`;

/*const GET_TIME = gql`
  query getTime($projectId: ID!) {
    time(projectId: $projectId) {
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
`;*/

export { GET_TIMES };
