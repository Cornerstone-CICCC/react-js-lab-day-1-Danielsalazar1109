import React, { useState, useEffect } from "react";

interface User {
  id?: number;
  fullname: string;
  age: number | null;
  education: string;
  gender: string;
  skills: string[];
  bio: string;
}

interface UserFormProps {
  initialData?: User;
  onSave: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<User>({
    id: initialData?.id,
    fullname: initialData?.fullname || "",
    age: initialData?.age || null,
    education: initialData?.education || "",
    gender: initialData?.gender || "",
    skills: initialData?.skills || [],
    bio: initialData?.bio || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevFormData) => {
      if (type === "checkbox") {
        const skills = prevFormData.skills.includes(value)
          ? prevFormData.skills.filter((skill) => skill !== value)
          : [...prevFormData.skills, value];

        return { ...prevFormData, skills };
      }

      return { ...prevFormData, [name]: type === "number" ? Number(value) : value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.fullname || !formData.age) {
      alert("Full name and age are required!");
      return;
    }

    onSave(formData);
    setFormData({
      id: undefined,
      fullname: "",
      age: null,
      education: "",
      gender: "",
      skills: [],
      bio: "",
    });
  };

  const handleClear = () => {
    setFormData({
      id: undefined,
      fullname: "",
      age: null,
      education: "",
      gender: "",
      skills: [],
      bio: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        placeholder="Full Name"
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        value={formData.age || ""}
        placeholder="Age"
        onChange={handleChange}
      />
      <select name="education" value={formData.education} onChange={handleChange}>
        <option value="">Select Education</option>
        <option value="Grade School">Grade School</option>
        <option value="High School">High School</option>
        <option value="College">College</option>
      </select>
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={formData.gender === "other"}
            onChange={handleChange}
          />
          Other
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="skills"
            value="JavaScript"
            checked={formData.skills.includes("JavaScript")}
            onChange={handleChange}
          />
          JavaScript
        </label>
        <label>
          <input
            type="checkbox"
            name="skills"
            value="React"
            checked={formData.skills.includes("React")}
            onChange={handleChange}
          />
          React
        </label>
        <label>
          <input
            type="checkbox"
            name="skills"
            value="TypeScript"
            checked={formData.skills.includes("TypeScript")}
            onChange={handleChange}
          />
          TypeScript
        </label>
      </div>
      <textarea
        name="bio"
        value={formData.bio}
        placeholder="Write your bio here..."
        onChange={handleChange}
      />
      <button type="submit">Add/Save User</button>
      <button type="button" onClick={handleClear}>
        Clear Form
      </button>
    </form>
  );
};

export default UserForm;
