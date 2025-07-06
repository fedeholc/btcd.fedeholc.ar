import { parseISO, format } from "date-fns";
import { es as spanishLocale } from "date-fns/locale";

export default function Date({ dateString }: { dateString: string | Date }) {
  console.log("Rendering Date component with dateString:", dateString);

  // Convert to Date object if it's a string, otherwise use as is
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;

  return (
    <time
      dateTime={
        typeof dateString === "string" ? dateString : dateString.toISOString()
      }
    >
      {format(date, "d 'de' LLLL 'de' yyyy", {
        locale: spanishLocale,
      })}{" "}
      {/* TODO: ver cómo hacer para que cambie de idioma según IP/país */}
    </time>
  );
}
