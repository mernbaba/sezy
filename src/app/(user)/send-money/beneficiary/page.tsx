"use client";

import { useState } from "react";
import Image from "next/image";
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
import { useFileInput } from "@/hooks/use-file-input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type RemitType =
  | "University"
  | "Accomodation"
  | "Student Account"
  | "Bank Account"
  | "GIC Account";

const Page = () => {
  const router = useRouter();

  const [remitType, setRemitType] = useState<RemitType>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/send-money/beneficiary");
  };

  const { fileName, error, fileInputRef, handleFileSelect, clearFile } =
    useFileInput({
      accept: ".pdf",
      maxSize: 2,
    });

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-medium">Beneficiary Details</h1>

      <h3 className="text-xl">Remit To</h3>

      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button
          type="button"
          variant={remitType === "University" ? "secondary" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => setRemitType("University")}
        >
          <span>University</span>
          <Image
            src="/icons/university.svg"
            alt="University"
            width={60}
            height={60}
            className="object-contain aspect-square"
          />
        </Button>

        <Button
          type="button"
          variant={remitType === "Accomodation" ? "secondary" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => setRemitType("Accomodation")}
        >
          <span>Accomodation</span>
          <Image
            src="/icons/accomodation.svg"
            alt="Accomodation"
            width={60}
            height={60}
            className="object-contain aspect-square"
          />
        </Button>

        <Button
          type="button"
          variant={remitType === "Student Account" ? "secondary" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => setRemitType("Student Account")}
        >
          <span>Student Account</span>
          <Image
            src="/icons/student-account.svg"
            alt="Student Account"
            width={60}
            height={60}
            className="object-contain aspect-square"
          />
        </Button>

        <Button
          type="button"
          variant={remitType === "Bank Account" ? "secondary" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => setRemitType("Bank Account")}
        >
          <span>Bank Account</span>
          <Image
            src="/icons/bank-account.svg"
            alt="Bank Account"
            width={60}
            height={60}
            className="object-contain aspect-square"
          />
        </Button>

        <Button
          type="button"
          variant={remitType === "GIC Account" ? "secondary" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => setRemitType("GIC Account")}
        >
          <span>GIC Account</span>
          <Image
            src="/icons/gic-account.svg"
            alt="GIC Account"
            width={60}
            height={60}
            className="object-contain aspect-square"
          />
        </Button>
      </div>

      {remitType === "University" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>University Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>University Name</Label>
                  <Input type="text" name="university_name" required />
                </div>

                <div className="col-span-2">
                  <Label>Beneficiary Address</Label>
                  <Textarea name="beneficiary_address" required />
                </div>

                <div>
                  <Label>Country</Label>
                  <Input type="text" name="country" required />
                </div>

                <div>
                  <Label>City</Label>
                  <Input type="text" name="city" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Account Information</Label>
                  <Select name="account_information" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Account Information"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IBAN">IBAN</SelectItem>
                      <SelectItem value="Account Number and Country">
                        Account Number and Country
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>IBAN</Label>
                  <Input type="text" name="iban" required />
                </div>

                <div>
                  <Label>Country</Label>
                  <Input type="text" name="country" required />
                </div>

                <div>
                  <Label>Bank Account Number</Label>
                  <Input type="text" name="bank_acc_number" required />
                </div>

                <div>
                  <Label>Bank Name</Label>
                  <Input type="text" name="bank_name" required />
                </div>

                <div>
                  <Label>SWIFT Code/BIC</Label>
                  <Input type="text" name="swift_code" required />
                </div>

                <div>
                  <Label>Bank Address</Label>
                  <Textarea name="bank_address" required />
                </div>

                <div>
                  <Label>Bank Code</Label>
                  <Input type="text" name="bank_code" required />
                </div>

                <div>
                  <Label>Bank Code Type</Label>
                  <Select name="bank_code_type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Bank Code Type"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRANSIT">TRANSIT</SelectItem>
                      <SelectItem value="SORT">SORT</SelectItem>
                      <SelectItem value="ROUTING">ROUTING</SelectItem>
                      <SelectItem value="BSB">BSB</SelectItem>
                      <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {remitType === "Accomodation" && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-4 flex-1">
            <h3 className="text-lg font-medium">
              Please upload your valid Visa document here
            </h3>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center",
                "hover:border-brand/50 transition-colors cursor-pointer",
                error && "border-red-500"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{fileName}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to upload
                  <br />
                  PDF up to 2MB
                </p>
              )}
            </div>

            <input
              title="Visa document"
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />

            {error && <p className="text-sm text-red-500">Error: {error}</p>}
          </div>

          <div className="space-y-4 flex-1">
            <h3 className="text-lg font-medium">
              Please upload your Rent Agreement here
            </h3>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center",
                "hover:border-brand/50 transition-colors cursor-pointer",
                error && "border-red-500"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{fileName}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to upload
                  <br />
                  PDF up to 2MB
                </p>
              )}
            </div>

            <input
              title="Visa document"
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />

            {error && <p className="text-sm text-red-500">Error: {error}</p>}
          </div>
        </div>
      )}

      {remitType === "Student Account" && (
        <div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Please upload your valid Visa document here
            </h3>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center",
                "hover:border-brand/50 transition-colors cursor-pointer",
                error && "border-red-500"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{fileName}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to upload
                  <br />
                  PDF up to 2MB
                </p>
              )}
            </div>

            <input
              title="Visa document"
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />

            {error && <p className="text-sm text-red-500">Error: {error}</p>}
          </div>
        </div>
      )}

      {remitType === "Bank Account" && (
        <div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Please upload your Opening Letter here
            </h3>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center",
                "hover:border-brand/50 transition-colors cursor-pointer",
                error && "border-red-500"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{fileName}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to upload
                  <br />
                  PDF up to 2MB
                </p>
              )}
            </div>

            <input
              title="Account Opening Letter"
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />

            {error && <p className="text-sm text-red-500">Error: {error}</p>}
          </div>
        </div>
      )}

      {remitType === "GIC Account" && (
        <div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Please upload your Opening Letter here
            </h3>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center",
                "hover:border-brand/50 transition-colors cursor-pointer",
                error && "border-red-500"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{fileName}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to upload
                  <br />
                  PDF up to 2MB
                </p>
              )}
            </div>

            <input
              title="Account Opening Letter"
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />

            {error && <p className="text-sm text-red-500">Error: {error}</p>}
          </div>
        </div>
      )}

      <div className="text-right">
        <Button type="submit">Proceed to next page</Button>
      </div>
    </form>
  );
};

export default Page;
