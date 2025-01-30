"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("./beneficiary");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl">Student Details - Document Upload</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Passport Front Side</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="file" required />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passport Back Side</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="file" required />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="file" required />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admission letter / Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="file" required />
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Passport ID</Label>
            <Input type="text" name="passport_id" required />
          </div>
          <div>
            <Label>First Name</Label>
            <Input type="text" name="first_name" required />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input type="text" name="last_name" required />
          </div>
          <div>
            <Label>Gender</Label>
            <Select name="gender">
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" name="dob" required />
          </div>

          <div className="col-span-3">
            <Label>Address</Label>
            <Input type="text" name="address" required />
          </div>
          <div>
            <Label>City</Label>
            <Input type="text" name="city" required />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input type="text" name="pincode" required />
          </div>
          <div>
            <Label>State</Label>
            <Input type="text" name="state" required />
          </div>
          <div>
            <Label>Country</Label>
            <Input type="text" name="country" required />
          </div>
        </div>
      </div>

      <div className="text-right">
        <Button type="submit">Proceed to next page</Button>
      </div>
    </form>
  );
};

export default Page;
