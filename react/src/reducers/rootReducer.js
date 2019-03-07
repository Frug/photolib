const getAuth = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let authCode = params.get('code');
  console.log('code', authCode)
  return authCode !== "" ? authCode : null;
}

const initState = {
  authToken: getAuth()
}

const rootReducer = (state = initState, action) => {
  return state;
}

export default rootReducer