/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import AddUserInput from "../../components/addUserInput";
import { useForm } from "react-hook-form";
import { IUser } from "@/types/user";
import api from "@/axios/config";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";

interface EditUserPageProps {
  params: {
    userId: string;
  };
}

const EditUserPage: React.FC<EditUserPageProps> = () => {
  const router = useRouter();
  const { userId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<IUser>();

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return; 
      try {
        console.log("Fetching user data");
        const response = await api.get(`/user/${userId}`);
        const user = response.data.payload;
        // console.log(user);

        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("displayName", user.displayName);
        setValue("email", user.email);
        setValue("dateOfBirth", user.dateOfBirth);
        setValue("phoneNumber", user.phoneNumber);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const onSubmit = async (data: IUser) => {
    if (!userId) return;
    try {
      const response = await api.put(`/user/update/${userId}`, data);
      console.log(response);

      router.push("/");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="bg-navColor h-[89px]"></div>
      <div className="mx-[5%]">
        <div className="my-10 flex gap-6 items-center">
          <div className="bg-navColor w-11 h-11 rounded-full flex items-center justify-center">
            <div className="text-white text-4xl">+</div>
          </div>
          <div className="text-[25px] font-semibold">EDIT USER</div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-center gap-y-7">
          <AddUserInput
            register={register}
            name="firstName"
            level="First Name:"
            placeHolder="Type First Name"
            levelFor="first-name"
            type="text"
          />
          <AddUserInput
            register={register}
            name="lastName"
            level="Last Name:"
            placeHolder="Type Last Name"
            levelFor="last-name"
            type="text"
          />
          <AddUserInput
            register={register}
            name="displayName"
            level="Display Name:"
            placeHolder="Type Display Name"
            levelFor="display-name"
            type="text"
          />
          <AddUserInput
            register={register}
            name="email"
            level="Email:"
            placeHolder="Type email"
            levelFor="email"
            type="email"
          />
          <AddUserInput
            register={register}
            name="dateOfBirth"
            level="Date of Birth:"
            placeHolder="Date"
            levelFor="dob"
            type="date"
          />
          <AddUserInput
            register={register}
            name="phoneNumber"
            level="Phone:"
            placeHolder="Phone"
            levelFor="phone"
            type="text"
          />

          <div></div>

          <Button
            className="h-[60px] w-[300px] rounded-md bg-navColor text-white font-semibold text-xl"
            type="submit">
            {isSubmitting ? "UPDATING..." : "UPDATE USER"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;
