type WarningSVGProps = {
  classNames?: string;
};

export default function WarningSVG({ classNames }: WarningSVGProps): JSX.Element {
  return (
    <svg className={classNames} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.875 10.5C7.875 10.9832 7.48325 11.375 7 11.375C6.51675 11.375 6.125 10.9832 6.125 10.5C6.125 10.0168 6.51675 9.625 7 9.625C7.48325 9.625 7.875 10.0168 7.875 10.5Z" fill="#283593" />
      <path d="M7 2.625C6.51675 2.625 6.125 3.01675 6.125 3.5V7.875C6.125 8.35825 6.51675 8.75 7 8.75C7.48325 8.75 7.875 8.35825 7.875 7.875V3.5C7.875 3.01675 7.48325 2.625 7 2.625Z" fill="#283593" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM7 13.125C10.3827 13.125 13.125 10.3827 13.125 7C13.125 3.61726 10.3827 0.875 7 0.875C3.61726 0.875 0.875 3.61726 0.875 7C0.875 10.3827 3.61726 13.125 7 13.125Z" fill="#283593" />
    </svg>
  );
}
