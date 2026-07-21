import MotionController from "@/components/MotionController";

/**
 * Next.js templates remount on every client-side navigation.
 * Keeping the reveal controller here guarantees that cached and streamed
 * route content is registered again when users return to the homepage.
 */
export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <MotionController />
      {children}
    </>
  );
}
