const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = ({good,ok,bad} = initialState, action) => {
  console.log(action)
  console.log({good,ok,bad})
  switch (action.type) {
    case 'GOOD':
      return { good : good +1 , ok : ok , bad : bad }
      case 'OK':
        console.log(ok)
        return { good : good , ok : ok + 1 , bad : bad }
        case 'BAD':
          console.log(bad)
          return { good : good , ok : ok , bad : bad +1 }
          case 'ZERO':
      return { good: 0, ok: 0, bad: 0 }
    default: return {good,ok,bad}
  }
  
}

export default counterReducer
