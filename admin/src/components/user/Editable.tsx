import {required, TextInput} from 'react-admin';

const Editable = () => {
  return(
    <>
      <TextInput source="name" validate={required()} fullWidth={true} />
      <TextInput source="email" fullWidth={true} />
      <TextInput source="password" />
    </>
  )
}

export default Editable