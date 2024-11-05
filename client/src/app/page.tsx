"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IUser } from "@/types/user";
import api from "@/axios/config";
import { formatDate } from "@/util/convertDate";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function Home() {
  const [data, setData] = React.useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null
  );
  const router = useRouter();

  const handleOpenModal = (userId: number) => {
    setSelectedUserId(userId); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setSelectedUserId(null); 
    setIsModalOpen(false);
  };

  const handleAddUserClick = () => {
    router.push("/add-user");
  };

  const handleEditUser = (userId: number) => {
    router.push(`/edit-user/${userId}`);
  };

  const handleDeleteUser = async () => {
    if (selectedUserId === null) return; 
    try {
      await api.delete(`/user/delete/${selectedUserId}`);
      setData((prevData) =>
        prevData.filter((user) => user.id !== selectedUserId)
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/getAll");
        // console.log(response.data.payload);
        const users = response.data.payload;
        setData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="bg-navColor h-[89px] w-full"></div>
      <div className="w-[95%] mx-auto bg-tableBg p-4">
        <div className="flex justify-between mb-5 mt-1">
          <div className="h-[66px] w-[242px] bg-navColor text-white text-xl flex items-center ps-7 rounded-md">
            <p>User List</p>
          </div>
          <div
            className="cursor-pointer h-[66px] w-[209px] bg-addUserButton text-white text-xl flex items-center justify-center rounded-md"
            onClick={handleAddUserClick}>
            <p>+ Add New User</p>
          </div>
        </div>

        <TableContainer
          component={Paper}
          className="overflow-auto mx-1 rounded-lg">
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ borderRadius: "8px" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
                  First Name
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                  align="left">
                  Last Name
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                  align="left">
                  Display Name
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                  align="left">
                  Email
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                  align="left">
                  Date Of Birth
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                  align="left">
                  Phone
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                  align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.firstName}
                  </TableCell>
                  <TableCell align="left">{user.lastName}</TableCell>
                  <TableCell align="left">{user.displayName}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">
                    {formatDate(user.dateOfBirth)}
                  </TableCell>
                  <TableCell align="left">{user.phoneNumber}</TableCell>
                  <TableCell align="left" className="flex space-x-2">
                    <Button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEditUser(user.id as number)}>
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleOpenModal(user.id as number)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)", 
            backgroundColor: "rgba(0, 0, 0, 0.3)", 
          },
        }}>
        <DialogTitle className="text-red-600 font-bold ">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-xl">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-5">
          <Button onClick={handleCloseModal} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
