type HingeSVGProps = {
  classes?: string;
};

export default function HingeSVG({ classes }: HingeSVGProps): JSX.Element {
  return (
    <svg className={classes} width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.87554 1.66691C3.45604 1.15792 4.12775 0.748737 4.86299 0.462738C6.25384 -0.0782834 7.791 -0.146996 9.22679 0.267673C10.6626 0.682342 11.9134 1.55624 12.7776 2.74856C13.6419 3.94087 14.0692 5.38216 13.9909 6.84018C13.9125 8.2982 13.3329 9.68804 12.3456 10.7857C11.3583 11.8834 10.0206 12.6251 8.54826 12.8911C7.07588 13.1572 5.5545 12.9322 4.22928 12.2524C2.90405 11.5726 1.85216 10.4776 1.24309 9.14378L2.45993 8.61555C3.29114 10.4331 5.16051 11.7 7.33336 11.7C10.2789 11.7 12.6667 9.37187 12.6667 6.5C12.6667 3.62812 10.2789 1.3 7.33336 1.3C5.94351 1.3 4.67784 1.81835 3.72859 2.66758L5.33331 4.55L0 5.2L1.45454 1.0978e-09L2.87554 1.66691Z" fill="#283593" fillOpacity="0.9" />
    </svg>
  );
}