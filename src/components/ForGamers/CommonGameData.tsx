import { Badge } from "react-bootstrap";
import { Platform } from "../../interfaces/enums/Platform";

export function getTheme( platform: Platform | Console ): string {
  return {
    PC: "light",

    STEAM_DECK: "secondary",
    NINTENDO_SWITCH: "primary",

    XBOX_ONE: "success",
    XBOX_ONE_X: "success",
    XBOX_SERIES_S: "success",
    XBOX_SERIES_X: "success",

    PS4: "info",
    PS4_PRO: "info",
    PS5: "info"
  }[ platform as Platform ]
}

export const platformBadge = ( platform: Platform | Console, index?: any ) => {
  return (
    <Badge
      className={ `me-2 mb-1 ` }
      text={ "dark" }
      bg={ getTheme( platform ) }
      key={ index }
    >
      { platform }
    </Badge>
  );
}

export const calculateFont = ( platforms: Platform[] | [] ) => {
  const length = platforms.length;

  if ( length > 4 )
    return 'fs-6';

  if ( length <= 4 && length > 2 )
    return 'fs-5';

  if ( length <= 2 )
    return 'fs-4';
}