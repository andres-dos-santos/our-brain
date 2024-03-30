import { Path, Svg } from 'react-native-svg';
import { orange } from 'tailwindcss/colors';

interface Props {
  advanced: boolean;
}

export function FireSVG(props: Props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.9078 16.466C16.0352 15.0932 15.6022 13.5377 13.9395 11.8828C13.9516 13.6439 13.2692 15.1105 12.5818 15.9492C12.3984 16.1729 12.1016 16.2714 11.8198 16.2019C11.538 16.1324 11.3219 15.9075 11.2649 15.6245C10.9901 14.2588 10.2095 13.6572 9.3781 13.2336C9.32174 14.3973 8.81109 15.2349 8.43945 15.8445L8.43945 15.8445C8.33448 16.0167 8.2406 16.1707 8.17118 16.3087C7.06544 18.507 8.40426 20.1024 9.33056 21.2063C10.0737 21.9384 11.1892 22.4498 11.9343 22.75C14.3599 21.619 15.7147 18.5473 15.9078 16.466Z"
        fill={props.advanced ? orange[500] : '#141B34'}
      />
      <Path
        opacity="0.4"
        d="M10.646 1.30244C10.8636 1.21696 11.1091 1.23679 11.3097 1.35606C15.5756 3.89182 19.5162 8.22204 20.807 12.3962C21.4578 14.5006 21.4555 16.6438 20.371 18.4821C19.2874 20.319 17.2111 21.7018 14.0352 22.472C12.0948 22.9426 9.64236 22.7336 8.70611 22.4469C5.84221 21.3945 3.81665 19.4233 3.06665 17.0181C2.31202 14.598 2.89055 11.8717 4.97052 9.41957C5.63777 8.63294 6.22077 7.98045 6.73411 7.40592C8.53991 5.38487 9.48374 4.32854 10.2007 1.79173C10.2637 1.5689 10.4284 1.38791 10.646 1.30244Z"
        fill={props.advanced ? orange[500] : '#141B34'}
      />
    </Svg>
  );
}
