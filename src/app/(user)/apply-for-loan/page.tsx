import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const course = ["MBA", "MS", "Undergraduate", "Graduate", "Doctorate"];
  const university = [
    "University A",
    "University B",
    "University C",
    "University D",
    "University E",
  ];

  return (
    <div className="space-y-4 px-6 py-4">
      <h1 className="text-3xl font-semibold text-primary">Apply for loan</h1>
      <form className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <Label>First Name</Label>
            <Input placeholder="First Name" name="first_name" required />
          </div>
          <div className="flex-1">
            <Label>Last Name</Label>
            <Input placeholder="Last Name" name="last_name" required />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <Label>Email</Label>
            <Input placeholder="Email" type="email" name="email" required />
          </div>
          <div className="flex-1">
            <Label>Phone Number</Label>
            <Input placeholder="Phone" type="tel" name="phone" required />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <Label>Course</Label>
            <Select name="course" required>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {course.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label>University Name</Label>
            <Select name="university" required>
              <SelectTrigger>
                <SelectValue placeholder="Select University" />
              </SelectTrigger>
              <SelectContent>
                {university.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-1/2 md:pr-4">
            <Label>Required Loan Amount</Label>
            <div className="flex">
              <Button
                variant={"outline"}
                className="md:w-[100px] rounded-r-none border-r-none"
                disabled
              >
                INR
              </Button>
              <Input
                type="number"
                placeholder="Loan Amount"
                name="loan_amount"
                className="rounded-l-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-1/2 md:pr-4">
            <Label>Do you have security or collateral?</Label>
            <RadioGroup name="security" required className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-1/2 md:pr-4">
            <Button type="submit" className="w-full">
              Apply
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
