import { ReactNode } from "react";
import InteractivePostWrapper from "@/app/components/interactivePostWrapper";

// Metadata del post - esto debería coincidir con el frontmatter
const postMetadata = {
  title: "The Great Wave (Interactive)",
  date: "2023-07-17T20:28:56.868Z",
  tags: ["arte", "japón", "hokusai", "interactive"],
  postId: "great-wave-interactive",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <InteractivePostWrapper
      title={postMetadata.title}
      date={postMetadata.date}
      tags={postMetadata.tags}
      postId={postMetadata.postId}
    >
      {children}
    </InteractivePostWrapper>
  );
}
