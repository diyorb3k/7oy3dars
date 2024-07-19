import { createContext, useReducer } from "react";

// Action types
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_ERROR = "DELETE_POST_ERROR";
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_ERROR = "ADD_POST_ERROR";
export const EDIT_POST_REQUEST = "EDIT_POST_REQUEST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_ERROR = "EDIT_POST_ERROR";

// Initial state
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_POST_SUCCESS:
      const updatedPosts = state.posts.filter((post) => post.id !== action.payload);
      return {
        ...state,
        loading: false,
        posts: updatedPosts,
      };
    case DELETE_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
      };
    case ADD_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_POST_SUCCESS:
      const editedPosts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
      return {
        ...state,
        loading: false,
        posts: editedPosts,
      };
    case EDIT_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Context creation
export const PostContext = createContext();

// Context provider component
export const PostProvider = ({ children }) => {
  const [blog, dispatch] = useReducer(reducer, initialState);

  return (
    <PostContext.Provider value={{ blog, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
