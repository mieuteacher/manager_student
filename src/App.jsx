import { randomId } from "@mieuteacher/meomeojs"
import { useState } from "react"
import UserForm from "./components/UserForm"
function App() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users") ?? "[]"))
  const [isShowForm, setIsShowForm] = useState(false);

  const [formData, setFormData] = useState(null);

  function addUser(newUser) {
    let cloneUsers = [...users];
    cloneUsers.push(newUser);
    setUsers(cloneUsers)
    localStorage.setItem("users", JSON.stringify(cloneUsers))
  }

  function updateUser(data) {
    let cloneUsers = [...users];
    cloneUsers = cloneUsers.map(user => {
      if (user.id == data.id) {
        return data
      }
      return user
    })
    setUsers(cloneUsers)
    localStorage.setItem("users", JSON.stringify(cloneUsers))
  }

  function deleteUser(userId) {
    let cloneUsers = [...users];
    cloneUsers = cloneUsers.filter(user => user.id != userId)
    setUsers(cloneUsers)
    localStorage.setItem("users", JSON.stringify(cloneUsers))
  }
  return (
    <div>
      {
        isShowForm && <UserForm setIsShowForm={setIsShowForm} addUser={addUser} formData={formData} setFormData={setFormData}/>
      }
      <button onClick={() => {
        setIsShowForm(!isShowForm)
      }} type="button" className="btn btn-primary">Add New User</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Tools</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) =>
              <tr key={randomId()}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => {
                    deleteUser(user.id)
                  }} type="button" className="btn btn-danger">Delete</button>
                  <button onClick={() => {
                    setFormData({
                      titleForm: "Update User",
                      user: user,
                      actionFunc: updateUser
                    })
                    setIsShowForm(true)
                  }} type="button" className="btn btn-warning">Update</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
