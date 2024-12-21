import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

interface User {
  fullname: string;
  age: number | null;
  education: string;
  gender: string;
  skills: string[];
  bio: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const addUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleUpdate = (updatedUser: User) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        if (user === selectedUser) {
          return updatedUser;
        }
        return user;
      });
      return updatedUsers;
    });
  };
  
  const handleDelete = () => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user !== selectedUser);
      return updatedUsers;
    });
  };

  return (
    <div>
      <h1>Users Management</h1>
      <UserForm onSave={addUser} />
      <UserList users={users} onSelectUser={handleSelectUser} />
      <UserProfile user={selectedUser} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default App;
