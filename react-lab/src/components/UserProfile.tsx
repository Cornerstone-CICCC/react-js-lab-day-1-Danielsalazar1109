import React, { useState } from "react";

interface User {
  fullname: string;
  age: number | null;
  education: string;
  gender: string;
  skills: string[];
  bio: string;
}

interface ProfileProps {
  user: User | null; 
  onUpdate: (updatedUser: User) => void; 
  onDelete: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(user);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSave = () => {
    if (editedUser) {
      onUpdate(editedUser); 
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (user) {
      onDelete(); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, [name]: value };
      }
      return prevUser;
    });
  };

  if (!user) {
    return <p>Select a user to view their profile</p>;
  }

  return (
    <div>
      <h2>Perfil de {user.fullname}</h2>

      {isEditing ? (
        <>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={editedUser?.fullname || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={editedUser?.age || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Education:</label>
            <input
              type="text"
              name="education"
              value={editedUser?.education || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={editedUser?.gender || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              value={editedUser?.skills.join(", ") || ""}
              onChange={(e) => {
                setEditedUser((prevUser) => {
                  if (prevUser) {
                    return {
                      ...prevUser,
                      skills: e.target.value.split(",").map((skill) => skill.trim()),
                    };
                  }
                  return prevUser;
                });
              }}
            />
          </div>
          <div>
            <label>Bio:</label>
            <textarea
              name="bio"
              value={editedUser?.bio || ""}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Edad:</strong> {user.age || "No specified"}</p>
          <p><strong>Educación:</strong> {user.education}</p>
          <p><strong>Género:</strong> {user.gender}</p>
          <p><strong>Habilidades:</strong> {user.skills.join(", ") || "No specified"}</p>
          <p><strong>Biografía:</strong> {user.bio}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Profile;
