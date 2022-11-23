import { gql } from "@apollo/client";

const ADD_TIME = gql`
  mutation addTime(
    $activity: String!
    $date: String!
    $duration: String!
    $projectId: ID!
  ) {
    addTime(
      activity: $activity
      date: $date
      duration: $duration
      projectId: $projectId
    ) {
      id
      activity
      date
      duration
      projectId
    }
  }
`;

const DELETE_TIME = gql`
  mutation deleteTime($id: ID!) {
    deleteTime(id: $id) {
      id
      activity
      date
      duration
    }
  }
`;

export { ADD_TIME, DELETE_TIME };
