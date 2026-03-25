import React from 'react'

const Professional = () => {
    return (
        <div className="flex flex-col gap-4  h-[320px] overflow-y-auto">
<input
type="text"
name="specialization"
placeholder="Specialization"
 className="border p-3 rounded-lg"
/>

<input
type="text"
name="qualification"
placeholder="Qualification"
 className="border p-3 rounded-lg"
/>

<input
type="text"
name="university"
placeholder="University"
 className="border p-3 rounded-lg"
/>
        
            </div>
      )
}

export default Professional