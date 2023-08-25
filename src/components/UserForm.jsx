import React, { useState } from 'react'
import './UserForm.scss'
import { randomId } from '@mieuteacher/meomeojs';
export default function UserForm({setIsShowForm, addUser, formData, setFormData}) {
    const [name, setName] = useState(formData?.user.name ? formData?.user.name : "");
    const [age, setAge] = useState(formData?.user.age ? formData?.user.age : 0);
  return (
    <div className='popup_userForm'>
        <div className='userForm'>
            <h1>{formData ? formData.titleForm : "Create User"}</h1>
            <div>
                Name: <input value={name} onChange={(e) => {
                    setName(e.target.value)
                }}  type="text" />
            </div>
            <div>
                Age: <input value={age} onChange={(e) => {
                    setAge(e.target.value)
                }}   type="text" />
            </div>
            <div>
                <button onClick={() => {
                    if(formData) {
                        formData.actionFunc(
                            {
                                id: formData.user.id,
                                name,
                                age: Number(age)
                            }
                        )
                        setIsShowForm(false)
                        setName("")
                        setAge("")
                        setFormData(null)
                        return
                    }
                    addUser({
                        id: randomId(),
                        name,
                        age: Number(age)
                    })
                    setIsShowForm(false)
                    setName("")
                    setAge("")
                }}>{formData ? "Cập nhật" : "Thêm"}</button>
            </div>
            <span onClick={() => {
                setIsShowForm(false)
                setName("")
                setAge("")
                setFormData(null)
            }} className='btn_close'>X</span>
        </div>
    </div>
  )
}
