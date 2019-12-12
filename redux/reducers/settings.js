const initialState = { theme: "dark" };

const settings = (state = initialState, action) => {
  // console.log(action.type, action.payload);
  switch (action.type) {
    case "SET_SETTING": {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default settings;
