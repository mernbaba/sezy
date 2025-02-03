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
import { Textarea } from "@/components/ui/textarea";
import { Transaction } from "@prisma/client";
import { uploadFile } from "@/lib/uploadFile";
import Link from "next/link";
import { updateTransaction } from "@/actions/intermediate";
import { toast } from "sonner";

type RemitType =
  | "University"
  | "Accomodation"
  | "Student Account"
  | "Bank Account"
  | "GIC Account";

const BeneficiaryForm = ({ transaction }: { transaction: Transaction }) => {
  const router = useRouter();

  const [remitType, setRemitType] = useState<RemitType>(
    transaction?.remitType as RemitType
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (remitType == null || remitType == undefined) {
      toast.warning("Please select a remit type");
      return;
    }
    if (remitType == "Accomodation") {
      if (!transaction?.document1 || !transaction?.document2) {
        toast.warning("Please upload the required documents");
        return;
      }
    } else {
      if (remitType == "University") {
        if (
          !transaction?.program ||
          !transaction?.paymentType ||
          !transaction?.accountInfo ||
          !transaction?.bankCodeType
        ) {
          toast.warning("Please fill the required fields");
          return;
        }
      } else {
        if (!transaction?.document1) {
          toast.warning("Please upload the required documents");
          return;
        }
      }
    }

    updateTransactionFields("status", "Initiated");
    router.push("/transactions");
  };

  const updateTransactionFields = async (key: string, value: string | Date) => {
    try {
      if (key === "remitType") {
        setRemitType(value as RemitType);
      }
      await updateTransaction({
        key,
        value,
        transactionId: transaction?.transactionId,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Beneficiary Details");
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
        folderPath: "transactions",
      });

      return { url: fileUrl };
    } catch (err) {
      console.error("Error in handleFileChange:", err);
      return { error: err };
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button
          type="button"
          variant={remitType === "University" ? "default" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => updateTransactionFields("remitType", "University")}
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
          variant={remitType === "Accomodation" ? "default" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => updateTransactionFields("remitType", "Accomodation")}
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
          variant={remitType === "Student Account" ? "default" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() =>
            updateTransactionFields("remitType", "Student Account")
          }
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
          variant={remitType === "Bank Account" ? "default" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => updateTransactionFields("remitType", "Bank Account")}
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
          variant={remitType === "GIC Account" ? "default" : "outline"}
          className="flex flex-col items-center space-y-2 h-36 md:h-44 aspect-square border-primary border-2"
          onClick={() => updateTransactionFields("remitType", "GIC Account")}
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
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Program</Label>
                  <Select
                    name="program"
                    defaultValue={transaction?.program ?? ""}
                    onValueChange={(value) =>
                      updateTransactionFields("program", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UNDERGRAD">UNDERGRAD</SelectItem>
                      <SelectItem value="GRADUATE">GRADUATE</SelectItem>
                      <SelectItem value="DOCTORATE">DOCTORATE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Year Of Completion</Label>
                  <Input
                    type="number"
                    name="yearOfCompletion"
                    defaultValue={transaction?.yearOfCompletion ?? ""}
                    onChange={(e) =>
                      updateTransactionFields(
                        "yearOfCompletion",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Student ID</Label>
                  <Input
                    type="text"
                    name="universitystudentId"
                    defaultValue={transaction?.universitystudentId ?? ""}
                    onChange={(e) =>
                      updateTransactionFields(
                        "universitystudentId",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Payment Type</Label>
                  <Select
                    name="paymentType"
                    defaultValue={transaction?.paymentType ?? ""}
                    onValueChange={(value) =>
                      updateTransactionFields("paymentType", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APPLICATION">APPLICATION</SelectItem>
                      <SelectItem value="DEPOSIT">DEPOSIT</SelectItem>
                      <SelectItem value="SEMESTER">SEMESTER</SelectItem>
                      <SelectItem value="SEVIS">SEVIS</SelectItem>
                      <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label>University Name</Label>

                  <Input
                    type="text"
                    name="university"
                    defaultValue={transaction?.university ?? ""}
                    onChange={(e) =>
                      updateTransactionFields("university", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="col-span-2">
                  <Label>University Address</Label>
                  <Textarea
                    name="universityAddress"
                    defaultValue={transaction?.universityAddress ?? ""}
                    onChange={(e) =>
                      updateTransactionFields(
                        "universityAddress",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="universityCountry"
                    defaultValue={transaction?.universityCountry ?? ""}
                    onChange={(e) =>
                      updateTransactionFields(
                        "universityCountry",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="universityCity"
                    defaultValue={transaction?.universityCity ?? ""}
                    onChange={(e) =>
                      updateTransactionFields("universityCity", e.target.value)
                    }
                    required
                  />
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
                  <Select
                    name="accountInfo"
                    defaultValue={transaction?.accountInfo ?? ""}
                    onValueChange={(value) =>
                      updateTransactionFields("accountInfo", value)
                    }
                    required
                  >
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
                  <Input
                    type="text"
                    name="bankIBAN"
                    defaultValue={transaction?.bankIBAN ?? ""}
                    onChange={(e) =>
                      updateTransactionFields("bankIBAN", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="bankCountry"
                    defaultValue={transaction?.bankCountry ?? ""}
                    onChange={(e) =>
                      updateTransactionFields("bankCountry", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Bank Account Number</Label>
                  <Input
                    type="text"
                    name="bankAccountNumber"
                    defaultValue={transaction?.bankAccountNumber ?? ""}
                    onChange={(e) =>
                      updateTransactionFields(
                        "bankAccountNumber",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Bank Name</Label>
                  <Input
                    type="text"
                    name="bankName"
                    defaultValue={transaction?.bankName ?? ""}
                    onChange={(e) =>
                      updateTransactionFields("bankName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>SWIFT Code/BIC</Label>
                  <Input
                    type="text"
                    name="bankSwiftCode"
                    defaultValue={transaction?.bankSwiftCode ?? ""}
                    onChange={(e) =>
                      updateTransactionFields("bankSwiftCode", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Bank Address</Label>
                  <Textarea
                    name="bankAddress"
                    defaultValue={transaction?.bankAddress ?? ""}
                    onChange={(e) =>
                      updateTransactionFields("bankAddress", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Bank Code</Label>
                  <Input
                    type="text"
                    name="bankCode"
                    defaultValue={transaction?.bankCode ?? ""}
                    onChange={(e) =>
                      updateTransactionFields("bankCode", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Bank Code Type</Label>
                  <Select
                    name="bankCodeType"
                    defaultValue={transaction?.bankCodeType ?? ""}
                    onValueChange={(value) =>
                      updateTransactionFields("bankCodeType", value)
                    }
                    required
                  >
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

          <Card>
            <CardHeader>
              <CardTitle>Please upload any additional document here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.additionalDocument ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link
                      href={transaction?.additionalDocument}
                      target="_blank"
                    >
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("additionalDocumentInput")
                        ?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="additionalDocumentInput"
                    name="additionalDocument"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("additionalDocument", url);
                          }
                        }
                      }
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {remitType === "Accomodation" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Please upload your valid Visa document here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.document1 ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link href={transaction?.document1} target="_blank">
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("document1Input")?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="document1Input"
                    name="document1"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("document1", url);
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
              <CardTitle>Please upload your Rent Agreement here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.document2 ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link href={transaction?.document2} target="_blank">
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("document2Input")?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="document2Input"
                    name="document2"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("document2", url);
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
              <CardTitle>Please upload any additional document here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.additionalDocument ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link
                      href={transaction?.additionalDocument}
                      target="_blank"
                    >
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("additionalDocumentInput")
                        ?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="additionalDocumentInput"
                    name="additionalDocument"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("additionalDocument", url);
                          }
                        }
                      }
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {remitType === "Student Account" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Please upload your valid Visa document here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.document1 ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link href={transaction?.document1} target="_blank">
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("document1Input")?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="document1Input"
                    name="document1"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("document1", url);
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
              <CardTitle>Please upload any additional document here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.additionalDocument ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link
                      href={transaction?.additionalDocument}
                      target="_blank"
                    >
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("additionalDocumentInput")
                        ?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="additionalDocumentInput"
                    name="additionalDocument"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("additionalDocument", url);
                          }
                        }
                      }
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {remitType === "Bank Account" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle> Please upload your Opening Letter here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.document1 ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link href={transaction?.document1} target="_blank">
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("document1Input")?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="document1Input"
                    name="document1"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("document1", url);
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
              <CardTitle>Please upload any additional document here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.additionalDocument ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link
                      href={transaction?.additionalDocument}
                      target="_blank"
                    >
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("additionalDocumentInput")
                        ?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="additionalDocumentInput"
                    name="additionalDocument"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("additionalDocument", url);
                          }
                        }
                      }
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {remitType === "GIC Account" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle> Please upload your Opening Letter here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.document1 ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link href={transaction?.document1} target="_blank">
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("document1Input")?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="document1Input"
                    name="document1"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("document1", url);
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
              <CardTitle>Please upload any additional document here</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction?.additionalDocument ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-lg">
                    Uploaded
                  </span>
                  <Button variant={"link"} asChild className="px-2 py-0.5">
                    <Link
                      href={transaction?.additionalDocument}
                      target="_blank"
                    >
                      View
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("additionalDocumentInput")
                        ?.click()
                    }
                  >
                    Upload
                  </Button>
                  <Input
                    type="file"
                    id="additionalDocumentInput"
                    name="additionalDocument"
                    className="h-0 w-0 inline opacity-0"
                    onChange={async (e) => {
                      if (
                        e.target.files !== null &&
                        e.target.files.length > 0
                      ) {
                        const { url, error } = await handleFileChange({
                          file: e.target.files[0],
                        });

                        if (error) {
                          toast.error("Error uploading file");
                        } else {
                          if (url) {
                            updateTransactionFields("additionalDocument", url);
                          }
                        }
                      }
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-right">
        <Button type="submit">Initiate Transaction</Button>
      </div>
    </form>
  );
};

export default BeneficiaryForm;
