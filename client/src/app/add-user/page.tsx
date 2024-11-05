"use client";
import React from "react";
import AddUserInput from "../components/addUserInput";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { IUser } from "@/types/user";
import api from "@/axios/config";
import { useRouter } from "next/navigation";
import { Button, CircularProgress } from "@mui/material";

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      firstName: "Paul",
      lastName: "Ashlay",
      displayName: "",
      email: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      const response = await api.post("/user/add", data);
      console.log(response.data.payload);

      router.push("/");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="">
      <div className="bg-navColor h-[89px]"></div>
      <div className="mx-[5%]">
        <div className="my-10 flex gap-6 items-center">
          <div className="bg-navColor w-11 h-11 rounded-full flex items-center justify-center">
            <div className="text-white text-4xl">+</div>
          </div>
          <div className="text-[25px] font-semibold">ADD NEW USER</div>
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
            type="submit"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : null
            }>
            {isSubmitting ? "SAVING..." : "SAVE"}
          </Button>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
