import axios from 'axios'

const useUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    console.log("getAll running")
    const request = axios.get('http://localhost:3001/persons')
    return request.then(persons => persons.data)

}

const create = newPerson => {

    console.log('running create')
    const request = axios.post(useUrl, newPerson)
    return request.then(person => {
        console.log('this is create first then', person.data)    
        return person.data
    })
}

const destroy = (id) => {

    const request = axios.delete(`${useUrl}/${id}`)
    return request.then(person => {
        console.log('this is delete', person.data)
        return person.data
    })
}

const update = (id, newObject) => {
  const request = axios.put(`${useUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {getAll, create, destroy, update}