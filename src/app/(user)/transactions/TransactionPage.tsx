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
import {
  Transaction,
  Currency,
  Student,
  TransactionStatus,
} from "@prisma/client";
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
  const defaultFilterState = {
    status: "",
    currency: "",
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
              {Object.keys(TransactionStatus).map((item) => (
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

        <div className="flex items-end gap-2">
          <Button
            variant="secondary"
            type="reset"
            onClick={() => setFilters(defaultFilterState)}
          >
            Clear Filters
          </Button>
        </div>
      </form>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Remitter Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions
              .filter((transaction) => {
                return (
                  (filters.status === "" ||
                    transaction.status === filters.status) &&
                  (filters.currency === "" ||
                    transaction.currencyId === filters.currency)
                );
              })
              .map((transaction) => (
                <TableRow key={transaction?.transactionId}>
                  <TableCell className="font-medium">
                    {transaction?.status}
                  </TableCell>
                  <TableCell className="font-mono">
                    {transaction?.transactionId}
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
                  <TableCell className="text-right">
                    {transaction?.amount}
                  </TableCell>
                  <TableCell>{transaction?.Currency?.code}</TableCell>
                  <TableCell>
                    {transaction?.Student?.firstName}{" "}
                    {transaction?.Student?.lastName}
                  </TableCell>
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
