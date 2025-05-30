import { EmptyStateProps } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const EmptyState = ({
  title,
  search,
  buttonLink,
  buttonText,
}: EmptyStateProps) => {
  return (
    <section className="flex-center size-full flex-col gap-3">
      <Image
        src="/icons/emptyState.svg"
        width={250}
        height={250}
        alt="empty state"
      />
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-16 text-center font-medium text-white-1">
          {title}
        </h1>
        {search && (
          <p className="text-16 text-center font-medium text-white-2">
            Try adjusting your search to find what you are looking for
          </p>
        )}
        {buttonLink && (
          <Button
            asChild
            className="bg-orange-1 flex items-center justify-center gap-2 px-4 py-3"
          >
            <Link href={buttonLink} className="flex items-center gap-2">
              <Image
                src="/icons/discover.svg"
                width={20}
                height={20}
                alt="discover"
                className="object-contain"
              />
              <span className="text-16 font-extrabold text-white-1">
                {buttonText}
              </span>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
