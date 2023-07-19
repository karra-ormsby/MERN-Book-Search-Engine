import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($bookId: String!) {
        saveBook(bookId: $bookId) {
            _id
            username
            savedBooks {
                authors
                description
                image
                bookId
                link
                title
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation DeleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            username
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