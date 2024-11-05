import { PrismaClient, User, Prisma } from "@prisma/client";
import { prisma } from "../config/db";

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async create(
    data: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User | null> {
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          dateOfBirth: new Date(data.dateOfBirth),
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      return null;
    }
  }

  async update(
    id: number,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): Promise<User | null> {
    try {
      const updateData: Prisma.UserUpdateInput = {};

      if (data.firstName) updateData.firstName = data.firstName;
      if (data.lastName) updateData.lastName = data.lastName;
      if (data.displayName) updateData.displayName = data.displayName;
      if (data.phoneNumber) updateData.phoneNumber = data.phoneNumber;
      if (data.email) updateData.email = data.email;
      if (data.dateOfBirth) updateData.dateOfBirth = new Date(data.dateOfBirth);

      return await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      return null;
    }
  }

  async delete(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      return null;
    }
  }
}

export const userService = new UserService(prisma);
