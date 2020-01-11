const initialState = { theme: "dark" };

const settings = (state = initialState, action) => {
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
