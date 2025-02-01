"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Student } from "@prisma/client";
import { updateStudent } from "@/actions/intermediate";
import { uploadFile } from "@/lib/uploadFile";
import { useRouter } from "next/navigation";
import Link from "next/link";

const StudentForm = ({ student }: { student: Student }) => {
  const router = useRouter();

  const updateStudentFields = async (key: string, value: string | Date) => {
    try {
      await updateStudent({
        key,
        value,
        studentId: student?.studentId,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    }
  };

  const handleFileChange = async ({ file }: { file: File | null }) => {
    try {
      if (!file) throw new Error("Function: handleFileChange expects a file");

      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size must not exceed 2MB");
      }

      const reader = new FileReader();

      reader.onloadend = () => console.log("File loaded");

      reader.readAsDataURL(file);

      const fileExt = file.name.split(".").pop();

      const fileUrl = await uploadFile({
        file,
        fileExt,
        folderPath: "students",
      });

      return { url: fileUrl };
    } catch (err) {
      console.error("Error in handleFileChange:", err);
      return { error: err };
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`./beneficiary`);
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Passport Front Side</CardTitle>
          </CardHeader>
          <CardContent>
            {student?.passportFrontSide ? (
              <div className="flex gap-2 items-center">
                <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                  Uploaded
                </span>
                <Button variant={"link"} asChild className="px-2 py-0.5">
                  <Link href={student.passportFrontSide} target="_blank">
                    View
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("passportFrontSideInput")?.click()
                  }
                >
                  Upload
                </Button>
                <Input
                  type="file"
                  id="passportFrontSideInput"
                  name="passportFrontSide"
                  className="h-0 w-0 inline opacity-0"
                  onChange={async (e) => {
                    if (e.target.files !== null && e.target.files.length > 0) {
                      const { url, error } = await handleFileChange({
                        file: e.target.files[0],
                      });

                      if (error) {
                        alert("Error uploading file");
                      } else {
                        if (url) {
                          updateStudentFields("passportFrontSide", url);
                        }
                      }
                    }
                  }}
                  required
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passport Back Side</CardTitle>
          </CardHeader>
          <CardContent>
            {student?.passportBackSide ? (
              <div className="flex gap-2 items-center">
                <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                  Uploaded
                </span>
                <Button variant={"link"} asChild className="px-2 py-0.5">
                  <Link href={student.passportBackSide} target="_blank">
                    View
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("passportBackSideInput")?.click()
                  }
                >
                  Upload
                </Button>
                <Input
                  type="file"
                  id="passportBackSideInput"
                  name="passportBackSide"
                  className="h-0 w-0 inline opacity-0"
                  onChange={async (e) => {
                    if (e.target.files !== null && e.target.files.length > 0) {
                      const { url, error } = await handleFileChange({
                        file: e.target.files[0],
                      });

                      if (error) {
                        alert("Error uploading file");
                      } else {
                        if (url) {
                          updateStudentFields("passportBackSide", url);
                        }
                      }
                    }
                  }}
                  required
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Letter</CardTitle>
          </CardHeader>
          <CardContent>
            {student?.loanDoc ? (
              <div className="flex gap-2 items-center">
                <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                  Uploaded
                </span>
                <Button variant={"link"} asChild className="px-2 py-0.5">
                  <Link href={student.loanDoc} target="_blank">
                    View
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("loanDocInput")?.click()
                  }
                >
                  Upload
                </Button>
                <Input
                  type="file"
                  id="loanDocInput"
                  name="loanDoc"
                  className="h-0 w-0 inline opacity-0"
                  onChange={async (e) => {
                    if (e.target.files !== null && e.target.files.length > 0) {
                      const { url, error } = await handleFileChange({
                        file: e.target.files[0],
                      });

                      if (error) {
                        alert("Error uploading file");
                      } else {
                        if (url) {
                          updateStudentFields("loanDoc", url);
                        }
                      }
                    }
                  }}
                  required
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admission letter / Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            {student?.admissionDoc ? (
              <div className="flex gap-2 items-center">
                <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                  Uploaded
                </span>
                <Button variant={"link"} asChild className="px-2 py-0.5">
                  <Link href={student.admissionDoc} target="_blank">
                    View
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("admissionDocInput")?.click()
                  }
                >
                  Upload
                </Button>
                <Input
                  type="file"
                  id="admissionDocInput"
                  name="admissionDoc"
                  className="h-0 w-0 inline opacity-0"
                  onChange={async (e) => {
                    if (e.target.files !== null && e.target.files.length > 0) {
                      const { url, error } = await handleFileChange({
                        file: e.target.files[0],
                      });

                      if (error) {
                        alert("Error uploading file");
                      } else {
                        if (url) {
                          updateStudentFields("admissionDoc", url);
                        }
                      }
                    }
                  }}
                  required
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-right">
        <Button type="submit">Proceed to Step 3</Button>
      </div>
    </form>
  );
};

export default StudentForm;
