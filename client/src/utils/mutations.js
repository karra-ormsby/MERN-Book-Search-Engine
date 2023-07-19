import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            savedBooks {
                _id
                authors
                description
                bookId
                image
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