const OPT_SUCCESS = 'common/OPT_SUCCESS';
const OPT_ERROR = 'common/OPT_ERROR';
const OPT_LOADING = 'common/OPT_LOADING';



const initialState = {
  
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action
  switch (type) {
    default:
      return state
  }
}


export const commonActionCreators = {
  optLoading(data) {
    return {
      type: OPT_LOADING,
      data
    }
  },
  optSuccess(data) {
    return {
      type: OPT_SUCCESS,
      data
    }
  },
  optError(data) {
    Toast.fail(data)
    return {
      type: OPT_ERROR,
      data
    }
  },
}