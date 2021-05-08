import{ADD_ITEM,GET_ITEMS,ITEM_FAILED,EDIT_ITEM, GET_ITEM, DELETE_ITEM} from '../actions/types';
const initialState={
    text:[],
    items:[],
    loading:true,   
    error:{}     
}

export default function (state=initialState,action) {
    const {type,payload}=action;
    switch(type){
        case ADD_ITEM:
            return{
                ...state,
                items:payload,
                loading:false,
            }
            case GET_ITEMS:
                return{
                    ...state,
                    items:payload,
                    loading:false
                }
                case GET_ITEM:
                return{
                    ...state,
                    text:payload,
                    loading:false
                }
                case EDIT_ITEM:
                    return{
                        ...state,
                        item:payload,
                        loading:false,
                    }
                    case ITEM_FAILED:
                        return{
                            ...state,
                            error:payload
                        }
                        case DELETE_ITEM:
                            return{
                                ...state,
                                items:state.items.lists.filter(list=>
                                    list._id!==payload),
                                    loading:false
                                
                            }
            default:
                return state;
    }
}