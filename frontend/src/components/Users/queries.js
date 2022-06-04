
import {
    gql
} from "@apollo/client";

export const USERS = gql`
query GetUsers {
  users {
    __typename
    id
    firstName
    lastName
    email
    createdAt
    updatedAt
  }
}
`;

export const USERS_MODIFIED = gql`
subscription UserUpdated {
  userUpdated {
    __typename
      __typename
      id
      firstName
      lastName
      email
      createdAt
      updatedAt
  }
}
`;

export const USERS_DELETED = gql`
subscription UserDeleted {
  userDeleted
}
`;

export const CREATE_USER = gql`
mutation CreateUser($firstName: String!, $lastName: String!, $email: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email) {
        __typename
        user {
            __typename
            id
            firstName
            lastName
            email
            createdAt
            updatedAt
        }
    }
}
`

export const EDIT_USER = gql`
mutation EditUser($id: ID!, $firstName: String!, $lastName: String!, $email: String!) {
    editUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
        __typename
        user {
            __typename
            id
            firstName
            lastName
            email
            createdAt
            updatedAt
        }
    }
}`

export const DELETE_USER = gql`
mutation DeleteUser($id: ID!) {
deleteUser(id: $id) {
    id
}}`