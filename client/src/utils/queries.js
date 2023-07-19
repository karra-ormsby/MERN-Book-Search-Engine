import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query User($id: ID, $username: String) {
  user(_id: $id, username: $username) {
    _id
    username
    email
    password
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;
