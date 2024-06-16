import {createSelector, createSlice, current} from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'step',
    initialState:
        {
            step: 0,
            user: null,
            work: []
        }

    ,
    reducers: {
        setstep: (state, action) => {
            state.step = action.payload
        },
        setuser: (state, action) => {
            state.user = action.payload
        },
        setwork: (state, action) => {
            state.work.push(action.payload)
        },
        updatework: (state, action) => {
            state.work[action.payload.index].jobtitle = action.payload.jobtitle;
            state.work[action.payload.index].salary = action.payload.salary;
            state.work[action.payload.index].start_date = action.payload.start_date;
            state.work[action.payload.index].end_date = action.payload.end_date;
            state.work[action.payload.index].working = action.payload.working;

        } ,
        deleteWorkitem : (state,action)=>{

            const workitems = current(state.work)

            const filtered = workitems.filter((item)=>{
                return item.company !=action.payload


            })
            state.work=filtered




        }


    }
})

export const {setstep, setuser, setwork, updatework, deleteWorkitem} = todosSlice.actions

export const stepselector = createSelector(
    state => state.user,
    (state) => state.step
)

export const userselector = createSelector(
    state => state.user,
    (state) => state.user
)

export const workselector = createSelector(
    state => state.user,
    (state) => state.work
)
export default todosSlice.reducer