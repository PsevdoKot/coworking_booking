type VkSVGProps = {
  classNames?: string;
};

export default function VkSVG({ classNames }: VkSVGProps): JSX.Element {
  return (
    <svg className={classNames} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.9045 10.4342C17.8827 10.3839 17.8624 10.3422 17.8435 10.3087C17.5312 9.70627 16.9345 8.96681 16.0535 8.09011L16.0349 8.07004L16.0256 8.06019L16.0162 8.0501H16.0067C15.6069 7.64187 15.3537 7.36738 15.2477 7.22685C15.0537 6.95915 15.0102 6.68818 15.1163 6.41362C15.1912 6.20618 15.4726 5.7681 15.9597 5.09877C16.216 4.74405 16.419 4.45975 16.5688 4.24556C17.6498 2.70629 18.1185 1.72268 17.9747 1.29434L17.9188 1.19424C17.8813 1.13398 17.7845 1.07885 17.6285 1.02857C17.4721 0.978397 17.2722 0.9701 17.0285 1.00354L14.3295 1.02351C14.2858 1.00691 14.2233 1.00846 14.142 1.02857C14.0607 1.04868 14.0201 1.05877 14.0201 1.05877L13.9731 1.08391L13.9358 1.11411C13.9046 1.13408 13.8702 1.16921 13.8327 1.21941C13.7954 1.26945 13.7642 1.32816 13.7392 1.39507C13.4454 2.20482 13.1113 2.95768 12.7363 3.65362C12.5051 4.06861 12.2928 4.42825 12.0989 4.73276C11.9053 5.03717 11.7428 5.26145 11.6117 5.40522C11.4804 5.54912 11.3619 5.66441 11.2555 5.7515C11.1492 5.83862 11.0681 5.87544 11.012 5.86197C10.9557 5.8485 10.9027 5.83514 10.8525 5.82178C10.7651 5.76152 10.6947 5.67956 10.6417 5.57584C10.5885 5.47213 10.5526 5.34158 10.5339 5.18431C10.5153 5.02694 10.5042 4.89158 10.5011 4.77777C10.4982 4.6641 10.4995 4.50331 10.5058 4.29588C10.5123 4.08833 10.5153 3.94791 10.5153 3.87428C10.5153 3.61994 10.5199 3.34391 10.5292 3.04611C10.5386 2.74831 10.5463 2.51236 10.5527 2.33853C10.559 2.16453 10.562 1.98043 10.562 1.78636C10.562 1.59228 10.551 1.44007 10.5292 1.3296C10.5076 1.21927 10.4746 1.11218 10.431 1.00835C10.3872 0.904634 10.3231 0.8244 10.2389 0.767443C10.1546 0.710555 10.0497 0.665411 9.92496 0.631869C9.59379 0.5516 9.17208 0.508179 8.65965 0.501428C7.4976 0.488068 6.75093 0.568442 6.41979 0.742444C6.28859 0.815962 6.16986 0.916412 6.0637 1.04348C5.95121 1.19076 5.93552 1.27113 6.01673 1.28435C6.39166 1.34451 6.65708 1.48842 6.8133 1.71593L6.86959 1.83649C6.91338 1.92348 6.9571 2.07747 7.00086 2.29827C7.04455 2.51907 7.07275 2.76332 7.08516 3.03088C7.11634 3.51949 7.11634 3.93774 7.08516 4.28568C7.05387 4.63376 7.02433 4.90473 6.99613 5.09881C6.96794 5.29288 6.92579 5.45015 6.86959 5.57057C6.8133 5.69103 6.77584 5.76465 6.75707 5.79137C6.73832 5.81809 6.7227 5.83493 6.71029 5.84154C6.62908 5.87487 6.54462 5.89186 6.45721 5.89186C6.36966 5.89186 6.26351 5.84495 6.13857 5.75122C6.01367 5.65748 5.88405 5.52873 5.74969 5.36475C5.61534 5.20073 5.46382 4.97153 5.29507 4.67711C5.12644 4.38268 4.95148 4.03471 4.77029 3.6332L4.62038 3.34201C4.52666 3.15468 4.39864 2.88191 4.23619 2.52396C4.07364 2.16586 3.92996 1.81947 3.80506 1.48487C3.75514 1.34433 3.68013 1.23734 3.58018 1.16372L3.53327 1.13352C3.50209 1.1068 3.45203 1.07843 3.38336 1.04819C3.31459 1.01799 3.24283 0.996328 3.1678 0.983003L0.599913 1.00297C0.337509 1.00297 0.159465 1.06665 0.0657161 1.19382L0.0281968 1.25397C0.00945366 1.28748 0 1.34099 0 1.41465C0 1.48828 0.0187432 1.57863 0.0562624 1.68562C0.431126 2.6293 0.838782 3.53939 1.27923 4.41605C1.71968 5.29271 2.10242 5.99888 2.42723 6.53393C2.7521 7.06937 3.08324 7.57471 3.42065 8.04971C3.75806 8.52489 3.9814 8.8294 4.09068 8.96318C4.20008 9.09721 4.28602 9.19741 4.34849 9.26432L4.58282 9.5052C4.73277 9.66584 4.95296 9.85823 5.2435 10.0824C5.5341 10.3067 5.85582 10.5274 6.20882 10.7451C6.56189 10.9624 6.97263 11.1398 7.44128 11.2769C7.90986 11.4142 8.36593 11.4693 8.80956 11.4427H9.88734C10.1059 11.4225 10.2715 11.3489 10.3841 11.2218L10.4214 11.1715C10.4465 11.1316 10.4699 11.0695 10.4916 10.986C10.5135 10.9024 10.5244 10.8102 10.5244 10.71C10.518 10.4223 10.5385 10.163 10.5852 9.93214C10.6319 9.70135 10.6852 9.52735 10.7447 9.41016C10.8042 9.29308 10.8714 9.19429 10.9461 9.11419C11.021 9.03392 11.0744 8.9853 11.1057 8.96856C11.1368 8.95172 11.1617 8.9403 11.1804 8.93344C11.3304 8.87993 11.5068 8.93175 11.7101 9.08916C11.9132 9.24643 12.1037 9.44061 12.2818 9.67139C12.4599 9.90239 12.6739 10.1615 12.9237 10.4493C13.1738 10.7371 13.3924 10.951 13.5798 11.0918L13.7671 11.2122C13.8922 11.2926 14.0547 11.3662 14.2547 11.4331C14.4543 11.5 14.6292 11.5167 14.7793 11.4833L17.1784 11.4432C17.4157 11.4432 17.6004 11.4011 17.7314 11.3176C17.8626 11.234 17.9405 11.1418 17.9657 11.0416C17.9908 10.9412 17.9921 10.8274 17.9704 10.7001C17.9482 10.5732 17.9263 10.4844 17.9045 10.4342Z" fill="#525DA9" />
    </svg>
  );
}
