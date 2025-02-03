"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student } from "@prisma/client";
import { updateStudent } from "@/actions/intermediate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      toast.error("Failed to update student");
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!student?.gender || !student?.dob) {
          toast.warning("Please fill all the fields");
          return;
        }
        router.push(`./student-docs`);
      }}
    >
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Passport ID</Label>
            <Input
              type="text"
              name="passportNumber"
              defaultValue={student?.passportNumber ?? ""}
              onChange={(e) =>
                updateStudentFields("passportNumber", e.target.value)
              }
              required
            />
          </div>
          <div>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              defaultValue={student?.firstName}
              onChange={(e) => updateStudentFields("firstName", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Middle Name</Label>
            <Input
              type="text"
              name="middleName"
              defaultValue={student?.middleName ?? ""}
              onChange={(e) =>
                updateStudentFields("middleName", e.target.value)
              }
            />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              defaultValue={student?.lastName}
              onChange={(e) => updateStudentFields("lastName", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              defaultValue={student?.phone ?? ""}
              onChange={(e) => updateStudentFields("phone", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              name="gender"
              defaultValue={student?.gender ?? ""}
              onValueChange={(value) => updateStudentFields("gender", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              name="dob"
              defaultValue={
                student?.dob
                  ? new Date(student.dob).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                updateStudentFields("dob", new Date(e.target.value))
              }
              required
            />
          </div>

          <div className="col-span-3">
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              defaultValue={student?.address ?? ""}
              onChange={(e) => updateStudentFields("address", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              defaultValue={student?.city ?? ""}
              onChange={(e) => updateStudentFields("city", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input
              type="text"
              name="pincode"
              defaultValue={student?.pincode ?? ""}
              onChange={(e) => updateStudentFields("pincode", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>State</Label>
            <Input
              type="text"
              name="state"
              defaultValue={student?.state ?? ""}
              onChange={(e) => updateStudentFields("state", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              defaultValue={student?.country ?? ""}
              onChange={(e) => updateStudentFields("country", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="text-right">
        <Button type="submit">Proceed to Step 2</Button>
      </div>
    </form>
  );
};

export default StudentForm;
