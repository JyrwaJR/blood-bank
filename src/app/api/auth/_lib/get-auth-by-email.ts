import prisma from "../../../../../prisma/client";

type Params = {
  email: string;
};
export async function getAuthByEmail({ email }: Params) {
  try {
    return await prisma.auth.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    throw error;
  }
}
