import { api } from "@/convex/_generated/api";
import { PodcastCardProps } from "@/types";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PodcastCard = ({
  imgUrl,
  title,
  description,
  podcastId,
  authorId,
  currentUserId,
}: PodcastCardProps) => {
  const router = useRouter();
  const incrementViews = useMutation(api.podcasts.updatePodcastViews);

  const handleViews = async () => {
    if (!podcastId) return;

    console.log("podcastId", podcastId);
    console.log("authorId", authorId);
    console.log("currentUserId", currentUserId);
    // Do not increment if the user is the owner
    if (authorId === currentUserId) {
      router.push(`/podcast/${podcastId}`, { scroll: true });
      return;
    }

    // Check if the podcast was already clicked
    const clickedPodcasts = JSON.parse(
      sessionStorage.getItem("clickedPodcasts") || "[]"
    ) as string[];

    if (clickedPodcasts.includes(podcastId)) {
      // Already clicked once
      router.push(`/podcast/${podcastId}`, { scroll: true });
      return;
    }

    // Otherwise, increment views
    incrementViews({ podcastId });

    // Save podcastId to clicked list
    const updatedClicked = [...clickedPodcasts, podcastId];
    sessionStorage.setItem("clickedPodcasts", JSON.stringify(updatedClicked));

    router.push(`/podcast/${podcastId}`, { scroll: true });
  };

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          alt={title}
          width={174}
          height={174}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />

        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">
            {description}
          </h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
