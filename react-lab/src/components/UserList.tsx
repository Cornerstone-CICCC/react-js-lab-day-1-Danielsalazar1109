import React from "react";

interface User {
  fullname: string;
  age: number | null;
  education: string;
  gender: string;
  skills: string[];
  bio: string;
}

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void; 
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <div>
      <h2>User List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <button onClick={() => onSelectUser(user)}>
                {user.fullname}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no users to display</p>
      )}
    </div>
  );
};

export default UserList;
