import * as appTypes from '../reducers/appReducers.js'

// export actions
export const postCompanyActionCreator = company => ({
  type: appTypes.POST_COMPANY,
  payload: company
})