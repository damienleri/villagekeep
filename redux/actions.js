// export const setTheme = theme => ({ type: "SET_THEME", payload: { theme } });
export const setSettings = settings => {
  // console.log("called settings", settings);
  return { type: "SET_SETTING", payload: settings };
};
