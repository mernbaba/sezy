import prisma from "@/lib/prisma";
import { Student } from "@prisma/client";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import StudentForm from "./StudentForm";

const Page = async () => {
  const userCookie = await getCookie("sezy", { cookies });
  const user = userCookie ? (JSON.parse(userCookie) as Student) : undefined;

  const student = await prisma.student.findFirst({
    where: {
      studentId: {
        equals: user?.studentId,
      },
    },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Student Details - Document Upload</h1>

      {student && <StudentForm student={student} />}
    </div>
  );
};

export default Page;
