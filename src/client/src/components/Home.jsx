import React, { useState } from 'react'

import Creatable from 'react-select/creatable'

const roles = [
  { label: 'admin', value: 1 },
  { label: 'student', value: 2 },
  { label: 'tutor', value: 3 },
  { label: 'guardian', value: 4 }
]

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     borderBottom: '1px dotted pink',
//     color: state.isSelected ? 'red' : 'blue',
//     padding: 20
//   })
// }

export default () => {
  const [roleValue, setRoleValue] = useState('')

  const handleChange = (field, value) => {
    switch (field) {
      case 'roles':
        setRoleValue(value)
        break

      default:
        break
    }
  }
console.log(roleValue);

 
  return (
    <div className='container'>
      <h3>Add User</h3>
      <div className='register-form'>

        <div className='input'>
          <label>Role(s)</label>
          <Creatable
            isClearable
            onChange={(value) => handleChange('roles', value)}
            options={roles}
            value={roleValue}
            // styles={customStyles}
          />
        </div>

        <div className='buttons'>
          <button>Submit</button>
        </div>
      </div>
    </div>

  )
}

