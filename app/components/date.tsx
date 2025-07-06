import { parseISO, format } from "date-fns";
import { es as spanishLocale } from "date-fns/locale";

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);

  return (
    <time dateTime={dateString}>
      {format(date, "d 'de' LLLL 'de' yyyy", {
        locale: spanishLocale,
      })} {/* TODO: ver cómo hacer para que cambie de idioma según IP/país */}
    </time>
  );
}
