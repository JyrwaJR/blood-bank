import prisma from "../../../../prisma/client";

type Params = {
  id: string;
};
export async function getUserById({ id }: Params) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
}
