import { permanentRedirect } from "next/navigation";

export default function TechnologiesPage() {
  permanentRedirect("/about#capabilities");
}
