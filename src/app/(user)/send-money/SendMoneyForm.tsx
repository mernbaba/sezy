"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Currency, Student } from "@prisma/client";
import { getCookie } from "cookies-next/client";
import { createTransaction } from "@/actions/transaction";

const SendMoneyForm = ({ currencies }: { currencies: Currency[] }) => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState<string>(currencies[0]?.currencyId);
  const [forexRate, setForexRate] = useState(currencies[0]?.forexRate);
  const router = useRouter();
  const userCookie = getCookie("sezy");
  const user = userCookie ? (JSON.parse(userCookie) as Student) : undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { transaction } = await createTransaction({
        studentId: user?.studentId ?? "",
        agentId: user?.agentId ?? "",
        currencyId: currency,
        amount: amount,
        email: user?.email ?? "",
        forexRate: forexRate,
      });

      if (transaction) {
        alert("Transaction initiated");
        router.push(`/send-money/${transaction?.transactionId}/student`);
      }
    } catch (error) {
      console.log(error);
      alert("An error happened while creating the transaction");
    }
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setForexRate(currencies.find((c) => c.currencyId === value)!.forexRate);
  };

  return (
    <form
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md my-auto space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4">
        How much do you want to send?
      </h2>

      <div>
        <Label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Enter the amount to be sent
        </Label>

        <div className="md:flex gap-4 justify-between items-center">
          <div className="flex flex-1 gap-4 md:gap-0">
            <Select
              name="currency"
              value={currency}
              onValueChange={(value) => handleCurrencyChange(value)}
            >
              <SelectTrigger className="w-[120px] md:rounded-r-none">
                <SelectValue placeholder="Currency" />
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

            <Input
              type="number"
              id="amount"
              name="amount"
              placeholder="Amount"
              value={amount ?? ""}
              onChange={(e) => setAmount(Number(e.target.value ?? 0))}
              className="md:rounded-l-none md:border-l-0"
              required
            />
          </div>
          <Button type="button" className="mt-2 md:mt-0 w-full md:w-36">
            Convert
          </Button>
        </div>
      </div>

      <div>
        <Label
          htmlFor="converted-amount"
          className="block text-sm font-medium text-gray-700"
        >
          Forex Conversion
        </Label>
        <div className="flex">
          <Button
            type="button"
            variant={"outline"}
            className="md:w-[100px] rounded-r-none"
          >
            INR
          </Button>
          <Input
            type="number"
            id="converted-amount"
            name="converted-amount"
            placeholder="Calculated Amount"
            value={(amount * forexRate).toFixed(2)}
            className="border-l-0 rounded-l-none"
            disabled
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="font-bold text-primary text-lg">
              Fee Structure
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Forex Rate</TableCell>
            <TableCell className="text-left">₹ {forexRate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bank Fees</TableCell>
            <TableCell className="text-left">₹ 1500.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sendezy Fees</TableCell>
            <TableCell className="text-left">₹ 1250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>FCCT</TableCell>
            <TableCell className="text-left">
              ₹ {(amount * forexRate * 0.01).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="font-medium">Total Payable</TableCell>
            <TableCell className="text-left">
              ₹{" "}
              {(
                amount * forexRate +
                1500 +
                1250 +
                amount * forexRate * 0.01
              ).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <p className="text-xs text-gray-500">
        *TCS will be calculated at final step
      </p>

      <Button className="w-full" disabled={amount * forexRate <= 1000}>
        Continue
      </Button>
    </form>
  );
};

export default SendMoneyForm;
