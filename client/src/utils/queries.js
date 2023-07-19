import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($id: ID, $username: String) {
  user(_id: $id, username: $username) {
    _id
    username
    email
    savedBooks {
      _id
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
          _id
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