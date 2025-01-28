import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      <div className="flex-1 border rounded-lg px-4 pb-4 md:px-6 md:pb-6 space-y-4 shadow-lg">
        <div className="-mt-6 -mb-6">
          <Image
            src="/assets/forex-card-apply-header.png"
            alt="Forex Card"
            width={494}
            height={392}
            unoptimized
            className="h-80 object-contain"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl text-primary font-bold">
            Benefits of Applying for a Forex Card
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="text-primary font-medium">
                1. Global Acceptance
              </span>
              <br />
              Use your Forex card at millions of ATMs and merchants worldwide,
              ensuring you&apos;re always covered wherever you go.
            </li>
            <li>
              <span className="text-primary font-medium">
                2. Competitive Exchange Rates
              </span>
              <br />
              Enjoy better exchange rates than traditional currency exchange
              services, saving you money on every transaction.
            </li>
            <li>
              <span className="text-primary font-medium">
                3. Secure Transactions
              </span>
              <br />
              Benefit from enhanced security features, including chip and PIN
              protection, to safeguard your money.
            </li>
            <li>
              <span className="text-primary font-medium">
                4. 24/7 Customer Support
              </span>
              <br />
              Access dedicated customer support anytime, anywhere, for any
              issues or queries related to your card.
            </li>
          </ul>
        </div>
        <div className="text-center">
          <Button className="w-full md:w-4/5 lg:w-3/5">Apply Card</Button>
        </div>
      </div>
      <div className="flex-1 border rounded-lg px-4 pb-4 md:px-6 md:pb-6 space-y-4 shadow-lg">
        <div className="-mt-6 -mb-6">
          <Image
            src="/assets/forex-card-reload-header.png"
            alt="Forex Card"
            width={494}
            height={392}
            unoptimized
            className="h-80 object-contain"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl text-primary font-bold">
            Why Reload Your Forex Card?
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="text-primary font-medium">
                1. Instant Access to Funds
              </span>
              <br />
              Reload your card instantly and continue your transactions without
              any delays or interruptions.
            </li>
            <li>
              <span className="text-primary font-medium">
                2. Flexible Reload Options
              </span>
              <br />
              Choose how much you want to reload, whether it&apos;s a small
              amount for daily expenses or a larger sum for extended stays.
            </li>
            <li>
              <span className="text-primary font-medium">
                3. Secure and Convenient
              </span>
              <br />
              Reloading your card is safe, easy, and can be done from anywhere,
              whether you&apos;re at home or abroad.
            </li>
            <li>
              <span className="text-primary font-medium">
                4. Track Your Spending
              </span>
              <br />
              Keep track of your spending habits with detailed statements and
              manage your budget effectively.
            </li>
          </ul>
        </div>
        <div className="text-center">
          <Button
            className="w-full md:w-4/5 lg:w-3/5 border-primary"
            variant={"outline"}
          >
            Reload Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
