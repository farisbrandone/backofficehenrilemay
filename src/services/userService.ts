import prisma from "../prisma/prismaClient";

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const createUser = async (data: any) => {
  data.role = "user";
  return await prisma.user.create({
    data,
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

export const updateUserById = async (
  id: string,
  data: Record<string, any>,
  userValue: any
) => {
  //console.log({ id, data, userValue });
  const userResearch = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  const adminUser = await prisma.user.findUnique({
    where: {
      id: userValue.id,
    },
  });

  if (userResearch?.id !== userValue.id && adminUser?.role === "admin") {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  if (userResearch?.id === userValue.id) {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  throw new Error("Non Authorisé");
};

export const deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
};
