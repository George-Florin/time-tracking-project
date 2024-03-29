import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      title
      description
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
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
`;

export { GET_PROJECTS, GET_PROJECT };
