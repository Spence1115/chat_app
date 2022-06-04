import {
  useMutation,
  useQuery
} from "@apollo/client";
import dayjs from 'dayjs';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, { useState } from 'react';
import {
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  USERS,
  USERS_DELETED,
  USERS_MODIFIED
} from './queries';

interface UserOptions {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  createdAt: string,
  updatedAt: string
}

interface FormOptions {
  firstName: string,
  lastName: string,
  email: string
}

function Users() {
  const { subscribeToMore, data } = useQuery(USERS)
  subscribeToMore({
    document: USERS_MODIFIED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData?.data) return prev;
      const updatedUser = subscriptionData.data.userUpdated

      return {
        users: [updatedUser].concat(filter(prev.users, (user) => user.id !== updatedUser.id))
      }
    }
  })
  subscribeToMore({
    document: USERS_DELETED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData?.data) return prev;
      const deletedUserID = subscriptionData.data.userDeleted
      return {
        users: filter(prev.users, (user) => user.id !== deletedUserID)
      }
    }
  })

  const [deleteUser] = useMutation(DELETE_USER)  
  const [editUserMutation] = useMutation(EDIT_USER)

  const User = ({ user, index } : { user: UserOptions, index: any }) => {
    const [showEditForm, setShowEditForm] = useState(false)
    const handleDelete = () => deleteUser({ variables: { id: user.id }})
    const handleEdit = () => setShowEditForm(value => !value)
    const onSubmitEdit = (
      firstName: string,
      lastName: string,
      email: string,
    ) => {
      editUserMutation({
        variables: {
          id: user.id,
          firstName,
          lastName,
          email
        }
      })
    }
    return <span key={ index }>
      { showEditForm
        ? <Form onSubmit={ onSubmitEdit } user={ user }/>
        : <>
          <p>{ `${user.firstName} ${user.lastName} - ${user.email}` } </p>
          <p>{ `Created at ${dayjs(user.createdAt)}` }</p>
          <p>{ `Updated at ${dayjs(user.updatedAt)}` }</p>
          <button onClick={ handleDelete }>Delete</button>
        </>
      }
      <button onClick={ handleEdit }>Edit</button>
    </span>
  }

  const [createUserMutation] = useMutation(CREATE_USER)
  
  const onCreateUserSubmit = (
    firstName: string,
    lastName: string,
    email: string
  ) => {
    createUserMutation({
      variables: {
        firstName,
        lastName,
        email
      }
    })
  }
  
  const Form = ({
    user = {
      firstName: '',
      lastName: '',
      email: ''
    },
    onSubmit
  } : { user?: FormOptions,
    onSubmit: (
    firstName: string,
    lastName: string,
    email: string
  ) => void }) => {
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [email, setEmail] = useState(user?.email)
    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault()
      onSubmit(firstName, lastName, email)
      setFirstName('')
      setLastName('')
      setEmail('')
    }

    const handleChange = (setValue: React.Dispatch<React.SetStateAction<string>>) => (event: { target: { value: string }}) => {
      return setValue(event.target.value);
    }

    return <form onSubmit={ handleSubmit }>
      <input type='text' name='firstName' value={ firstName } onChange={ handleChange(setFirstName) }/>
      <input type='text' name='lastName' value={ lastName } onChange={ handleChange(setLastName) }/>
      <input type='text' name='email' value={ email }  onChange={ handleChange(setEmail) }/>
      <button type='submit'>Submit</button>
    </form>
  }

  return <>
    <p>{ `Total Users: ${data?.users?.length}` }</p>
    <Form onSubmit={ onCreateUserSubmit }/>
    { data && sortBy(data.users, 'updatedAt').map((user: UserOptions, index: React.Key) => <User user={ user } index={ index }/>) }
  </>

  
}

export default Users;
