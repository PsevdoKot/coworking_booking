type RedWarningSVGProps = {
  classes?: string;
};

export default function RedWarningSVG({ classes }: RedWarningSVGProps): JSX.Element {
  return (
    <svg className={classes} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM5.00004 1.66665C4.5398 1.66665 4.1667 2.03974 4.1667 2.49998V4.99998C4.1667 5.46022 4.5398 5.83331 5.00004 5.83331C5.46027 5.83331 5.83337 5.46022 5.83337 4.99998V2.49998C5.83337 2.03974 5.46027 1.66665 5.00004 1.66665ZM5.00004 8.33331C5.46027 8.33331 5.83337 7.96022 5.83337 7.49998C5.83337 7.03974 5.46027 6.66665 5.00004 6.66665C4.5398 6.66665 4.1667 7.03974 4.1667 7.49998C4.1667 7.96022 4.5398 8.33331 5.00004 8.33331Z" fill="#F26651" />
    </svg>
  );
}