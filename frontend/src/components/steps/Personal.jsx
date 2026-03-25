import React from 'react'

const Personal = () => {
  return (
    <div className="flex flex-col gap-4  h-[320px] overflow-y-auto">
<input type="date" name="dob"
className="border p-3 rounded-lg"
 />

<select
  name="gender"
  className="border p-3 rounded-lg"
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

<input
type="tel"
name="phoneNumber"
placeholder="Phone Number"
 className="border p-3 rounded-lg"
/>
    
        </div>
  )
}

export default Personal