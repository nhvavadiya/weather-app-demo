import {
    GET_CITIES,
    ADD_TO_BOOKMARK_LIST,
    REMOVE_FROM_BOOKMARK_LIST,
    GET_CURRENT_TEMP
} from './actions';

const initialState = {
    cities: [],
    bookmarks: [],
    currentdata: []
};

function booksReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CITIES:
            return { ...state, cities: action.payload };
        case GET_CURRENT_TEMP:
            return { ...state, currentdata: action.payload };
        case ADD_TO_BOOKMARK_LIST:
            return { ...state, bookmarks: [...state.bookmarks, action.payload] };
        case REMOVE_FROM_BOOKMARK_LIST:
            return {
                ...state,
                bookmarks: state.bookmarks.filter(book => book.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default booksReducer;