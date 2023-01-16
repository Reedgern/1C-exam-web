import { setPhotoAction } from "./actions";

export const initialState = {
    image: null,
}

type ActionType = 
| ReturnType<typeof setPhotoAction>;

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case setPhotoAction.type:
            return {
                ...state,
                image: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;