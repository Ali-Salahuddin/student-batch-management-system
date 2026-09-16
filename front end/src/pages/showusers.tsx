import { useEffect, useState } from "react";
import { getUsers } from "../actionpages/getusers.action";
import type { User } from "../types/usertype";
import "../stylesheet/showusers.css";
import Navbar from "../component/navibar";
import { SessionExpiredError } from "../helper/SessionExpiredError";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../actionpages/deleteuser.action";
import EditUserModal from "../component/EditUserModal";

const ShowUsers = () => {
    const navigate = useNavigate();
    const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await deleteUser(id);

    setUsers((prev) =>
      prev.filter((user) => user._id !== id)
    );

    alert("User deleted successfully.");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
  const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
     const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        
        setUsers(data);
      } catch (error) {
         if (error instanceof SessionExpiredError) {
    navigate("/login", {
      replace: true,
      state: {
        message: "Your session has expired. Please login again.",
      },
    });

    return;
  }
        console.error(error);
      }
     
    };

    fetchUsers();
  }, []);
  const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase()) ||
  user.role.toLowerCase().includes(search.toLowerCase())
);
console.log("Search state:", search);
  return (
    <>
     <Navbar  />
    <div className="show-users-container">
      <h2>All Users</h2>
      {/* <div className="search-container">
        <input
            type="text"
            placeholder="🔍 Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
        />
</div> */}
<form autoComplete="off">
<input
  type="search"
  name="userSearch"
  autoComplete="off"
  value={search}
  onChange={(e) => {
    console.log("onChange fired:", e.target.value);
    setSearch(e.target.value);
  }}
/></form>
      <table className="users-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Batch</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* {users.map((user) => ( */}
         {filteredUsers.map((user) => (
            <tr key={user._id}>
                 <td>   
                        <img
                        src={`http://localhost:31156${user.profileImage}`}
                        // src={`http://localhost:31156${user.profileImage}`}
                        alt={user.name}
                        className="user-image"
                        />
                    </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.role}</td> */}
              <td>
                <span className={`role ${user.role}`}>
                {user.role}
                </span>
          </td>
          <td>
            {user.role === "student"
              ? user.batch
                ? `${user.batch.courseName} (${user.batch.batchCode})`
                : "Not Assigned"
              : "-"}
          </td>
            <td>
                    <button
                            className="edit-btn"
                            onClick={() => setSelectedUser(user)}
                        >
                            Edit
                        </button>

                    {user.role !== "admin" && (
                            <button
                                 className="delete-btn"
                                 onClick={() => handleDelete(user._id)}
                                >
                                 Delete
                            </button>
                                      )}
          </td>
            </tr>
          ))}
        </tbody>
      </table>
        {selectedUser && (
    <EditUserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onUpdated={(updatedUser) => {

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === updatedUser._id
                        ? updatedUser
                        : u
                )
            );

            setSelectedUser(null);
        }}
    />
)}
    </div></>
  );
};

export default ShowUsers;