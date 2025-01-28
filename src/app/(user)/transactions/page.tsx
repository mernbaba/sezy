"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = () => {
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
  const currencyOptions = [
    "AED",
    "AUD",
    "CAD",
    "EUR",
    "GBP",
    "NZD",
    "SGD",
    "USD",
  ];
  const flow = [
    "Self",
    "Money Order",
    "Relative On App",
    "Educon Self",
    "Educon Relative",
  ];
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
    remitter_name: "",
    phone: "",
    email: "",
    currency: "",
    flow: "",
    payer_type: "",
  };
  const [filters, setFilters] = useState(defaultFilterState);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-primary">Transactions</h1>

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
          <Label>Remitter Name</Label>
          <Input
            name="remitter_name"
            placeholder="Remitter Name"
            value={filters?.remitter_name}
            onChange={(e) =>
              setFilters({ ...filters, remitter_name: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={filters?.phone}
            onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Remitter Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Remitter Email"
            value={filters?.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
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
              {currencyOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
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
        </div>

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
              <TableHead>Remitter Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Flow Type</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>RRN</TableHead>
              <TableHead>Payer Type</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <TableRow>
              <TableCell className="font-medium">Successful</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
