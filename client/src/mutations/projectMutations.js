import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProject($title: String!, $description: String!) {
    addProject(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject($id: ID!, $title: String!, $description: String!) {
    updateProject(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
