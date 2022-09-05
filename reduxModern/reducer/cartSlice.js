import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        value:[]
    },
    reducers:{
        plus: (state,action) => {
            let payload = action.payload;
            let test = action.payload;

            console.log({payload})
            
           let basket = state.value
           //  basket.push(payload)

             let checklist = basket.find((cust) => {
                return cust.id === test.id
            })
 
            if(!checklist){
             basket.push(payload)
            } else {
              
             let updateItem = basket.findIndex((cust) =>{
                 return cust.id === test.id
             })
 
           
                 basket[updateItem].qty = checklist.qty + 1;
                 console.log('Added')
 
            }
        
       
        },
        minus: (state,action) => {
            
            let payload = action.payload;

            let basket = state.value

            let checklist = basket.find((cust) => {
                return cust.id === payload.id
            })
             
            if(checklist.qty > 1) {
    
            console.log('Substracted One')
    
            let updateItem = basket.findIndex((cust) =>{
                return cust.id === payload.id
            })
    
                basket[updateItem].qty = checklist.qty - 1;
               
    
            }   else {

             let updateItem = basket.findIndex((cust) =>{
                    return cust.id === payload.id
                })

            basket.splice(updateItem,1)
        
    
        }


        },
        clear: (state) => {
            let basket = state.value
            console.log('Clearing')
            basket.splice(0,basket.length)
        }
    }
})

export const {plus,minus,clear} = cartSlice.actions

export const selectCount = (state) => state.cart.value

export default cartSlice.reducer