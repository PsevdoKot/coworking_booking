type StapleSVGProps = {
  classes: string;
};

export default function StapleSVG({ classes }: StapleSVGProps): JSX.Element {
  return (
    <svg className={classes} width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0436 2.32682C9.24736 1.58333 7.95642 1.58333 7.16019 2.32682L2.35453 6.81413C1.02748 8.05327 1.02748 10.0623 2.35453 11.3014C3.68158 12.5406 5.83314 12.5406 7.16019 11.3014L11.0228 7.69475L11.9839 8.59221L8.12132 12.1989C6.26346 13.9337 3.25126 13.9337 1.3934 12.1989C-0.464466 10.4641 -0.464466 7.65146 1.3934 5.91667L6.19906 1.42935C7.5261 0.190216 9.67767 0.190216 11.0047 1.42935C12.3318 2.66849 12.3318 4.67753 11.0047 5.91667L6.20627 10.3972C5.41005 11.1407 4.1191 11.1407 3.32288 10.3972C2.52665 9.65376 2.52665 8.44834 3.32288 7.70485L7.64076 3.67301L8.60189 4.57047L4.28401 8.60232C4.0186 8.85015 4.0186 9.25195 4.28401 9.49978C4.54942 9.74761 4.97973 9.74761 5.24514 9.49978L10.0436 5.0192C10.8398 4.27572 10.8398 3.0703 10.0436 2.32682Z" fill="black" fillOpacity="0.85" />
    </svg>
  );
}
