// constants
const GET_ALL_USERS = "users/GET_ALL_USERS"

const setUsers = (users) => ({
	type: GET_ALL_USERS,
	payload: users,
});



export const getAllUsersThunk = () => async (dispatch) => {
	const response = await fetch("/api/users/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUsers(data.users));
	}
};



const initialState = {};

export default function userReducer(state = initialState, action) {
    const newState = {}
	switch (action.type) {
		case GET_ALL_USERS:
            const allUsers = action.payload
            allUsers.forEach((user) => {
                newState[user.id] = user
            })
			return newState;
		default:
			return state;
	}
}