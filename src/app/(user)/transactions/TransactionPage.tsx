"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction, Currency, Student } from "@prisma/client";
import Link from "next/link";

type ExtendedTransaction = Transaction & { Currency: Currency } & {
  Student: Student;
};

const TransactionPage = ({
  transactions,
  currencies,
}: {
  transactions: ExtendedTransaction[];
  currencies: Currency[];
}) => {
  const status = [
    "Successful",
    "Funds Received",
    "Funds Awaited",
    "Incomplete",
    "Cancelled",
    "Expired",
    "Failed by Bank",
    "Failed by Sendezy",
    "Refund Initiated",
    "Refunded",
  ];

  //   const flow = [
  //     "Self",
  //     "Money Order",
  //     "Relative On App",
  //     "Educon Self",
  //     "Educon Relative",
  //   ];

  const payerType = [
    "Self",
    "Mother",
    "Father",
    "Brother",
    "Sister",
    "Wife",
    "Husband",
    "Other",
  ];

  const defaultFilterState = {
    status: "",
    currency: "",
    flow: "",
    payer_type: "",
  };
  const [filters, setFilters] = useState(defaultFilterState);

  return (
    <div className="space-y-4">
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div className="flex flex-col gap-2">
          <Label>Status</Label>

          <Select
            name="status"
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {status.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Currency</Label>

          <Select
            name="currency"
            value={filters.currency}
            onValueChange={(value) =>
              setFilters({ ...filters, currency: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem
                  key={currency?.currencyId}
                  value={currency?.currencyId}
                >
                  {currency?.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="flex flex-col gap-2">
          <Label>Flow</Label>

          <Select
            name="flow"
            value={filters.flow}
            onValueChange={(value) => setFilters({ ...filters, flow: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Flow" />
            </SelectTrigger>
            <SelectContent>
              {flow.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        <div className="flex flex-col gap-2">
          <Label>Payer Type</Label>

          <Select
            name="payer_type"
            value={filters.payer_type}
            onValueChange={(value) =>
              setFilters({ ...filters, payer_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Payer Type" />
            </SelectTrigger>
            <SelectContent>
              {payerType.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2">
          <Button type="submit">Search</Button>
          <Button
            variant="secondary"
            type="reset"
            onClick={() => setFilters(defaultFilterState)}
          >
            Clear
          </Button>
        </div>
      </form>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>A2 Form</TableHead>
              <TableHead>Challan</TableHead>
              <TableHead>Swift Copy</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Beneficary Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Remitter Name</TableHead>
              <TableHead>RRN</TableHead>
              <TableHead>Payer Type</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction?.transactionId}>
                <TableCell className="font-medium">
                  {transaction?.status}
                </TableCell>
                <TableCell>
                  {transaction?.a2Form ? (
                    <Link href={transaction?.a2Form} target="_blank">
                      View
                    </Link>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell>
                  {transaction?.challan ? (
                    <Link href={transaction?.challan} target="_blank">
                      View
                    </Link>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell>
                  {transaction?.swiftCopy ? (
                    <Link href={transaction?.swiftCopy} target="_blank">
                      View
                    </Link>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell>
                  <Button variant={"secondary"} asChild>
                    <Link
                      href={`/send-money/${transaction?.transactionId}/student`}
                    >
                      Edit
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  {transaction?.Student?.firstName}{" "}
                  {transaction?.Student?.lastName}
                </TableCell>
                <TableCell className="text-right">
                  {transaction?.amount}
                </TableCell>
                <TableCell>{transaction?.Currency?.code}</TableCell>
                <TableCell>
                  {transaction?.Student?.firstName}{" "}
                  {transaction?.Student?.lastName}
                </TableCell>
                <TableCell>{transaction?.RRN}</TableCell>
                <TableCell>Self</TableCell>
                <TableCell>{transaction?.remarks}</TableCell>
                <TableCell>
                  {new Date(transaction?.createdAt).toLocaleString("en-US")}
                </TableCell>
                <TableCell>
                  {new Date(transaction?.updatedAt).toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionPage;
